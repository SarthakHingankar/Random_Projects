import java.util.Scanner;
import java.util.ArrayList;

public class App {
    public static void main(String[] args) throws Exception {

        Scanner sc = new Scanner(System.in);
        ArrayList<Book> library = new ArrayList<>();

        System.out.println("Welcome to the Library System");
        Boolean a = true;
        while (a) {
            System.out.println("1. Add Book\r\n" + //
                        "2. View All Books\r\n" + //
                        "3. Search Book\r\n" + //
                        "4. Exit");
            System.out.print("Enter Your Choice: ");
            int res = sc.nextInt();
            sc.nextLine();
            switch (res) {
                case 1:
                    System.out.print("Enter Name of the Book: ");
                    String name = sc.nextLine();
                    System.out.print("Enter Name of the Author: ");
                    String author = sc.nextLine();
                    System.out.print("Enter ISBN number of the Book: ");
                    int ISBN = sc.nextInt();
                    Book book1 = new Book(name, author, ISBN);
                    library.add(book1);
                    break;
                case 2:
                    for (Book book : library){
                        book.display();
                    }
                    break;
                case 3:
                    System.out.print("Enter Name of the Book you want to find: ");
                    String search = sc.nextLine();
                    Boolean found = false;
                    for(Book book : library){
                        if (book.name.equalsIgnoreCase(search)) {
                            book.display();
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                            System.out.println("No such book found");
                    }
                    break;
                case 4:
                    a = false;
                    break;
                default:
                   System.out.println("Invalid Choice Please Try Again");
                    break;
            }
        }
        sc.close();
    }
}

class Book {

    String name;
    String author;
    int isbn;

    public Book(String name, String author, int ISBN){
        this.name = name;
        this.author = author;
        this.isbn = ISBN;
    }

    public void display(){
        System.out.println("Title: " + name + ", Author: " + author + ", ISBN: " + isbn);
    }
    
}
