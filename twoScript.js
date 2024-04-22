let elementUnits = document.getElementById("units");

class Unit {
  // klasa glowna
  constructor(
    unitAtacks,
    unitSave,
    unitHP,
    unitKeyWords,
    unitBrave,
    unitMove,
    unitNumberOfModels,
    name
  ) {
    this.unitAtacks = unitAtacks;
    this.unitSave = unitSave;
    this.unitHP = unitHP;
    this.unitKeyWords = unitKeyWords;
    this.unitBrave = unitBrave;
    this.unitMove = unitMove;
    this.unitNumberOfModels = unitNumberOfModels;
    this.name = name;

    this.listOfObjectAtacks = [];
    this.createListOfAtacks();

    this.unitOnSite = "";
    this.createUnitOnSite();

    // this.unit = "";
  }

  createListOfAtacks() {
    // this atacks for each => append new object atack to list of objects atacks
    this.unitAtacks.forEach((singleAtack) => {
      console.log(singleAtack);
      let tempAtack = new Atack(this, singleAtack);
      this.listOfObjectAtacks.push(tempAtack);
    });
    console.log(this.listOfObjectAtacks);
  }

  createUnitOnSite() {
    this.unit = document.createElement("div");
    this.unit.className = "unit";

    this.unitProperties = document.createElement("div");
    this.unitProperties.className = "unitProperties";
    this.unit.appendChild(this.unitProperties);

    this.unitTopBar = document.createElement("div");
    this.unitTopBar.className = "unitTopBar";
    this.unitProperties.appendChild(this.unitTopBar);

    this.unitInformationRow = document.createElement("div");
    this.unitInformationRow.className = "unitInformationRow";
    this.unitInformation = document.createElement("div");
    this.unitInformation.className = "unitInformation";
    this.unitNameKeyWord = document.createElement("div");
    this.unitNameKeyWord.className = "unitNameKeyWord";
    this.unitName = document.createElement("div");
    this.unitName.className = "unitName";
    this.unitKeyword = document.createElement("div");
    this.unitKeyword.className = "unitKeyword";
    this.buffs = document.createElement("div");
    this.buffs.className = "buffs";

    this.unitProperties.appendChild(this.unitInformationRow);
    this.unitProperties.appendChild(this.buffs);

    this.unitInformationRow.appendChild(this.unitInformation);
    this.unitInformationRow.appendChild(this.unitNameKeyWord);

    this.unitNameKeyWord.appendChild(this.unitName);
    this.unitNameKeyWord.appendChild(this.unitKeyword);

    elementUnits.appendChild(this.unit);

    this.unitName.textContent = `Name: ${this.name}`;
    this.unitKeyword.textContent = `Keyword: ${this.keyWordsInOneLine()}`;

    this.unitInformation.textContent = `HP: ${this.unitHP} Save: ${this.unitSave}  Move: ${this.unitMove}  Brave ${this.unitBrave}`;

    // unit constructor on site
  }
  keyWordsInOneLine() {
    let singleRowText = "";
    let firstElement = true;
    this.unitKeyWords.forEach((keyword) => {
      if (firstElement) {
        singleRowText += `${keyword}`;
        firstElement = false;
      } else {
        singleRowText += `, ${keyword}`;
      }
    });
    console.log(singleRowText);
    return singleRowText;
  }
}

class Buff {
  // element obiektu unit
}

class Atack {
  // element obiektu unit
  constructor(unitObject, unitAtack) {
    this.UnitObject = unitObject;
    this.unmodifyAtack = unitAtack;

    this.ToHitElementAtack = "";
    this.ToWoundElementAtack = "";
    this.SaveElement = "";

    this.convertAtack();
  }

  convertAtack() {
    this.ToHitElementAtack = new AtackElement();
    this.ToWoundElementAtack = new AtackElement();
    this.SaveElement = new AtackElement();
  }
}

class AtackElement {
  // element obiektu Atack

  constructor(
    atackObject,
    atackCharacteristicsName,
    atackCharacteristicsValue
  ) {
    this.AtackObject = atackObject;

    this.name = atackCharacteristicsName;
    this.value = atackCharacteristicsValue;
    this.table = "";
  }

  createTable() {}
}

let Vendicators = new Unit(
  [
    { atackName: "mele", toHit: 3, toWound: 3, toRend: 1, numberOfAtacks: 2 },
    {
      atackName: "BIGMELE",
      toHit: 4,
      toWound: 3,
      toRend: 2,
      numberOfAtacks: 1,
    },
  ],
  3,
  2,
  ["Stormcast", "Redemer"],
  7,
  5,
  5,
  "vindictaros"
);

// createGetter
