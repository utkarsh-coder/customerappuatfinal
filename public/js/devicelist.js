console.log('entered device list js file', document.getElementById('type').innerHTML);

var offlineDevices = JSON.parse(sessionStorage.getItem(document.getElementById('type').innerHTML+'Offline'));
let offlineListString = ``;
console.log(offlineDevices);
console.log('length: ', offlineDevices.length);
for(let i=0; i < offlineDevices.length;i++){
    offlineListString += `<li><div class="d-flex w-100 align-items-start flex-nowrap gap-1"><div class="NotificationDate"><span>16</span><p>mins</p></div><div class="listData"><h5>${offlineDevices[i].location_name}</h5><p>${offlineDevices[i].address}</p></div></div></li>`;
}

document.getElementById('deviceListUl').innerHTML = offlineListString;