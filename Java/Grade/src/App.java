import java.util.Scanner;

public class App {
    public static void main(String[] args) throws Exception {
        System.out.println("Welcome to Grade Calculator");
        System.out.println("Please Enter your marks");
        Scanner sc = new Scanner(System.in);
        int[] marks = new int[5];
        for (int i = 0; i < 5; i++) {
            System.out.print("Subject " + (i+1) + ": ");
            int mark = sc.nextInt();
            marks[i] = mark;
        }
        System.out.println();
        int total = 0;
        System.out.println("Your marks are");
        for (int i = 0; i < marks.length; i++) {
            total += marks[i];
            System.out.print(marks[i] + " ");
        }
        System.out.println();
        int avg = total/5;
        String grade;
        if (avg > 90) {
            grade = "A";
        } else if (avg > 80) {
            grade = "B";
        } else if (avg > 70) {
            grade = "C";
        } else {
            grade = "D";
        }

        System.out.println("Your Total is " + total);
        System.out.println("Your Average is " + avg);
        System.out.println("And your final grade is " + grade);

        sc.close();
    }
}
