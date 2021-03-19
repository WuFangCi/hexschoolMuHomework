let url =
  "https://api.kcg.gov.tw/api/service/get/9c8e1450-e833-499c-8320-29b36b7ace5c";
let district = [
  "鹽埕區",
  "鼓山區",
  "左營區",
  "楠梓區",
  "三民區",
  "新興區",
  "前金區",
  "苓雅區",
  "前鎮區",
  "旗津區",
  "小港區",
  "鳳山區",
  "林園區",
  "大寮區",
  "大樹區",
  "大社區",
  "仁武區",
  "鳥松區",
  "岡山區",
  "橋頭區",
  "燕巢區",
  "田寮區",
  "阿蓮區",
  "路竹區",
  "湖內區",
  "茄萣區",
  "永安區",
  "彌陀區",
  "梓官區",
  "旗山區",
  "美濃區",
  "六龜區",
  "甲仙區",
  "杉林區",
  "內門區",
  "茂林區",
  "桃源區",
  "那瑪夏區",
];
const getSelectDistrict = document.getElementById("selectDistrict");
district.forEach((element, index) => {
  getSelectDistrict.innerHTML += `<option value="${element}">${element}</option>`;
});
const getRenderData = document.querySelector(".renderData");
const getWrapPageNum = document.querySelector('.wrapPageNum');

let dataView = [];
let dataTem = [];
let districtTem='';
let currentPageNum = 1;
let lastPageNum=0;





function getRemoteData(callback) {
  fetch(url, {
    method: "GET",
    mode: "cors",
    header: new Headers({
      "Content-Type": "text/json",
    }),
  })
    .then(function (response) {
      if (response.status !== 200) {
        throw new Error(response.status);
        console.log("網路有連線問題");
      }
      console.log(response);
      return response.json();
    })
    .then((result) => {
      // console.log(result);
      // comparison(result.data.XML_Head.Infos.Info);
      dataView = bulidData(result);
    })
    .catch((error) => {
      console.log("錯誤代碼為" + error);
    });
}
getRemoteData();

function bulidData(remoteData) {
  let array = [];
  remoteData.data.XML_Head.Infos.Info.forEach((item, index) => {
    // console.log(item);
    array.push(item);
  });
  return array;
}

getWrapPageNum.addEventListener('click',pageNumClick);
getSelectDistrict.addEventListener("change", showDataInfo);
function showDataInfo(e) {
  districtTem = e.target.value;
  if(districtTem==="請選擇行政區"){
      return;
  }
  
  dataTem=[];
  currentPageNum = 1;
  getWrapPageNum.innerHTML='';
  getRenderData.innerHTML='';
  buildDataTem(districtTem);

  lastPageNum = Math.floor(dataTem.length/10)+1;
  if(dataTem.length>10){
    for (let i = 0; i <10;i++) {
      renderDataView(dataTem[i],districtTem);
    }
    getWrapPageNum.innerHTML=`<button>&#060;prev</button>`;
    for(let i=0; i<lastPageNum; i++){
      getWrapPageNum.innerHTML+=`<button>${i+1}</button>`;
    }
    getWrapPageNum.innerHTML+=`<button>next&#062;</button>`;
  }else{
    for (let i = 0; i <dataTem.length; i++) {
      renderDataView(dataTem[i],districtTem);
    }
  }

  console.log("選擇行政區後的最後一頁"+lastPageNum);
}

function pageNumClick(e){
  if(e.target.nodeName!='BUTTON'){
    return;
  }
  if(e.target.textContent!="<prev"&&e.target.textContent!="next>"){
    getRenderData.innerHTML = '';
    currentPageNum = e.target.textContent;
    console.log("last"+lastPageNum);
    console.log("curr"+currentPageNum);
    if(lastPageNum ==currentPageNum){
      for(let i = (currentPageNum-1)*10; i <dataTem.length;i++){
        renderDataView(dataTem[i],districtTem);
      }
    }else{
      for(let i = (currentPageNum-1)*10; i <((currentPageNum-1)*10+10);i++){
        renderDataView(dataTem[i],districtTem);
      }
    }
  }
  if(e.target.textContent=="<prev"&&currentPageNum!=1){
    currentPageNum--;
    getRenderData.innerHTML = '';
    for(let i = (currentPageNum-1)*10; i <((currentPageNum-1)*10+10);i++){
      renderDataView(dataTem[i],districtTem);
    }
  }

  if(e.target.textContent=="next>"&&(currentPageNum!=lastPageNum)){
    currentPageNum++;
    getRenderData.innerHTML = '';
    if(currentPageNum!=lastPageNum){
      for(let i = (currentPageNum-1)*10; i <((currentPageNum-1)*10+10);i++){
        renderDataView(dataTem[i],districtTem);
      }
    }
	if(currentPageNum==lastPageNum){
      for(let i = (currentPageNum-1)*10; i <dataTem.length;i++){
        renderDataView(dataTem[i],districtTem);
      }
	}
  }
}






// function render10Data(num){
//    num = (num-1)*10
//   for(let i = num; i <num+10;i++){
//     renderDataView(dataTem[i],districtTem);
//   }
// }


function buildDataTem(district) {
  console.log(district);
  getRenderData.previousElementSibling.textContent =district;
  dataView.forEach((item, index) => {
    if (item.Add.indexOf(district) != -1) {
      dataTem.push(item);
      // renderDataView(item, district);
    }
  });
  console.log(dataTem);
}
function renderDataView(view, district) {

  let template = ` <li>
    <div class="wrapLocation" style='background-image: url(${view.Picture1})'>
      <h4>${view.Name}</h4>
      <h5>${district}</h5>
    </div>
    <p class="businessHours">
      <img src="images/icons_clock.png" alt="clock" />
      ${view.Opentime}
    </p>
    <p class="viewAddress">
      <img src="images/icons_pin.png" alt="pin" />
      ${view.Add}
    </p>
    <div class="wrapPhoneVisit">
      <p class="viewPhone">
        <img src="images/icons_phone.png" alt="phone" />
        <a href="tel:+${view.Tel}"> ${view.Tel}</a>
      </p>
      <p class="viewVisit">
        <img src="images/icons_tag.png" alt="tag" />
        ${view.Ticketinfo}
      </p>
      <p class="viewVisitMore">
        一般票(適用於一般假日及國定假日09:30-18:00)成人票:250元兒童票:150元(2歲-140cm)優惠票:150元(憑本人身心障礙手冊，本人及陪同者1人可享優惠票)幸福票...
      </p>
    </div>
  </li>`;
  getRenderData.innerHTML += template;
}

// function comparison(dataArray) {
// for (let index = 0; index < dataArray.length; index++) {
//     // console.log(dataArray[index].Add);
//     if (dataArray[index].Add.indexOf("大樹區") !== -1) {
//     console.log(dataArray[index]);
//     }
//     }
// }
