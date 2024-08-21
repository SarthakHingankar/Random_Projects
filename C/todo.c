#include <stdio.h>
#include <string.h>


const int MAX_Tasks = 10;
const int MAX_Tasklength = 30;
char tasks[MAX_Tasks][MAX_Tasklength];

void addTask(){
    printf("What tasks would you like to add?\n");
    char task[30];
    scanf("%s", &task);
    for (int i = 0; i < MAX_Tasks; i++){
        if (strcmp(tasks[i], "") == 0) {
            strcpy(tasks[i], task);
            break;
        }
    }
    printf("Task added successfully!\n");
}

void deleteTask(){

}

void completeTask(){

}

void viewTasks(){
    printf("Your Tasks are:\n");
    for (int i = 0; i < MAX_Tasks; i++) {
        if (strcmp(tasks[i], "")!= 0) {
            printf("(%d) %s\n", i + 1, tasks[i]);
        }
    }
    int wait;
    scanf("%d", &wait);
}

void viewCompletedTasks(){

}

void editTask(){

}

int main(int argc, char const *argv[])
{
    for (int i = 0; i < MAX_Tasks; i++) {
        strcpy(tasks[i], "");
    }
    

    printf("Hey there! It's Your personal todo list\n");

    while (1)
    {
        printf("What would you like to do?\n");
        printf("Add a task (1)\n");
        printf("Delete a task (2)\n");
        printf("Complete a task (3)\n");
        printf("Display all tasks (4)\n");
        printf("Edit a task (5)\n");
        printf("Display completed tasks (6)\n");
        printf("Exit (7)\n");

        int choice;
        scanf("%d", &choice);

        switch (choice)
        {
        case 1:
            addTask();
            break;
        case 2:
            deleteTask();
            break;
        case 3:
            completeTask();
            break;
        case 4:
            viewTasks();
            break;
        case 5:
            editTask();
            break;
        case 6:
            viewCompletedTasks();
            break;
        case 7:
            printf("Goodbye! Have a great day!\n");
            return 0;
        default:
            printf("Invalid choice. Please try again.\n");
            break;
        }
    }
    
    return 0;
}
