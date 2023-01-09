console.log('running the home.js file');

// console.log('session storage: ', sessionStorage.getItem("business_id"));

var glData = null;
setInterval(waitAndshow, 60000);

function resetTimer() {
    minutes = 0;
    document.getElementById("timeAgoId").innerHTML =
        minutes + " min ago";
}

function runLoader() {
    document.body.style.opacity = 0.4;
    document.getElementById("loader").innerHTML = `<img id="loaderImgBlack" id="loaderimg" src="img/loaderImgBlack.gif" alt="" />`;

    // const node = document.createElement("li");
    // const textnode = document.createTextNode("Water");
    // node.appendChild(textnode);
    // document.getElementById("myList").appendChild(node);

    document.body.style.pointerEvents = "none";
}

$(document).ready(function () {

    console.log('running check!!', sessionStorage.getItem('value'));

    if (sessionStorage.getItem('value') == none) { 
        runIN('none', 'none');
        fetchDeviceList('none', 'none');
    }
    else {
        runIN('any', sessionStorage.getItem('value'));
        fetchDeviceList('any', sessionStorage.getItem('value'));
    }

    document.getElementById('cardIn').addEventListener("click", function () {
        window.location.href = document.getElementById('fetchHost').innerHTML + "/alarmPanelList";
    });

    document.getElementById('cardInArmDisarm').addEventListener("click", function () {
        window.location.href = document.getElementById('fetchHost').innerHTML + "/armDisarmList";
    });

    document.getElementById('searchInput').addEventListener('change', function () {
        sessionStorage.setItem('filter_type', 'any');
        sessionStorage.setItem('value', document.getElementById('searchInput').value);
        runLoader();
        runIN('any', document.getElementById('searchInput').value);
        fetchDeviceList('any', document.getElementById('searchInput').value);
        if (document.getElementById('searchInput').value == '') {
            console.log('input value printing');
        }
        resetTimer();
    });

    document.getElementById('all').addEventListener("click", function () {  
        
        sessionStorage.setItem('filter_type', 'none');
        sessionStorage.setItem('value', 'none');
        runLoader();
        runIN('none', 'none');
        fetchDeviceList('none', 'none');
    });
    document.getElementById('north').addEventListener("click", function () {
        sessionStorage.setItem('filter_type', 'zone');
        sessionStorage.setItem('value', 'north');
        runLoader();
        runIN('zone', 'north');
        fetchDeviceList('zone', 'north');
    });
    document.getElementById('east').addEventListener("click", function () {
        sessionStorage.setItem('filter_type', 'zone');
        sessionStorage.setItem('value', 'east');
        runLoader();
        runIN('zone', 'east');
        fetchDeviceList('zone', 'east');
    });
    document.getElementById('west').addEventListener("click", function () {
        sessionStorage.setItem('filter_type', 'zone');
        sessionStorage.setItem('value', 'west');
        runLoader();
        runIN('zone', 'west');
        fetchDeviceList('zone', 'west');
    });
    document.getElementById('south').addEventListener("click", function () {
        sessionStorage.setItem('filter_type', 'zone');
        sessionStorage.setItem('value', 'south');
        runLoader();
        runIN('zone', 'south');
        fetchDeviceList('zone', 'south');
    });
    document.getElementById('central').addEventListener("click", function () {
        sessionStorage.setItem('filter_type', 'zone');
        sessionStorage.setItem('value', 'central');
        runLoader();
        runIN('zone', 'central');
        fetchDeviceList('zone', 'central');
    });

    // http://54.197.121.111:8001/iot/1.6/public/getSiteHealthStatus?business_id=193
    console.log('printing data to check document ready function');

    function fetchDeviceList(filter_type, value) {

        fetch(document.getElementById('fetchHost').innerHTML + "/getDeviceList", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'typeValue': 'gl',
                'statusValue': 'offline',
                'filter_type': filter_type,
                
                'value': value
            }),
        }).then(res => {
            return res.json();
        })
            .then(data => {

                sessionStorage.setItem("glOfflineList", JSON.stringify(data.data));
                console.log('device List data gl: ', data);

                let glListString = ``;
                let len = (data.data.length > 4) ? 4 : data.data.length;
                for (let i = 0; i < len; i++) {
                    glListString += `<li><div class="d-flex w-100 align-items-start flex-nowrap gap-1"><div class="NotificationDate"><i class="fa-solid fa-location-dot"></i></div><div class="listData"><h5>${data.data[i].location_name}</h5><p>${data.data[i].address.slice(0, 1).toUpperCase() + data.data[i].address.slice(1).toLowerCase()}</p></div></div></li>`;
                }

                glListString += `<li class="text-center pb-0 viewAll"><a onclick="hitDeviceListPage('glOffline', 'Network Health (Offline)')" class="text-dark">All</a></li>`;

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
                'statusValue': 'offline',
                'filter_type': filter_type,
                'value': value
            }),
        }).then(res => {
            return res.json();
        })
            .then(data => {
                sessionStorage.setItem("nvrOfflineList", JSON.stringify(data.data));
                console.log('device List data nvr: ', data.data);

                let nvrListString = ``;
                let len = (data.data.length > 4) ? 4 : data.data.length;
                for (let i = 0; i < len; i++) {
                    nvrListString += `<li><div class="d-flex w-100 align-items-start flex-nowrap gap-1"><div class="NotificationDate"><i class="fa-solid fa-location-dot"></i></div><div class="listData"><h5>${data.data[i].location_name}</h5><p>${data.data[i].address.slice(0, 1).toUpperCase() + data.data[i].address.slice(1).toLowerCase()}</p></div></div></li>`;
                }

                nvrListString += `<li class="text-center pb-0 viewAll"><a onclick="hitDeviceListPage('nvrOffline', 'NVR Health (Offline)')" class="text-dark">All</a></li>`;

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
                'statusValue': 'offline',
                'filter_type': filter_type,
                'value': value
            }),
        }).then(res => {
            return res.json();
        })
            .then(data => {
                sessionStorage.setItem("camerasOfflineList", JSON.stringify(data.data));
                console.log('device List data cameras: ', data);

                let camerasListString = ``;
                let len = (data.data.length > 4) ? 4 : data.data.length;
                for (let i = 0; i < len; i++) {
                    camerasListString += `<li><div class="d-flex w-100 align-items-start flex-nowrap gap-1"><div class="NotificationDate"><i class="fa-solid fa-location-dot"></i></div><div class="listData"><h5>${data.data[i].location_name}</h5><p>${data.data[i].address.slice(0, 1).toUpperCase() + data.data[i].address.slice(1).toLowerCase()}</p></div></div></li>`;
                }

                camerasListString += `<li class="text-center pb-0 viewAll"><a onclick="hitDeviceListPage('camerasOffline', 'Camera Health (Offline)')" class="text-dark">All</a></li>`;

                document.getElementById('camerasList').innerHTML = camerasListString;
            })
            .catch(error => console.log('ERROR: ', error));




        fetch(document.getElementById('fetchHost').innerHTML + "/getDeviceList", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'typeValue': 'nvr',
                'statusValue': 'footage_noncompliance',
                'filter_type': filter_type,
                'value': value
            }),
        }).then(res => {
            return res.json();
        })
            .then(data => {
                sessionStorage.setItem("footageNonComplianceList", JSON.stringify(data.data));
                console.log('device List data cameras: ', data);

                let complianceListString = ``;
                let len = (data.data.length > 4) ? 4 : data.data.length;
                for (let i = 0; i < len; i++) {
                    complianceListString += `<li><div class="d-flex w-100 align-items-start flex-nowrap gap-1"><div class="NotificationDate"><i class="fa-solid fa-location-dot"></i></div><div class="listData"><h5>${data.data[i].location_name}</h5><p>${data.data[i].address.slice(0, 1).toUpperCase() + data.data[i].address.slice(1).toLowerCase()}</p></div></div></li>`;
                }

                complianceListString += `<li class="text-center pb-0 viewAll"><a onclick="hitDeviceListPage('footageNonCompliance', 'Non-Compliance Health')" class="text-dark">All</a></li>`;

                document.getElementById('nonCompList').innerHTML = complianceListString;
            })
            .catch(error => console.log('ERROR: ', error));
    }

});



