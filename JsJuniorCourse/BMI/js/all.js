let getHeight = document.getElementById('enter_height');
let getWeight = document.getElementById('enter_weight')
let getResult = document.querySelector('.result');
let getWrapReset = document.querySelector('.wrap_reset');
let getReset = document.querySelector('.reset');
let getBMIText = getWrapReset.children[1];
let getResetImgDiv = getReset.children[2];
let colorName =["_lightblue","_lightgreen","_orange1","_orange2","_red"];
let calculateColor  ="";
let getPromptText = document.querySelector('.promptText');



getResult.addEventListener('click',lookResult);
getResetImgDiv.addEventListener('click',goBack);
function lookResult() {
    let promptStr = "您沒有輸入";
    if(getHeight.value===""){
        promptStr +="身高";
    }
    if (getWeight.value===""){
        promptStr +="體重";
    }
    if(promptStr!=="您沒有輸入"){
        getPromptText.classList.remove("vh");
        getPromptText.textContent = promptStr;
        return;
    }else{
        getPromptText.classList.add("vh");
    }
    if(getHeight.value <=0 ||getWeight.value<=0){
        getPromptText.classList.remove("vh");
        return;
    }else{
        getPromptText.classList.add("vh");
    }
    let BMIValue =calculateUserBMI(getHeight.value,getWeight.value);
    console.log(BMIValue);
    switch (true) {
        case (0<BMIValue &&BMIValue<18.5):
            getBMIText.textContent= "過輕";
            calculateColor = colorName[0];
            console.log("過輕");
            break;
        case (18.5<=BMIValue && BMIValue<24):
            getBMIText.textContent="標準";
            calculateColor = colorName[1];
            console.log("標準");
            break;
        case (24<=BMIValue && BMIValue<27):
            getBMIText.textContent="過重";
            calculateColor = colorName[2];
            console.log("過重");
            break;
        case(27<=BMIValue && BMIValue<30):
            getBMIText.textContent="輕度肥胖";
            calculateColor = colorName[3];
            console.log("輕度肥胖");
            break;
        case(30<=BMIValue && BMIValue<35):
            getBMIText.textContent="中度肥胖";
            calculateColor = colorName[3];
            console.log("中度肥胖");
            break;
        case(BMIValue>=35):
            getBMIText.textContent="重度肥胖";
            calculateColor = colorName[4];
            console.log("重度肥胖");
            break;
    }
    printResetOrResult(BMIValue);
}
function calculateUserBMI(height,weight){
    height=height/100;
    let result= Math.round((weight/Math.pow(height,2))*100)/100;
    return result;
}
function toggleResetResult(){
    getResult.classList.toggle('dn');
    getWrapReset.classList.toggle('dn');
    getWrapReset.classList.toggle('db');
}
function toggleColor(color){
    getWrapReset.classList.toggle("font_color"+color);
    getResetImgDiv.classList.toggle("background_color"+color);
    getReset.classList.toggle("border_color"+color);
}

function printResetOrResult(value){
    getReset.children[0].textContent = value;
    toggleResetResult();
    toggleColor(calculateColor);
}
function goBack(){
    printResetOrResult();
    calculateColor  ="";
}
