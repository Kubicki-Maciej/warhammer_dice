from bs4 import BeautifulSoup
import requests
import csv
import json


army_name = 'stormcast-eternals'

class Unit:

    def __init__(self, name, id):
        self.id = id
        self.name = name
        self.table_atacks_objects = []
        self.movement = 0
        self.save = 0
        self.wounds = 0
        self.bravery = 0
        self.keywords_list = ''

    def add_atack(self, atack_name,range, atacks, to_hit, to_wound, rend, damage):
        self.table_atacks_objects.append({
            "atack_name":atack_name,
            "range":range,
            "atacks":atacks,
            "to_hit":to_hit,
            "to_wound":to_wound,
            "rend":rend,
            "damage":damage
        })

def open_csv(file_name):
    list_of_units = []

    with open(f'{file_name}.csv', 'r') as file:
        reader = csv.reader(file)
        for row in reader:
            list_of_units.append(row)

    list_of_units.pop(0)
    return list_of_units


def all_units_scripe():
    url = "https://wahapedia.ru/aos3/factions/stormcast-eternals/Drakesworn-Templar"
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html5lib')


def get_stats_units():
    url = "https://wahapedia.ru/aos3/factions/stormcast-eternals/Drakesworn-Templar"
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html5lib')

list_unit_name_for_input = []
list_of_units = []
log_units = []

def webscripe_single_unit(url, unit_name, index):
    list_unit_name_for_input.append(unit_name)
    # url = "https://wahapedia.ru/aos3/factions/stormcast-eternals/Drakesworn-Templar"
    temp_object = Unit(unit_name, index)
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html5lib')
    unit_stats = soup.find("div", attrs={"class" : "AoS_profile"})
    try:
        wound = unit_stats.find("div", attrs={"class": "wsWounds"})
        wound_text = wound.text
        temp_object.wounds = wound_text
    except:
        temp_object.wounds = "special"
    try:
        move = unit_stats.find("div", attrs={"class": "wsMove"})
        move_text = move.text
        temp_object.movement =move_text
    except:
        temp_object.movement ="special"
    try:
        bravery = unit_stats.find("div", attrs={"class": "wsBravery"})
        bravery_text = bravery.text
        temp_object.bravery = bravery_text
    except:
        print("none stat brave")
        temp_object.bravery = "special"
    try:
        save = unit_stats.find("div", attrs={"class": "wsSave"})
        save_text = save.text.split("+")[0]
        temp_object.save = save_text
    except:
        temp_object.save = 'special'

    unit_keywords = soup.findAll("td", attrs= {"class": "wsKeywordLine"})
    try:
        unit_keywords_text = unit_keywords[0].text
    except:
        log_units.append({
            "url": url,
            "err": "brak keywardow"
        })

    unit_atacks = soup.findAll("div", attrs={"class": "wsTable"})
    # bs_stats = BeautifulSoup(unit_stats[0], 'html5lib')

    try:
        unit_atacks_table = unit_atacks[0].findAll("tr")
        for atack in unit_atacks_table:
            if 'wsHeaderRow' in atack.get('class', []):
                print('TWORZY TABELE')

            if 'wsDataRow' in atack.get('class', []):

                atacks = atack.findAll("td")

                if atacks.__len__() < 2:
                    print('zakrótkie')
                else:
                    print(atacks)
                    print(atacks.__len__())
                    print(atacks[1].text)
                    try:
                        # jezeli jest stormblast / starsoulmace
                        temp_object.add_atack(atacks[1].text,atacks[2].text.split('"')[0],atacks[3].text,atacks[4].text.split("+")[0],atacks[5].text.split("+")[0], atacks[6].text.split("-")[1], atacks[7].text)
                    except:
                        print('URL NIE PRZECHODZI ' + url)
                        log_units.append({
                            "url": url,
                            "err": 'brak ataku'
                        })
        temp_object.keywords_list = unit_keywords_text
    except:
        log_units.append({
            "url": url,
            "err": "brak ataku"
        })

    list_of_units.append(temp_object.__dict__)

    # CREATE TABLE FOR DAMAGE TABLE
    # CREATE TABLE FOR DAMAGE TABLE
    # CREATE TABLE FOR DAMAGE TABLE
    # CREATE TABLE FOR DAMAGE TABLE
    # CREATE TABLE FOR DAMAGE TABLE
    # CREATE TABLE FOR DAMAGE TABLE


list_of_urls = open_csv(army_name)

index = 1
for url in list_of_urls:
    webscripe_single_unit(url[2], url[0], index)
    index +=1

army = {
    "army_name": army_name,
    "army_unit_list": list_of_units,
    "list_name_units_for_input":list_unit_name_for_input
}


def save_json(file_name, object):
    with open(f'{file_name}.json', 'w') as file:
        json.dump(object, file)

save_json(army_name, army)

save_json(f'{army_name}_err_log', {"problems":log_units})
