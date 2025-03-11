// Improved URL Shortener API with Express and MongoDB
const express = require("express");
const mongoose = require("mongoose");
const shortid = require("shortid");
const validUrl = require("valid-url");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

// Validate required environment variables
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI environment variable is required");
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { error: "Too many requests, please try again later" },
});

// Apply rate limiting to API endpoints
app.use("/api/", apiLimiter);

// Enforce HTTPS in production
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https") {
      res.redirect(`https://${req.header("host")}${req.url}`);
    } else {
      next();
    }
  });
}

// URL Schema
const UrlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
    trim: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    default: () => new Date(+new Date() + 30 * 24 * 60 * 60 * 1000), // 30 days by default
  },
  createdBy: {
    type: String,
    default: "anonymous",
    trim: true,
  },
});

// Add index for better performance
UrlSchema.index({ shortUrl: 1 });
UrlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index for auto cleanup

const Url = mongoose.model("Url", UrlSchema);

// Create short URL
app.post("/api/shorten", async (req, res) => {
  const { originalUrl, customAlias } = req.body;

  // Validate required fields
  if (!originalUrl) {
    return res.status(400).json({ error: "Original URL is required" });
  }

  // Check if the URL is valid
  if (!validUrl.isUri(originalUrl)) {
    return res.status(400).json({ error: "Invalid URL format" });
  }

  // Validate custom alias if provided
  if (customAlias) {
    if (customAlias.length < 3 || customAlias.length > 20) {
      return res
        .status(400)
        .json({ error: "Custom alias must be between 3 and 20 characters" });
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(customAlias)) {
      return res.status(400).json({
        error:
          "Custom alias can only contain letters, numbers, hyphens and underscores",
      });
    }
  }

  try {
    // Start a session for transaction
    const session = await mongoose.startSession();
    let result;

    await session.withTransaction(async () => {
      // Check if the same URL already exists
      const existingUrl = await Url.findOne({ originalUrl }).session(session);

      if (existingUrl) {
        // If forceNew flag is true, create a new short URL even if original exists
        if (req.body.forceNew === true) {
          // Continue to create a new one below
        } else {
          result = existingUrl;
          return; // Exit the transaction callback
        }
      }

      // If custom alias provided, check if it's available
      if (customAlias) {
        const aliasExists = await Url.findOne({
          shortUrl: customAlias,
        }).session(session);
        if (aliasExists) {
          throw new Error("Custom alias already in use");
        }
      }

      // Generate short ID or use custom alias
      const shortUrl = customAlias || shortid.generate();

      // Create expiration date (default 30 days or custom)
      const days = req.body.expiresIn || 30;
      const expiresAt = new Date(+new Date() + days * 24 * 60 * 60 * 1000);

      // Create new URL document
      const newUrl = new Url({
        originalUrl,
        shortUrl,
        expiresAt,
        createdBy: req.body.userId || "anonymous",
      });

      await newUrl.save({ session });
      result = newUrl;
    });

    session.endSession();

    if (result) {
      return res.json(result);
    } else {
      return res.status(500).json({ error: "Error creating shortened URL" });
    }
  } catch (err) {
    console.error("Error in /api/shorten:", err);
    if (err.message === "Custom alias already in use") {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: "Server error" });
  }
});

// Redirect to original URL
app.get("/:shortUrl", async (req, res) => {
  try {
    const url = await Url.findOne({ shortUrl: req.params.shortUrl });

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    // Check if URL has expired
    if (url.expiresAt < new Date()) {
      return res.status(410).json({ error: "URL has expired" });
    }

    // Increment click count
    url.clicks++;
    await url.save();

    // Redirect to original URL
    return res.redirect(url.originalUrl);
  } catch (err) {
    console.error("Error in redirect:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get URL stats
app.get("/api/stats/:shortUrl", async (req, res) => {
  try {
    const url = await Url.findOne({ shortUrl: req.params.shortUrl });

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    res.json({
      originalUrl: url.originalUrl,
      shortUrl: url.shortUrl,
      clicks: url.clicks,
      createdAt: url.createdAt,
      expiresAt: url.expiresAt,
      daysRemaining: Math.max(
        0,
        Math.ceil((url.expiresAt - new Date()) / (1000 * 60 * 60 * 24))
      ),
    });
  } catch (err) {
    console.error("Error in /api/stats:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a URL (protected endpoint that would require authentication in production)
app.delete("/api/urls/:shortUrl", async (req, res) => {
  try {
    const result = await Url.findOneAndDelete({
      shortUrl: req.params.shortUrl,
    });

    if (!result) {
      return res.status(404).json({ error: "URL not found" });
    }

    res.json({ message: "URL deleted successfully" });
  } catch (err) {
    console.error("Error in delete URL:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Update URL expiration
app.patch("/api/urls/:shortUrl/extend", async (req, res) => {
  const { days } = req.body;

  if (!days || !Number.isInteger(days) || days <= 0) {
    return res.status(400).json({ error: "Valid number of days is required" });
  }

  try {
    const url = await Url.findOne({ shortUrl: req.params.shortUrl });

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    // Calculate new expiration date
    const newExpiryDate = new Date(+new Date() + days * 24 * 60 * 60 * 1000);
    url.expiresAt = newExpiryDate;

    await url.save();

    res.json({
      shortUrl: url.shortUrl,
      expiresAt: url.expiresAt,
      daysRemaining: Math.ceil(
        (url.expiresAt - new Date()) / (1000 * 60 * 60 * 24)
      ),
    });
  } catch (err) {
    console.error("Error extending URL:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

// Connect to MongoDB before starting the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Schedule cleanup of expired URLs (would be better in a separate worker process for production)
// This is a simple implementation - in production, use a proper scheduling library
setInterval(async () => {
  try {
    // This should be handled automatically by TTL index, but adding as backup
    const result = await Url.deleteMany({ expiresAt: { $lt: new Date() } });
    if (result.deletedCount > 0) {
      console.log(`Cleaned up ${result.deletedCount} expired URLs`);
    }
  } catch (err) {
    console.error("Error in cleanup job:", err);
  }
}, 24 * 60 * 60 * 1000); // Run once a day
