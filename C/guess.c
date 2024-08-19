#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int random(int N){
    srand(time(NULL));
    int value = rand() % N;
    return value;
}

int play(int turns, int range){
    int num = random(range);
    while (turns > 0){
        printf("You have %d turns left\n", turns);
        printf("Guess the number (0-%d): ", range);
        int guess;
        scanf("%d", &guess);
        if (guess == num){
            printf("Congratulations! You guessed the correct number!\n");
            return 1;
        }
        else if (guess < num){
            printf("Too low. Try again.\n");
            turns--;
        }
        else {
            printf("Too high. Try again.\n");
            turns--;
        }

    }
    return 0;
}

int main(int argc, char const *argv[])
{
    printf("Welcome to the Guessing Game\n");

    while (1){
        printf("Choose your difficulty:\n For easy enter (1)\n For medium enter (2)\n For difficult enter (3)\n");
        int diff;
        scanf("%d", &diff);

        switch (diff) {
        case 1: 
        if (play(5, 30) != 1) {
            printf("Sorry you ran out of Turns\n");
        }
        break;
        case 2: 
        if (play(3, 50) != 1) {
            printf("Sorry you ran out of Turns\n");
        }
        break;
        case 3: 
        if (play(1, 100) != 1) {
            printf("Sorry you ran out of Turns\n");
        }
        break;
        default:
            printf("INVALID Difficulty Please try again!\n");
            break;
        }

        printf("Do you want to play again? (y/n): ");
        char choice;
        scanf(" %c", &choice);
        if (choice != 'y'){
            printf("Thanks for playing!\n");
            break;
        }
    }

    return 0;
}
