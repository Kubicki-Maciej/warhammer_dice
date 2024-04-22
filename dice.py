def Newton( n, k ):
    # k - kosci - n number
    Wynik = 1
    for i in range( 1, k+1 ):
        Wynik = Wynik * ( n - i + 1 ) / i

    return Wynik
 

def rolldice(rollCount):

    list = []
    total = 0

    rolls = range(rollCount+1)
    for i in rolls:
        print(i)
        R = Newton(rollCount,i)*(5/6)**(i)*(1/6)**(rollCount-i)

        print(f'Prawdopodobienstwo ze zostana wyrzucone DOKLADNIE {rollCount-i} szostki {R}')
        total = total + R

        list.append(R)

    print(total)

    return list

l = rolldice(12)

