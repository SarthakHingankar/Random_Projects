import java.util.Scanner;
import java.util.ArrayList;

public class App {
    public static void main(String[] args) throws Exception {

        Scanner sc = new Scanner(System.in);
        ArrayList<Task> tasks = new ArrayList<>();

        System.out.println("Welcome to your To Do List");
        Boolean running = true;

        while (running) {

            System.out.println("1. Add Task\r\n" + //
                                "2. View Tasks\r\n" + //
                                "3. Mark Task as Complete\r\n" + //
                                "4. Delete Task\r\n" + //
                                "5. Exit");
            System.out.print("Enter Your Choice: ");
            int res = sc.nextInt();
            sc.nextLine();

            switch (res) {
                case 1:
                    System.out.print("Enter your Task: ");
                    String Task = sc.nextLine();
                    Task task1 = new Task(Task);
                    tasks.add(task1);
                    break;
                case 2:
                    System.out.println("Incomplete Tasks:");
                    for (Task task : tasks){
                        if (!task.isCompleted()) {
                            task.display();
                        }
                    }
                    System.out.println("Completed Tasks:");
                    for (Task task : tasks){
                        if (task.isCompleted()) {
                            task.display();
                        }
                    }
                    break;
                case 3:
                    for (Task task : tasks){
                        task.display();
                    }
                    System.out.println("Which task did you complete");
                    String comp = sc.nextLine();
                    for (Task task : tasks){
                        if (task.task.equalsIgnoreCase(comp)) {
                            task.complete();
                        }
                    }
                    break;
                case 4:
                    for (Task task : tasks){
                        task.display();
                    }
                    System.out.println("Which task do you want to delete");
                    String ts = sc.nextLine();
                    tasks.removeIf(task -> task.task.equalsIgnoreCase(ts));
                    System.out.println("Task deleted successfully");
                    break;
                case 5:
                    running = false;
                    break;
                default:
                    System.out.println("Invalid Choice Please try again");
                    break;
            }
        }

        sc.close();
    }
}

class Task {
    String task;
    private Boolean completed;
    
    public Task(String task){
        this.task = task;
        this.completed = false;
    }

    public void display(){
        System.out.println(task);
    }

    public Boolean isCompleted(){
        return completed;
    }

    public void complete(){
        completed = true;
    }
}