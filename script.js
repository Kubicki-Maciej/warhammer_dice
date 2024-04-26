
// import {fraction_unit_list} from './input_script.js'
// dodawanie nowej jednostki 


let addUnitBtn = document.getElementById("addUnitBtn")
let elementUnits = document.getElementById("units");
let inputField = document.getElementById("myInput")

class UnitManager{
  constructor() {
    this.UnitObjectLists = []
  }

  addNewUnit(unit){
    this.UnitObjectLists.push(
      new Unit(
        revampAtacks(unit.table_atacks_objects),
        unit.save,
        unit.wounds,
        unit.keywords_list,
        unit.bravery,
        unit.movement,
        1,
        unit.name
      )
    )
  }
}
let UM = new UnitManager()

addUnitBtn.addEventListener('click', ()=>{
  // console.log(fractionData);
  // elementUnits.appendChild(newElement)
  let pickedUnit = getObjectByName(inputField.value ,fractionData.army_unit_list)
  console.log(pickedUnit);
  UM.addNewUnit(pickedUnit)

})

function getObjectByName(name, list) {
  return list.find(obj => obj.name === name);
}

function revampAtacks(atackList){
  let tempAtackList = []
  atackList.forEach((atack)=>{
    tempAtackList.push({
      atackName: atack.atack_name,
      toHit: parseInt(atack.to_hit),
      toWound: parseInt(atack.to_wound),
      toRend: parseInt(atack.rend),
      numberOfAtacks: parseFloat(atack.atacks),
      atackDmg: parseInt(atack.damage)
    })
  })

  return tempAtackList
}


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
    
    this.unitOnSite = "";
    this.createUnitOnSite();
    this.createListOfAtacks();

    // this.unit = "";
  }

  createListOfAtacks() {
    // this atacks for each => append new object atack to list of objects atacks
    this.unitAtacks.forEach((singleAtack) => {
      let tempAtack = new Atack(this, singleAtack);
      this.listOfObjectAtacks.push(tempAtack);
    });

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

    
    this.unitDivModelCount = document.createElement("div")
    this.unitDivModelCount.className = "unitNumberDiv"

    this.btnUnitCount = document.createElement("button")
    this.btnUnitCount.className = "buttonSelectInput"
    this.btnUnitCount.textContent = 'Zapisz'

    this.btnUnitCount.addEventListener('click',()=>{
        // update first table to hit
      this.updateTableToHit()
    })

    
    
    this.unitDivTextModelCount = document.createElement("a")
    this.unitDivTextModelCount.textContent = 'Ilość modeli'

    this.unitInformation.appendChild(this.unitDivModelCount)
    this.unitDivModelCount.appendChild(this.unitDivTextModelCount)
    
    

    this.unitModelCount = document.createElement("input")
    
    this.unitModelCount.className = "unitModelCount"
    this.unitModelCount.type = "number"
    this.unitModelCount.min = "1"
    this.unitModelCount.max = "60"
    this.unitModelCount.value = "1"
    

    this.unitStats = document.createElement("div")
    this.unitStats.textContent = `HP: ${this.unitHP} Save: ${this.unitSave}  Move: ${this.unitMove}  Brave ${this.unitBrave}`;
    

    this.unitDivModelCount.appendChild(this.unitDivTextModelCount)
    this.unitDivModelCount.appendChild(this.unitModelCount)
    this.unitDivModelCount.appendChild(this.btnUnitCount)

    this.unitInformation.appendChild(this.unitStats)
    
    

    this.unitNameKeyWord = document.createElement("div");
    this.unitNameKeyWord.className = "unitNameKeyWord";
    this.unitName = document.createElement("div");
    this.unitName.className = "unitName";
    this.unitKeyword = document.createElement("div");
    this.unitKeyword.className = "unitKeyword";
    this.buffs = document.createElement("div");
    this.buffs.className = "buffs";
    this.atacksDiv = document.createElement("div")
    this.atacksDiv.className = 'atacks'
    
    this.unitProperties.appendChild(this.buffs);
    this.unitProperties.appendChild(this.atacksDiv)
    
    this.unitTopBar.appendChild(this.unitInformation);
    this.unitTopBar.appendChild(this.unitInformationRow);
    
    this.unitInformationRow.appendChild(this.unitNameKeyWord);

    this.unitNameKeyWord.appendChild(this.unitName);
    this.unitNameKeyWord.appendChild(this.unitKeyword);

    elementUnits.appendChild(this.unit);

    this.unitName.textContent = `Name: ${this.name}`;
    this.unitKeyword.textContent = `Keyword: ${this.unitKeyWords}`;

    

    // unit constructor on site
  }

  updateTableToHit(){
    this.listOfObjectAtacks.forEach((atack)=>{
      atack.updateAtacks()
    })
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
    this.countAtacks = unitAtack.numberOfAtacks
    this.atackDmg = unitAtack.atackDmg
    this.atackRend = unitAtack.toRend

    this.numberOfAtacks = this.numberOfAtacksByWeapon(this.UnitObject.unitNumberOfModels)

    //objects
    this.ToHitElementAtack = "";
    this.ToWoundElementAtack = "";
    this.SaveElement = "";


    // elements
    this.AtackDiv = document.createElement("div")
    this.AtackDiv.className = "atack"
    this.UnitObject.atacksDiv.appendChild(this.AtackDiv)

    this.AtackElementNameAndSave = document.createElement("div")
    this.AtackElementNameAndSave.className = "atackNameAndEnemySave"
    
    this.AtackElementName = document.createElement("div")
    this.AtackElementName.className = "atackName"
    this.AtackElementName.textContent = this.unmodifyAtack.atackName
    this.DivElementTableForTables = document.createElement("div")
    this.DivElementTableForTables.className = "atacksTables"
    this.AtackDiv.appendChild(this.AtackElementNameAndSave)
    this.AtackDiv.appendChild(this.DivElementTableForTables)
    this.AtackElementNameAndSave.appendChild(this.AtackElementName)

    this.inputSave = document.createElement("input")
    this.inputSave.className = "inputSave"
    this.inputSave.type = "number"
    this.inputSave.min = "1"
    this.inputSave.max = "6"
    this.inputSave.value = "3"
    this.AtackElementNameAndSave.appendChild(this.inputSave)

    this.ToHitElementAtack = ''
    this.ToWoundElementAtack =''
    this.SaveElement =''
    this.convertAtack();
  }

  numberOfAtacksByWeapon(numberModels){
    return numberModels * this.countAtacks
  }

  updateAtacks(){
    let numberOfModels = this.UnitObject.unitModelCount.value
    this.ToHitElementAtack.changeNumberOfAtacks(this.numberOfAtacksByWeapon(parseInt(numberOfModels)))
  }
  
  convertAtack() {
    this.ToHitElementAtack = new AtackElement(this, "hit", this.unmodifyAtack.toHit);
    this.ToWoundElementAtack = new AtackElement(this, "wound", this.unmodifyAtack.toWound);
    this.SaveElement = new AtackElement(this, "save");
  }

}

