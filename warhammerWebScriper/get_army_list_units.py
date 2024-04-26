from bs4 import BeautifulSoup
import requests
import csv


# get army list units

url = "https://wahapedia.ru/aos3/factions/stormcast-eternals/warscrolls.html"
page = requests.get(url)
soup = BeautifulSoup(page.content, 'html5lib')

army_name = 'stormcast-eternals'

def get_all_units_from_scripe(army_name):
    list_of_units_name = []
    table_units = soup.findAll("div", attrs={"class":"clFl SE mw2 i30"})
    for element in table_units:
        quote = {}
        quote['unit_name'] = element.a.text
        quote['url_name'] = element.a['href'].split("#")[1]
        quote['url'] = f'https://wahapedia.ru/aos3/factions/{army_name}/{element.a["href"].split("#")[1]}'

        list_of_units_name.append(quote)
    return list_of_units_name

army = get_all_units_from_scripe(army_name)

def save_army_list(army_name, army_list):
    filename = f'{army_name}.csv'
    with open(filename, 'w', newline='') as f:

        w = csv.DictWriter(f,['unit_name','url_name','url'])
        w.writeheader()
        for unit in army_list:
            w.writerow(unit)

save_army_list(army_name, army)



# controler



# army



# single page



# mutli page


