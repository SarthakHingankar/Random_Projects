import java.util.Scanner;

public class App {
    public static void main(String[] args) throws Exception {
        System.out.println("Welcome to Calculator");
        System.out.println("What opperation would you like to perform (+, -, *, /)");
        Scanner sc = new Scanner(System.in);
        String operation = sc.nextLine();
        System.out.println("Enter first number: ");
        int a = sc.nextInt();
        System.out.println("Enter second number: ");
        int b = sc.nextInt();

        switch (operation) {
            case "+":
                System.out.println("Addition of the two numbers is " + (a+b));
                break;
            case "-":
                System.out.println("Subtraction of the two numbers is " + (a-b));
                break;
            case "*":
                System.out.println("Multiplication of the two numbers is " + (a*b));
                break;
            case "/":
                if (b == 0) {
                    System.out.println("Error: Division by zero is not allowed.");
                    break;
                }
                System.out.println("Division of the two numbers is " + (a/b));
                break;
            default:
                System.out.println("Invalid operation please try again");
                break;
        }
        sc.close();
    }
}
