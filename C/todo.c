#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_TASKS 10
#define MAX_LENGTH 100

char *list[MAX_TASKS];
int numTask = 0;

void addTasks()
{
    if (numTask <= MAX_TASKS)
    {
        char task[MAX_LENGTH];
        printf("Enter your task: ");
        fgets(task, sizeof(task), stdin);
        getchar();
        printf("%s\n", task);
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
    printf("Press Enter to continue...\n");
    getchar();
}

void viewTasks()
{
    int num_strings = sizeof(list) / sizeof(list[0]);
    for (int i = 0; i < num_strings; i++)
    {
        printf("(%i) %s\n", i + 1, list[i]);
    }
    printf("Press Enter to continue...\n");
    getchar();
}

int main(int argc, char const *argv[])
{
    int choice = 1;
    int running = 1;
    printf("Welcome to your very own todo list!\n");

    while (running)
    {

        printf("Enter (1) to Add Task\n"
               "Enter (2) to View Task\n"
               "Enter (3) to Complete Task\n"
               "Enter (4) to Delete Task\n"
               "Enter (5) to Edit Task\n"
               "Enter (6) to Exit\n");

        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice)
        {
        case 1:
            printf("What task would you like to add?\n");
            addTasks();
            break;
        case 2:
            printf("Your Tasks are:\n");
            viewTasks();
            break;
        case 3:
            printf("3\n");
            break;
        case 4:
            printf("4\n");
            break;
        case 5:
            printf("5\n");
            break;
        case 6:
            printf("Thanks for using! Have a great day!\n");
            running = 0;
            break;
        default:
            printf("Invalid choice. Please try again.\n");
            break;
        }
    }

    for (int i = 0; i < numTask; i++)
    {
        free(list[i]);
    }

    return 0;
}