class AtackElement {
  // element obiektu Atack

  constructor(
    atackObject,
    atackCharacteristicsName,
    atackCharacteristicsValue,
    tableType
  ) {

    this.AtackObject = atackObject;
    this.tableType = tableType
    this.name = atackCharacteristicsName;
    this.value = atackCharacteristicsValue;
    this.shortName = this.crateShortName()
    this.table = "";


    this.createTable()
  }

  crateShortName(){
    return `table${this.name}`
  }

  createTable() {
    this.table = new TableStatistic(this)
  }
  
  changeNumberOfAtacks(numberOfAtack){
    this.table.updateChart(numberOfAtack)
  }

  changeTableToWound(numberOfAtack){
    if(this.name == 'hit'){
      this.AtackObject.ToWoundElementAtack.table.updateChart(numberOfAtack)
    }
  }
  getValueToSave(numberOfAtack){
    let saveValue = parseInt(this.AtackObject.inputSave.value)
    this.AtackObject.SaveElement.table.updateSaveChart(numberOfAtack, saveValue)  
  }
  createTableToSave(){
    if(this.name == 'wound'){

    }
  }
}

class TableStatistic{
  constructor(atackElementClass){
    this.AtackElementClass = atackElementClass
    this.dices = []
    this.labels = []
    this.createTable()
    this.clickedElementIndex = NaN
  }
  updateSaveChart(numberOfAtacksPass, saveValue){
    this.chart.data.labels = this.createLabels(numberOfAtacksPass)
    this.createDiceProbabilityList(numberOfAtacksPass, saveValue)
    this.chart.data.datasets[0].data = this.dices
    console.log('*$*#*$#*');
    console.log(this.dices);
    console.log(this.labels);
    this.chart.update()
  }

