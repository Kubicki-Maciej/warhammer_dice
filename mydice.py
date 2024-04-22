import random

def roll():
    return random.randint(1,6)


list_rolls = []

for i in range(1,5000):
    list_rolls.append(roll())

print(list_rolls)
print(sum(list_rolls))
print(sum(list_rolls/5000))