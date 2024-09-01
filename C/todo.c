#include <stdio.h>

int main(int argc, char const *argv[])
{
    int choice;
    int running = 1;

    while (running)
    {

        printf("Welcome to your very own todo list!\n");
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
            printf("What task would you like to add?");
            break;
        case 2:
            printf("2");
            break;
        case 3:
            printf("3");
            break;
        case 4:
            printf("4");
            break;
        case 5:
            printf("5");
            break;
        case 6:
            printf("6");
            break;
        default:
            printf("Invalid choice. Please try again.\n");
            break;
        }
    }
    return 0;
}