  updateChart(numberAtacksPass){
    
    this.chart.data.labels = this.createLabels(numberAtacksPass)
    this.createDiceProbabilityList(numberAtacksPass, this.AtackElementClass.value)
    // this.chart.data.labels = this.createLabels(numberAtacksPass)
    this.chart.data.datasets[0].data = this.dices
    this.chart.update()

  }

  createTable(){
    this.chartDiv = document.createElement("div")
    this.chartDiv.id = this.AtackElementClass.shortName
    this.chartDiv.className = this.AtackElementClass.shortName
    this.canvasElementTable = document.createElement("canvas")
    this.chartDiv.appendChild(this.canvasElementTable)
    this.AtackElementClass.AtackObject.DivElementTableForTables.appendChild(this.chartDiv)
    
    this.lableName = `% na wyrzucenie ilości kości dla ${this.AtackElementClass.name}`
    this.createLabels(this.AtackElementClass.AtackObject.numberOfAtacks)

    this.createDiceProbabilityList(this.AtackElementClass.AtackObject.numberOfAtacks, this.AtackElementClass.value)
    this.chart = new Chart(this.canvasElementTable, {
      type: "bar",
      data: {
        labels: this.labels,
        
        datasets: [
          {
            label: this.lableName,
            data: this.dices,
            borderWidth: 1,
          },
        ],
      },
      options: {
        onClick: (e, element)=>{
  
          if (element.length > 0) {
            let clickedLabelIndex = element[0].index;
            
            if(this.AtackElementClass.name == 'hit'){
              this.AtackElementClass.changeTableToWound(clickedLabelIndex)
            }
            if(this.AtackElementClass.name== 'wound'){
              this.AtackElementClass.getValueToSave(clickedLabelIndex)
              // this.updateSaveChart(clickedLabelIndex, saveValue)
              
            }
                      
          }
        },
        
        // events: ['click'],
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins:{
          tooltip: {
            callbacks: {
              label: ((tooltipItem, data)=>{
                let index = tooltipItem.dataIndex
                return `prawdopodobieństwo wyrzucenia  conajmniej ${index} kości wynosi : ${this.sumProbability(index).toFixed(2)}
                \n dla ${index} wynosi : ${tooltipItem.formattedValue}`
              })
            }
          }
        }
      },
    });        
  }

  createLabels(lenghthTable){
    console.log('nowy label');
    let interaction = 0
    let tableNumbers = []
    for(let i = 0; i <= lenghthTable; i++){
      tableNumbers.push(interaction)
      interaction++
    }
    this.labels = tableNumbers
    return tableNumbers

  }
  
  createDiceProbabilityList(lenghthTable, toPass){
    let probDice = new Dice().probabilityForAllDices(lenghthTable, toPass)
    this.dices = probDice
    return probDice
  }

  countClickedElementProbability(index){
    let sumNumberOfElement = 0
    for(let i=index; i < this.dices.length; i++){
      sumNumberOfElement = sumNumberOfElement + this.dices[i]
    }
    return sumNumberOfElement
  }

  sumProbability(index){
    let summ =0
    for(let i=index;i < this.dices.length; i++){
      summ = summ + this.dices[i]
    }
    console.log(summ);
    return summ
  }
}

class Dice{
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
      listOfProbability.push(
        this.probabilityOnNumber(diceUsed, i, number) * 100
      );
    }
    
    let firstElement = 100 - listOfProbability.reduce((partialSum, a) => partialSum + a, 0)
    let allProbability = []
    allProbability.push(firstElement)
    allProbability = allProbability.concat(listOfProbability)
    return allProbability;
  }
}



// let Vendicators = new Unit(
//   [
//     { atackName: "range", toHit: 3, toWound: 3, toRend: 2, numberOfAtacks: 1, atackDmg: 3},
//     {
//       atackName: "BIGMELE",
//       toHit: 4,
//       toWound: 3,
//       toRend: 2,
//       numberOfAtacks: 1,
//       atackDmg: 2
//     },
//   ],
//   3,
//   2,
//   ["Stormcast", "Redemer"],
//   7,
//   5,
//   3,
//   "vindictaros"
// );



 