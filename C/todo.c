#include <stdio.h>

#define MAX_TASKS 20
#define MAX_TASK_LENGTH 200

char *tasks[MAX_TASKS];

int add_task(){
    printf("Enter task description: ");
    scanf("%s", &tasks[0]);
    printf("Your Task has been added.\n");
    printf("%s\n", tasks[0]);
    printf("%s\n", tasks[0]);
    return 0;
}

int comlpete_task () {
    return 0;
}

int delete_task() {
    return 0;
}

int view_tasks() {
    return 0;
}

int edit_task() {
    return 0;
}

int main(int argc, char const *argv[])
{
    add_task();
    return 0;
}
