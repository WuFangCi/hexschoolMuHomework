
let url =
"https://api.kcg.gov.tw/api/service/get/9c8e1450-e833-499c-8320-29b36b7ace5c";
let district = ["鹽埕區","鼓山區","左營區","楠梓區","三民區","新興區","前金區","苓雅區","前鎮區","旗津區","小港區","鳳山區","林園區","大寮區","大樹區","大社區","仁武區","鳥松區","岡山區","橋頭區","燕巢區","田寮區","阿蓮區","路竹區","湖內區","茄萣區","永安區","彌陀區","梓官區","旗山區","美濃區","六龜區","甲仙區","杉林區","內門區","茂林區","桃源區","那瑪夏區"];
const getSelectDistrict= document.getElementById('selectDistrict');
district.forEach((element,index) => {
    getSelectDistrict.innerHTML +=`<option value="${element}">${element}</option>`
});
const getRenderData= document.querySelector('.renderData');
getSelectDistrict.addEventListener('change',showDataInfo);
let dataView =[];

function getRemoteData (){
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
            // console.log(response);
            return response.json();
        })
        .then((result) => {
            // console.log(result);
            // comparison(result.data.XML_Head.Infos.Info);
            bulidData(result);
            console.log(result.data.XML_Head.Infos.Info);
        })
        .catch((error) => {
            console.log("錯誤代碼為" + error);
        });
}
getRemoteData();

function bulidData(remoteData) {
    remoteData.data.XML_Head.Infos.Info.forEach((item,index)=> {
        // console.log(item);
        dataView.push(item);
    })
}
// console.log(dataView);
// function showDataInfo(e){
//     console.log(e.target.value);
// }
function showDataInfo(e) {
    console.log(e.target.value);
    let district = e.target.value;
    dataView.forEach((item,index)=>{
        if(item.Add.indexOf(district)!==-1){
            renderDataView(item,district);
            // console.log(item);
        }
    })
}

function renderDataView(view,district){
    let template =` <li>
    <div class="wrapLocation">
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
  </li>`
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
