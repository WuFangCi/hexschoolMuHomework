let getHeight = document.getElementById('enter_height');
let getWeight = document.getElementById('enter_weight')
let getResult = document.querySelector('.result');

getResult.addEventListener('click',calculate);
function calculate() {
    let heightValue = (getHeight.value/100);
    let weightValue = (getWeight.value);
    console.log(Math.round(weightValue/Math.pow(heightValue,2)*100)/100);
}
