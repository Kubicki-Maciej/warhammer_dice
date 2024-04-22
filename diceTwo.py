import math

def roll_probability(num_dice, num_sixes):
    """
    Calculates the probability of rolling exactly `num_sixes` sixes in `num_dice` rolls.
    Assumes fair six-sided dice.

    Args:
        num_dice (int): Number of dice rolls.
        num_sixes (int): Number of desired sixes.

    Returns:
        float: Probability of rolling exactly `num_sixes` sixes.
    """
    # Probability of rolling a six on a single die
    p_six = 1 / 6

    # Probability of rolling exactly `num_sixes` sixes
    p_exact_sixes = (p_six ** num_sixes) * ((1 - p_six) ** (num_dice - num_sixes))
    combinations = math.comb(num_dice, num_sixes)

    return p_exact_sixes * combinations

def roll_probability_on_number(num_dice, num_sixes, number):

    # Probability of rolling a six on a single die
    # 5+ | 2 , 4+ | 3
    p_six = (1+6-number) / 6

    # Probability of rolling exactly `num_sixes` sixes
    p_exact_sixes = (p_six ** num_sixes) * ((1 - p_six) ** (num_dice - num_sixes))
    combinations = math.comb(num_dice, num_sixes)

    return p_exact_sixes * combinations

def botch_probability(num_dice):
    """
    Calculates the probability of botching (rolling more ones than fours, fives, and sixes combined).

    Args:
        num_dice (int): Number of dice rolls.

    Returns:
        float: Probability of botching.
    """
    # Probability of rolling a one on a single die
    p_one = 1 / 6

    # Probability of botching
    p_botch = p_one ** num_dice

    return p_botch

# Example usage

def count_more_then_n_roll(min_dice_rolled,max_dice_rolled):
    list_of_probability = []
    for i in range(min_dice_rolled, max_dice_rolled+1):
        print(i)
        list_of_probability.append(roll_probability(max_dice_rolled, i ))
    print("_____")
    print(sum(list_of_probability))
    print("-----")
    return list_of_probability


def count_more_then_n_roll_on_number(min_dice_rolled, max_dice_rolled, number):
    list_of_probability = []
    for i in range(min_dice_rolled, max_dice_rolled+1):
        
        list_of_probability.append(roll_probability_on_number(max_dice_rolled, i ,number))
    print("_____")
    print(sum(list_of_probability))
    print("-----")
    return list_of_probability


def probbability_for_all_dices(dice_used, number):
    list_of_probability = []
    for i in range(1, dice_used+1):
        
        list_of_probability.append(roll_probability_on_number(dice_used, i ,number))
    print("_____")
    print(sum(list_of_probability))
    print("-----")
    return list_of_probability


num_dice_rolled = 6
desired_sixes = 2

print(f"Probability of rolling exactly {desired_sixes} sixes out of {num_dice_rolled} rolls: {roll_probability(num_dice_rolled, desired_sixes):.6f}")
print(f"Probability of botching with {num_dice_rolled} roll s: {botch_probability(num_dice_rolled):.6f}")

# print(count_more_then_n_roll(desired_sixes,num_dice_rolled))

print(count_more_then_n_roll_on_number(3, 6, 4))
print('************************')
print(probbability_for_all_dices(4, 6))