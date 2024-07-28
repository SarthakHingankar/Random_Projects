import random

Min_Balance = 1
Max_Balance = 1000

count = {
    "A": 3,
    "B": 4,
    "C": 6,
    "D": 6 
}

value = {
    "A": 5,
    "B": 4,
    "C": 2,
    "D": 2
}

def print_slots(slots):
    for row in range(len(slots[0])):
        for i, column in enumerate(slots):
            if i != len(slots) - 1:
                print(column[row], end=" | ")
            else:
                print(column[row], end="")
        print()

def check_winnings(slots, lines, bet, balance):
    balance = balance - (lines * bet)
    lines_won = 0
    multiplier = 0
    slot1 = slots[0]
    slot2 = slots[1]
    slot3 = slots[2]

    for i in range(3):
        if slot1[i] == slot2[i] == slot3[i]:
            lines_won += 1
            multiplier += value[slot1[i]]
            print(f"Line {i+1} wins!")

    if lines_won == 0:
        print("No winning combination.")
    else:
        print(f"You won total {lines_won} lines!")

    if lines_won >= lines:
        balance = balance + (lines * bet * multiplier)
    elif lines_won < lines:
        balance = balance + (lines_won * bet * multiplier)
    else:
        print("LOL IDK")

    print(f"Your new balance is ${balance}")

    return balance

def spin(lines, bet, balance):
    print(f"total bet is {lines*bet}")
    all_symbols = []
    for symbol, symbol_count in count.items():
        for _ in range(symbol_count):
            all_symbols.append(symbol)

    slots = []
    for _ in range(3):
        slot = []
        for _ in range(3):
            current_symbols = all_symbols[:]
            symbol = random.choice(current_symbols)
            slot.append(symbol)
            current_symbols.remove(symbol)
        slots.append(slot)
    print_slots(slots)
    balance = check_winnings(slots, lines, bet, balance)

    return balance

def play(balance):
    print(f"your balance is ${balance}")
    lines = int(input("How many lines would you like to bet on (1-3):"))
    bet = int(input("How much would you like to bet on each line: "))
    if (lines*bet) <= balance:
        balance = spin(lines, bet, balance)
    else:
        print("Insufficient funds.")
        return balance
    
    return balance

    

def main():
    print("$Welcome to the Slots$")
    balance = 0
    while True:
        ans = int(input("How much would you like to deposit: $"))
        if ans < Min_Balance:
            print("Insufficient funds. Please deposit at least $1.")
        elif ans >= Max_Balance:
            print("Maximum deposit limit exceeded. Deposit $1000 at max")
        else:
            balance += ans
            break

    while True:
        if balance >= Min_Balance:
            inp = input("Press enter to play (press q to quit): ")
            if inp == 'q':
                print(f"You left with ${balance}")
                break
            else:
                balance = play(balance)
        else:
            print("You ran out of fund.")
            break
    

main()