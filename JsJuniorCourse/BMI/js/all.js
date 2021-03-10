const getHeight = document.getElementById('enter_height');
const getWeight = document.getElementById('enter_weight')
const getResult = document.querySelector('.result');
const getWrapReset = document.querySelector('.wrap_reset');
const getReset = document.querySelector('.reset');
const getBMIText = getWrapReset.children[1];
const getResetImgDiv = getReset.children[2];
let colorName =["_lightblue","_lightgreen","_orange1","_orange2","_red"];
let calculateColor  ="";
const getPromptText = document.querySelector('.promptText');
const getContent = document.querySelector(".list");
const getDelBtn = document.getElementById('allDel');

getDelBtn.addEventListener('click',deleteLocal);
let recordAry = [];
function printLocalStorageBMI(){
    getContent.innerHTML ='';
    if(localStorage.getItem('item')!=null){
        recordAry=JSON.parse(localStorage.getItem('item'));  
        for (let i = 0; i <recordAry.length; i++){
            printTemplate(recordAry[i].weight,recordAry[i].height,recordAry[i].BMIText,recordAry[i].BMI,recordAry[i].color,recordAry[i].year,recordAry[i].month,recordAry[i].date);
        }
    }
    else{
        return;
    }
}
printLocalStorageBMI();

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
        getPromptText.textContent = "身高或體重格是錯誤";
        getPromptText.classList.remove("vh");
        return;
    }else{
        getPromptText.classList.add("vh");
    }
    let BMIValue =calculateUserBMI(getHeight.value,getWeight.value);
    let BMIText = "";
    let dateObj = new Date();
    console.log(BMIValue);
    switch (true) {
        case (0<BMIValue &&BMIValue<18.5):
            BMIText ="過輕";
            calculateColor = colorName[0];
            console.log("過輕");
            break;
        case (18.5<=BMIValue && BMIValue<24):
            BMIText = "標準";
            calculateColor = colorName[1];
            console.log("標準");
            break;
        case (24<=BMIValue && BMIValue<27):
            BMIText = "過重";
            calculateColor = colorName[2];
            console.log("過重");
            break;
        case(27<=BMIValue && BMIValue<30):
            BMIText = "輕度肥胖"
            calculateColor = colorName[3];
            console.log("輕度肥胖");
            break;
        case(30<=BMIValue && BMIValue<35):
            BMIText = "中度肥胖";
            calculateColor = colorName[3];
            console.log("中度肥胖");
            break;
        case(BMIValue>=35):
            BMIText = "重度肥胖";
            calculateColor = colorName[4];
            console.log("重度肥胖");
            break;
    }
    printResetOrResult(BMIValue,BMIText);
    let todayAry =[];
    todayAry = yearMonthDate(dateObj); //日期轉換成01-10-2020
    recordAry.push(buildBMIObj(todayAry[2],todayAry[1],todayAry[0],BMIValue,BMIText,getWeight.value,getHeight.value,todayAry[3],calculateColor));
    localStorage.setItem('item', JSON.stringify(recordAry));
    printLocalStorageBMI();

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
function yearMonthDate(dateObj){
    let thisMonth = (dateObj.getMonth()+1);
    thisMonth = thisMonth<10 ? ("0"+thisMonth):thisMonth;
    let thisYear = dateObj.getFullYear();
    let thisDate = dateObj.getDate();
    thisDate = thisDate<10 ? ("0"+thisDate):thisDate;
    let array = [thisDate, thisMonth, thisYear,dateObj.getTime()];
    return array;
}
function buildBMIObj(y,m,d,bmi,bmitext,w,h,time,c){
    let BMIObj = {
        year:y,
        month:m,
        date:d,
        BMI:bmi,
        BMIText:bmitext,
        weight:w,
        height:h,
        getTime:time,
        color:c
    }
    return BMIObj;
}
function printResetOrResult(value,text){
    getReset.children[0].textContent = value;
    getBMIText.textContent=text;
    toggleResetResult();
    toggleColor(calculateColor);
}
function printTemplate(weight,height,BMIText,BMI,color,thisYear,thisMonth,thisDate){
      let recorderTemplate = `
  <ul class="pl-1 pr-1 border_left_color${color}">
  <li>${BMIText}</li>
  <li><span>BMI</span> ${BMI}</li>
  <li><span>weight</span>${weight}kg</li>
  <li><span>height</span>${height}cm</li>    <li><span>${thisMonth}-${thisDate}-${thisYear}</span></li>
  </ul>
  `;
  getContent.innerHTML += recorderTemplate;
}
function goBack(){
    printResetOrResult();
    calculateColor  ="";
}
function deleteLocal(){
    if(localStorage.getItem('item')){
        recordAry = [];
        localStorage.removeItem('item');
    }
    else{
        return;
    }
printLocalStorageBMI();
}