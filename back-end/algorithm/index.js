const inquire = require("inquirer")

const listings1 = require("./db.case1.json")
const listings2 = require("./db.case2.json")
const listings3 = require("./db.case3.json")

const neededContainer = 10;
const listings = listings2;

//Sort list container renter

listings.sort(function (number1, number2) {
    return number1.totalCost - number2.totalCost
})

let initValue = neededContainer
let outPutMessage = [] //out put message
let sumTotalCost = 0 //sum total cost

//Forech listings 
listings.every(function (item) {

    initValue = initValue - parseInt(item.container)

    if (initValue >= 0) {
        let renterContainer = {
            name: `[Contract with] ${item.name} ${item.container} container, price: ${item.totalCost}`
        }

        outPutMessage.push(renterContainer);

        sumTotalCost += parseInt(item.totalCost)
        
        //if rent enoungh container --> break forEach
        if(initValue === 0){
            return false
        }
    }

    return true
})

//if not enought container

if (initValue > 0){
    outPutMessage.push({
        name: `Not enough containers`
    })
    
}

const summaryOutPut = {
    name: `[Summary] total cost ${sumTotalCost}`
}

outPutMessage.push(summaryOutPut)

console.log(outPutMessage)
