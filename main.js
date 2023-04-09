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
let leftDie = document.querySelector("#left-die");
let rightDie = document.querySelector("#right-die");

btnRoll.addEventListener("click", function(){
    let total = 0;
    let inputText = input.value;
    let dIndex = inputText.indexOf("d");
    // console.log(dIndex);
    let numberOfRolls = Number(inputText.substring(0, dIndex));
    if(dIndex == 0){
        numberOfRolls = 1;
    }
    // console.log(numberOfRolls);
    let sidesOfDice = Number(inputText.substring(dIndex+1));
    // console.log(sidesOfDice);
    result.innerHTML = "";
    let currentTime = new Date();
    let timeNow = currentTime.toLocaleString('en-GB', { timeZone: 'UTC' });
    // console.log(currentTime.toLocaleString('en-GB', { timeZone: 'UTC' }));
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
        average.innerHTML = "&nbsp" + Math.round(numberOfRolls*sidesOfDice*0.6);
        maximum.innerHTML = "&nbsp" + numberOfRolls*sidesOfDice;
        rollHistory.innerHTML += "<div class='d-flex justify-content-between mb-1'><h3 class='roll-history-small'>" + "[" + numberOfRolls + "d" + sidesOfDice + "] = " + total + "&nbsp</h3>" + "<h3 class='roll-history-small'>" + timeNow +"</h3></div>" ;
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
};

btnRoll.addEventListener("click", function(e){
    e.preventDefault;
    leftDie.classList.remove("dice-rotate-clockwise");
    rightDie.classList.remove("dice-rotate-counterclockwise");
    void leftDie.offsetWidth;
    leftDie.classList.add("dice-rotate-clockwise");
    rightDie.classList.add("dice-rotate-counterclockwise");
}, false);

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      btnRoll.click();
    }
});