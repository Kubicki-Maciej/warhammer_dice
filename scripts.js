const tableAtack = document.getElementById("tableAtacks");
const btnAddAtack = document.getElementById("createAtack");

function w() {
  let w = 5 / 6;
}

function createAttackRow(id) {
  let atackRow = document.createElement("div");
  atackRow.id = `row_${id}`;
  atackRow.className = "unit";

  let atackName = document.createElement("input");
  let atackRowCount = document.createElement("input");
  let atackRowToHit = document.createElement("input");
  let atackRowToWound = document.createElement("input");
  let atackRowDamage = document.createElement("input");
  let btnSaveAtack = document.createElement("button");

  let elementName = document.createElement("div");
  let textEleName = document.createElement("p");
  textEleName.textContent = "Atack name";
  elementName.appendChild(textEleName);
  elementName.appendChild(atackName);

  let elementCount = document.createElement("div");
  let textEleCount = document.createElement("p");
  textEleCount.textContent = "Atack Count";
  elementCount.appendChild(textEleCount);
  elementCount.appendChild(atackRowCount);

  let elementToHit = document.createElement("div");
  let textToHit = document.createElement("p");
  textToHit.textContent = "To Hit";
  elementToHit.appendChild(textToHit);
  elementToHit.appendChild(atackRowToHit);

  let elementToWound = document.createElement("div");
  let textEleToWound = document.createElement("p");
  textEleToWound.textContent = "To Wound";
  elementToWound.appendChild(textEleToWound);
  elementToWound.appendChild(atackRowToWound);

  let elementDamage = document.createElement("div");
  let textDamage = document.createElement("p");
  textDamage.textContent = "Atack Dmg";
  elementDamage.appendChild(textDamage);
  elementDamage.appendChild(atackRowDamage);

  atackName.id = `atackName_${id}`;
  atackRowCount.id = `atackRowCount_${id}`;
  atackRowToHit.id = `atackRowToHit_${id}`;
  atackRowToWound.id = `atackRowToWound_${id}`;
  atackRowDamage.id = `atackRowDamage_${id}`;
  btnSaveAtack.id = `btnSaveAtack_${id}`;

  btnSaveAtack.textContent = "save";
  atackName.placeholder = "atack name";
  atackRowCount.placeholder = `atack number`;
  atackRowToHit.placeholder = `to hit`;
  atackRowToWound.placeholder = `to wound`;
  atackRowDamage.placeholder = `atack dmg`;

  atackRow.appendChild(elementName);
  atackRow.appendChild(elementCount);
  atackRow.appendChild(elementToHit);
  atackRow.appendChild(elementToWound);
  atackRow.appendChild(elementDamage);
  atackRow.appendChild(btnSaveAtack);

  btnSaveAtack.addEventListener("click", (element) => {
    let elementType = element.srcElement.textContent;
    if (elementType == "save") {
      element.srcElement.textContent = "change";
      atackName.disabled = true;
      atackRowCount.disabled = true;
      atackRowToHit.disabled = true;
      atackRowToWound.disabled = true;
      atackRowDamage.disabled = true;
    } else {
      element.srcElement.textContent = "save";
      atackName.disabled = false;
      atackRowCount.disabled = false;
      atackRowToHit.disabled = false;
      atackRowToWound.disabled = false;
      atackRowDamage.disabled = false;
    }
  });

  tableAtack.appendChild(atackRow);
}
btnAddAtack.addEventListener("click", () => {
  createAttackRow(Vendicators.atackCounter);
  Vendicators.atackCounter += 1;
});

function btnSaveAtack(element) {
  console.log(element.className);
}

function sucessGenerator(value, atacks) {
  succesThrow = value / 6;
  fail = succesThrow - 1;

  // ilosc mozliwosci dla 2 kosci jest to 12 dla 3 74
}

// atacks| to hit | to wound | dmg
const atackDict = {
  MeleWeapon: { atacks: 2, toHit: 3, toWound: 3, rend: 1, dmg: 1 },
};

class Dice {
  binomialCoefficient(n, k) {
    if (k > n) {
      return 0;
    }
    function factorial(num) {
      if (num === 0 || num === 1) {
        return 1;
      } else {
        return num * factorial(num - 1);
      }
    }
    return factorial(n) / (factorial(k) * factorial(n - k));
  }

  probabilityOnNumber(numDice, numDiceExpected, number) {
    let probDice = (1 + 6 - number) / 6;
    let probExactNumber =
      probDice ** numDiceExpected *
      (1 - probDice) ** (numDice - numDiceExpected);
    let combinations = this.binomialCoefficient(numDice, numDiceExpected);
    return probExactNumber * combinations;
  }

  probabilityForAllDices(diceUsed, number) {
    let listOfProbability = [];

    for (let i = 1; i < diceUsed + 1; i++) {
      console.log(i);
      listOfProbability.push(
        this.probabilityOnNumber(diceUsed, i, number) * 100
      );
    }
    console.log(listOfProbability);
    return listOfProbability;
  }
}

class ChartBar {
  createLabel(numberOfDice) {
    let listLabel = [];
    for (let i = 1; i < numberOfDice + 1; i++) {
      listLabel.push(i);
    }
    return listLabel;
  }
}
class Unit {
  constructor(atacks, wound, save) {
    this.wound = wound;
    this.save = save;
    this.atacks = atacks;
    this.atackCounter = 1;
  }

  UnitAllAtacks() {
    for (let atack in this.atacks) {
      let atacksListStatistc = [];
      if (this.atacks.hasOwnProperty(atack)) {
        let value = this.atacks[atack];
        console.log(`To Hit ${value["toHit"]} | To Wound ${value["toWound"]}`);
      }
    }
  }
}

const Vendicators = new Unit(atackDict, 2, 3);
Vendicators.UnitAllAtacks();

const dice = new Dice();
let kostki = dice.probabilityForAllDices(10, 4);

const chartObject = document.getElementById("myChart");
// console.log(czarcik);

const chart = new Chart(chartObject, {
  type: "bar",
  data: {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [
      {
        label: "% na wyrzucenie ilości kości",
        data: kostki,
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
