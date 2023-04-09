function roll(number){
    return Math.ceil(Math.random()*number)
}

let result = document.querySelector("#result");
let warning = document.querySelector("#warning");
let input = document.querySelector("#roll-txt");
let btnRoll = document.querySelector("#roll-btn");
let average = document.querySelector("#average");
let maximum = document.querySelector("#maximum");
let rollHistory = document.querySelector("#roll-history");
let btnClearHistory = document.querySelector("#clear-history");

btnRoll.addEventListener("click", function(){
    let total = 0;
    let inputText = input.value;
    let dIndex = inputText.indexOf("d");
    // console.log(dIndex);
    let numberOfRolls = Number(inputText.substring(0, dIndex));
    // console.log(numberOfRolls);
    let sidesOfDice = Number(inputText.substring(dIndex+1));
    // console.log(sidesOfDice);
    result.innerHTML = "";
    for(let i = 0; i < numberOfRolls; i++){  
        let singleroll;   
        switch(sidesOfDice){
            case 4:
            case 6:
            case 8:
            case 10:
            case 12:
            case 20:
            case 100: 
                singleroll = roll(sidesOfDice);
                result.innerHTML += "[" + singleroll + "]"; 
                total += singleroll;
                warning.innerHTML = ""; 
                
                break;
            default: 
                result.innerHTML = "";
                warning.innerHTML = "You didn't enter a valid dice number. Valid dice numbers are 4, 6, 8, 10, 12, 20, 100. Example: 10d8, 6d6, etc."; 
                break;
        }
    }
    if(inputText && !warning.innerHTML){
        document.querySelector("#total").innerHTML = "&nbsp" + "= " + total;
        average.innerHTML = "&nbsp" + numberOfRolls*sidesOfDice*0.6;
        maximum.innerHTML = "&nbsp" + numberOfRolls*sidesOfDice;
        rollHistory.innerHTML += "<h3>" + "[" + numberOfRolls + "d" + sidesOfDice + "] = " + total + "&nbsp</h3>";
    }
    else {
        document.querySelector("#total").innerHTML = "";
        average.innerHTML = "";
        maximum.innerHTML = "";
    }
    window.localStorage.setItem("roll-history", rollHistory.innerHTML);
    
});
function clearLS(){
    window.localStorage.clear();
    rollHistory.innerHTML = "";
}

btnClearHistory.addEventListener("click", clearLS);
window.onload = () => {
    if(localStorage.getItem("roll-history")){
        rollHistory.innerHTML = localStorage.getItem("roll-history");
    }
}