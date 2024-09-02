#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <windows.h>

#define MAX_TASKS 10
#define MAX_LENGTH 100

char *list[MAX_TASKS];
int numTask = 0;
int completedTask = 0;

void addTasks()
{
    if (numTask < MAX_TASKS)
    {
        char task[MAX_LENGTH];
        printf("Enter your task: ");
        fgets(task, sizeof(task), stdin);
        Sleep(500);
        list[numTask] = malloc(strlen(task) + 1);
        if (list[numTask] != NULL)
        {
            strcpy(list[numTask], task);
            numTask++;
            printf("Task added successfully.\n");
        }
        else
        {
            printf("Memory allocation failed.\n");
        }
    }
    else
    {
        printf("Max task limit reached\n");
    }
    printf("Press Enter to continue...");
    getchar();
}

void viewTasks()
{
    for (int i = 0; i < numTask; i++)
    {
        if (list[i] != NULL)
        {
            printf("(%i) %s", i + 1, list[i]);
        }
    }
}

void completeTask()
{
    viewTasks();

    printf("Enter serial number: ");
    int taskNumber;
    scanf("%d", &taskNumber);
    int c;
    while ((c = getchar()) != '\n' && c != EOF)
        ;

    if (taskNumber > 0 && (taskNumber - 1) < numTask)
    {
        free(list[(taskNumber - 1)]);

        for (int i = (taskNumber - 1); i < (numTask - 1); i++)
        {
            list[i] = list[i + 1];
        }

        completedTask++;
        numTask--;

        printf("Task completed successfully.\n");
        printf("Total completed tasks: %d\n", completedTask);
    }
    else
    {
        printf("Invalid index\n");
    }
    Sleep(500);
    printf("Press Enter to continue...");
    getchar();
}

void deleteTask()
{
    viewTasks();

    printf("Enter serial number: ");
    int taskNumber;
    scanf("%d", &taskNumber);
    int c;
    while ((c = getchar()) != '\n' && c != EOF)
        ;

    if (taskNumber > 0 && (taskNumber - 1) < numTask)
    {
        free(list[(taskNumber - 1)]);
        for (int i = (taskNumber - 1); i < (numTask - 1); i++)
        {
            list[i] = list[i + 1];
        }

        numTask--;

        printf("Task deleted successfully.\n");
    }
    else
    {
        printf("Invalid index\n");
    }

    printf("Press Enter to continue...");
    getchar();
}

void editTask()
{
    viewTasks();

    printf("Enter serial number: ");
    int taskNumber;
    scanf("%d", &taskNumber);
    int c;
    while ((c = getchar()) != '\n' && c != EOF)
        ;

    if (taskNumber > 0 && (taskNumber - 1) < numTask)
    {
        char newTask[MAX_LENGTH];
        printf("Enter your new task: ");
        fgets(newTask, sizeof(newTask), stdin);
        Sleep(500);
        strcpy(list[(taskNumber - 1)], newTask);

        printf("Task edited successfully.\n");
    }
    else
    {
        printf("Invalid index\n");
    }

    printf("Press Enter to continue...");
    getchar();
}

int main(int argc, char const *argv[])
{
    int running = 1;
    printf("Welcome to your very own todo list!\n");

    while (running)
    {
        Sleep(500);
        printf("Enter (1) to Add Task\n"
               "Enter (2) to View Task\n"
               "Enter (3) to Complete Task\n"
               "Enter (4) to Delete Task\n"
               "Enter (5) to Edit Task\n"
               "Enter (6) to Exit\n");

        printf("Enter your choice: ");
        int choice = 0;
        scanf("%i", &choice);

        int c;
        while ((c = getchar()) != '\n' && c != EOF)
            ;

        switch (choice)
        {
        case 1:
            addTasks();
            break;
        case 2:
            printf("Your Tasks are:\n");
            Sleep(500);
            viewTasks();
            break;
        case 3:
            printf("Which task did you complete\n");
            Sleep(500);
            completeTask();
            break;
        case 4:
            printf("Which task would you like to delete\n");
            Sleep(500);
            deleteTask();
            break;
        case 5:
            printf("Which task would you like to edit\n");
            Sleep(500);
            editTask();
            break;
        case 6:
            Sleep(500);
            printf("Thanks for using! Have a great day!\n");
            running = 0;
            break;
        default:
            printf("Invalid choice. Please try again.\n");
            break;
        }
    }

    int n = sizeof(list) / sizeof(list[0]);
    for (int i = 0; i < n; i++)
    {
        free(list[i]);
    }

    return 0;
}
