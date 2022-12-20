console.log('running the home.js file');

// console.log('session storage: ', sessionStorage.getItem("business_id"));

var glData = null;
setInterval(waitAndshow, 60000);

$(document).ready(function () {

    // http://54.197.121.111:8001/iot/1.6/public/getSiteHealthStatus?business_id=193
    console.log('printing data to check document ready function');


    fetch(document.getElementById('fetchHost').innerHTML + "/getDeviceList", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'typeValue': 'gl',
            'statusValue': 'offline'
        }),
    }).then(res => {
        return res.json();
    })
        .then(data => {
            
            sessionStorage.setItem("glOffline", JSON.stringify(data.data));
            console.log('device List data gl: ', data);

            let glListString = ``;
            for (let i = 0; i < 4; i++) {
                glListString += `<li><div class="d-flex w-100 align-items-start flex-nowrap gap-1"><div class="NotificationDate"><span>16</span><p>mins</p></div><div class="listData"><h5>${data.data[i].location_name}</h5><p>${data.data[i].address}</p></div></div></li>`;
            }

            glListString += `<li class="text-center pb-0 viewAll"><a onclick="hitDeviceListPage('gl')" class="text-dark">All</a></li>`;

            document.getElementById('glList').innerHTML = glListString;


            // // document.getElementById('loaderImgBlack').remove();
            // document.body.style.opacity = 1;
            // // document.getElementById('loader').style.opacity = 1;
            // document.getElementById('loaderImgBlack').remove();
            // document.body.style.pointerEvents = "auto";

            // console.log('getData:  ', data);
            // console.log(data.gl[0].offline);
            // document.getElementById('siteoff').innerHTML = data.in[0].in_offline_count;
            // document.getElementById('sitearmed').innerHTML = data.in[0].arm_count;
            // document.getElementById('sitedisarmed').innerHTML = data.in[0].disarm_count;

            // document.getElementById('networkeffected').innerHTML = data.effected[0].effect_count;
            // document.getElementById('networkoffline').innerHTML = data.gl[0].offline;
            // document.getElementById('networkup').innerHTML = data.gl[0].online;

            // document.getElementById('nvrtotal').innerHTML = data.nvr[0].offline_count + data.nvr[0].online_count;
            // document.getElementById('nvroff').innerHTML = data.nvr[0].offline_count;

            // // document.getElementById('footagetotal').innerHTML = data.nvr[0].footage_count;
            // // document.getElementById('footageoff').innerHTML = (data.nvr[0].camera_offline_count +  Number(data.nvr[0].camera_online_count))-data.nvr[0].footage_count;
            // document.getElementById('alarmpaneltotal').innerHTML = data.in[0].in_offline_count + data.in[0].in_online_count;
            // document.getElementById('alarmpaneloff').innerHTML = data.in[0].in_offline_count;
            // document.getElementById('cameratotal').innerHTML = Number(data.nvr[0].camera_online_count) + data.nvr[0].camera_offline_count;
            // document.getElementById('cameraoff').innerHTML = data.nvr[0].camera_offline_count;
        })
        .catch(error => console.log('ERROR: ', error));



    fetch(document.getElementById('fetchHost').innerHTML + "/getDeviceList", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'typeValue': 'nvr',
            'statusValue': 'offline'
        }),
    }).then(res => {
        return res.json();
    })
        .then(data => {
            sessionStorage.setItem("nvrOffline", JSON.stringify(data.data));
            console.log('device List data nvr: ', data.data);

            let nvrListString = ``;
            for (let i = 0; i < 4; i++) {
                nvrListString += `<li><div class="d-flex w-100 align-items-start flex-nowrap gap-1"><div class="NotificationDate"><span>16</span><p>mins</p></div><div class="listData"><h5>${data.data[i].location_name}</h5><p>${data.data[i].address}</p></div></div></li>`;
            }

            nvrListString += `<li class="text-center pb-0 viewAll"><a onclick="hitDeviceListPage('nvr')" class="text-dark">All</a></li>`;

            document.getElementById('nvrList').innerHTML = nvrListString;
        })
        .catch(error => console.log('ERROR: ', error));


    fetch(document.getElementById('fetchHost').innerHTML + "/getDeviceList", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'typeValue': 'cameras',
            'statusValue': 'offline'
        }),
    }).then(res => {
        return res.json();
    })
        .then(data1 => {
            sessionStorage.setItem("camerasOffline", JSON.stringify(data1.data));
            console.log('device List data cameras: ', data1);

            let camerasListString = ``;
            for (let i = 0; i < 4; i++) {
                camerasListString += `<li><div class="d-flex w-100 align-items-start flex-nowrap gap-1"><div class="NotificationDate"><span>16</span><p>mins</p></div><div class="listData"><h5>${data1.data[i].location_name}</h5><p>${data1.data[i].address}</p></div></div></li>`;
            }

            camerasListString += `<li class="text-center pb-0 viewAll"><a onclick="hitDeviceListPage('cameras')" class="text-dark">All</a></li>`;

            document.getElementById('camerasList').innerHTML = camerasListString;
        })
        .catch(error => console.log('ERROR: ', error));
});