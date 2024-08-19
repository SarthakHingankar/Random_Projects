function add() {
    let note = document.querySelector('#note').value;
    if (localStorage.getItem('itemsJson') == null) {
        itemsJsonArray = [];
        itemsJsonArray.push(note);
        localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray));

    } else {
        itemsJsonStr = localStorage.getItem('itemsJson');
        itemsJsonArray = JSON.parse(itemsJsonStr);
        itemsJsonArray.push(note);
        localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray));
    }
    update();
}

function update() {

    if (localStorage.getItem('itemsJson') == null) {
        itemsJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray));
        update()

    } else {
        itemsJsonStr = localStorage.getItem('itemsJson');
        itemsJsonArray = JSON.parse(itemsJsonStr);
    
        area = document.querySelector(".notes")
        area.innerHTML=``
    
        itemsJsonArray.forEach( function(note, index) {
            if (note.length < 50) {
                area.innerHTML += `
                <div class="short" id="${index}">${note} <br>
                <button class="del" onclick="deleted(${index})">Delete</button>
                <button class="del" onclick="edit(${index})">Edit</button></div>
                `
            }
            else if (note.length > 50 && note.length < 500) {
                area.innerHTML += `
                <div class="mid" id="${index}">${note} <br>
                <button class="del" onclick="deleted(${index})">Delete</button>
                <button class="del" onclick="edit(${index})">Edit</button></div></div>
                `
            }
            else {
                area.innerHTML += `
                <div class="long" id="${index}">${note} <br>
                <button class="del" onclick="deleted(${index})">Delete</button>
                <button class="del" onclick="edit(${index})">Edit</button></div></div>
                `
            }
        });
    }

}

function deleted(i) {
    itemsJsonStr = localStorage.getItem('itemsJson');
    itemsJsonArray = JSON.parse(itemsJsonStr);
    itemsJsonArray.splice(i, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray));
    update();

}

function clearit() {
    if (confirm("Do You Want to Clear all your notes")) {
        localStorage.clear();
        update();
    }
}

// work on edit function
function edit(i) {
    itemsJsonStr = localStorage.getItem('itemsJson');
    itemsJsonArray = JSON.parse(itemsJsonStr);
    note = itemsJsonArray[i];
    body = document.querySelector('body');
    body.innerHTML +=`
    <div class="edit">
    <label for="ed">Edit</label><br />
    <textarea id="ed"> ${note} </textarea>
    <button class="done" onclick="done(${i})">Done</button>
    </div>
    `
}

function done(i) {
    itemsJsonStr = localStorage.getItem('itemsJson');
    itemsJsonArray = JSON.parse(itemsJsonStr);
    note = document.querySelector('#ed').value;
    itemsJsonArray[i] = note;
    localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray));
    update();
    dit = document.querySelector('.edit');
    dit.remove();
}

if (localStorage.getItem('itemsJson') != null) {
    update();
}