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

    // runIN('none', 'none');
    // fetchDeviceList('none', 'none');
    localStorage.setItem('complianceCheck', 0);

    console.log('running check!!', localStorage.getItem('value'));

    if (localStorage.getItem('value') == null) {
        runIN('none', 'none');
        fetchDeviceList('none', 'none');
        document.getElementById('all').checked = true;
    }
    else if (localStorage.getItem('filter_type') == 'zone') {
        runIN('zone', localStorage.getItem('value'));
        fetchDeviceList('zone', localStorage.getItem('value'));
        document.getElementById(localStorage.getItem('value')).checked = true;
    }
    else if (localStorage.getItem('filter_type') == 'none') {
        runIN('none', 'none');
        fetchDeviceList('none', 'none');
        document.getElementById('all').checked = true;
    }
    else {
        document.getElementById('searchInput').value = localStorage.getItem('value');
        runIN('any', localStorage.getItem('value'));
        fetchDeviceList('any', localStorage.getItem('value'));
        let radio = document.querySelector('input[type=radio][name=zone]:checked');
        radio.checked = false;
    }

    document.getElementById('cardIn').addEventListener("click", function () {
        sessionStorage.setItem('deviceTypeHeadingText', 'Alarm Panel');
        localStorage.setItem('type', 'in');
        window.location.href = document.getElementById('fetchHost').innerHTML + "/alarmPanelList";
    });

    document.getElementById('cardInArmDisarm').addEventListener("click", function () {
        window.location.href = document.getElementById('fetchHost').innerHTML + "/armDisarmList";
    });

    document.getElementById('cardGl').addEventListener("click", function () {
        sessionStorage.setItem('deviceTypeHeadingText', 'GL Router');
        localStorage.setItem('type', 'gl');
        window.location.href = document.getElementById('fetchHost').innerHTML + "/alarmPanelList";
    });

    document.getElementById('cardNvr').addEventListener("click", function () {
        sessionStorage.setItem('deviceTypeHeadingText', 'NVR');
        localStorage.setItem('type', 'nvr');
        window.location.href = document.getElementById('fetchHost').innerHTML + "/alarmPanelList";
    });

    document.getElementById('cardComp').addEventListener("click", function () {
        sessionStorage.setItem('deviceTypeHeadingText', 'Compliance');
        localStorage.setItem('type', 'nvr');
        localStorage.setItem('complianceCheck', 1);
        window.location.href = document.getElementById('fetchHost').innerHTML + "/alarmPanelList";
    });

    document.getElementById('cardCamera').addEventListener("click", function () {
        sessionStorage.setItem('deviceTypeHeadingText', 'Cameras');
        localStorage.setItem('type', 'cameras');
        window.location.href = document.getElementById('fetchHost').innerHTML + "/alarmPanelList";
    });

    document.getElementById('searchInput').addEventListener('change', function () {
        localStorage.setItem('filter_type', 'any');
        localStorage.setItem('value', document.getElementById('searchInput').value);
        runLoader();
        runIN('any', document.getElementById('searchInput').value);
        fetchDeviceList('any', document.getElementById('searchInput').value);
        if (document.getElementById('searchInput').value == '') {
            console.log('input value printing');
        }
        let radio = document.querySelector('input[type=radio][name=zone]:checked');
        radio.checked = false;
        resetTimer();
    });

    document.getElementById('all').addEventListener("click", function () {

        document.getElementById('searchInput').value = '';
        localStorage.setItem('filter_type', 'none');
        localStorage.setItem('value', 'none');
        runLoader();
        runIN('none', 'none');
        fetchDeviceList('none', 'none');
    });
    document.getElementById('north').addEventListener("click", function () {

        document.getElementById('searchInput').value = '';
        localStorage.setItem('filter_type', 'zone');
        localStorage.setItem('value', 'north');
        runLoader();
        runIN('zone', 'north');
        fetchDeviceList('zone', 'north');
    });
    document.getElementById('east').addEventListener("click", function () {

        document.getElementById('searchInput').value = '';
        localStorage.setItem('filter_type', 'zone');
        localStorage.setItem('value', 'east');
        runLoader();
        runIN('zone', 'east');
        fetchDeviceList('zone', 'east');
    });
    document.getElementById('west').addEventListener("click", function () {

        document.getElementById('searchInput').value = '';
        localStorage.setItem('filter_type', 'zone');
        localStorage.setItem('value', 'west');
        runLoader();
        runIN('zone', 'west');
        fetchDeviceList('zone', 'west');
    });
    document.getElementById('south').addEventListener("click", function () {

        document.getElementById('searchInput').value = '';
        localStorage.setItem('filter_type', 'zone');
        localStorage.setItem('value', 'south');
        runLoader();
        runIN('zone', 'south');
        fetchDeviceList('zone', 'south');
    });
    document.getElementById('central').addEventListener("click", function () {

        document.getElementById('searchInput').value = '';
        localStorage.setItem('filter_type', 'zone');
        localStorage.setItem('value', 'central');
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

                if (data.data.length > 0) {
                    glListString += `<li class="text-center pb-0 viewAll"><a onclick="hitDeviceListPage('glOffline', 'Network Health (Offline)')" class="text-dark">All</a></li>`;
                }
                else {
                    glListString += `<li>No Offline Device</li>`;
                }

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

                if (data.data.length > 0) {
                    nvrListString += `<li class="text-center pb-0 viewAll"><a onclick="hitDeviceListPage('nvrOffline', 'NVR Health (Offline)')" class="text-dark">All</a></li>`;
                }
                else {
                    nvrListString += `<li>No Offline Device</li>`;
                }
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


                if (data.data.length > 0) {
                    camerasListString += `<li class="text-center pb-0 viewAll"><a onclick="hitDeviceListPage('camerasOffline', 'Camera Health (Offline)')" class="text-dark">All</a></li>`;
                }
                else {
                    camerasListString += `<li>No Offline Device</li>`;
                }

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

                let NonComplianceListString = ``;
                let len = (data.data.length > 4) ? 4 : data.data.length;
                for (let i = 0; i < len; i++) {
                    NonComplianceListString += `<li><div class="d-flex w-100 align-items-start flex-nowrap gap-1"><div class="NotificationDate"><i class="fa-solid fa-location-dot"></i></div><div class="listData"><h5>${data.data[i].location_name}</h5><p>${data.data[i].address.slice(0, 1).toUpperCase() + data.data[i].address.slice(1).toLowerCase()}</p></div></div></li>`;
                }


                if (data.data.length > 0) {
                    NonComplianceListString += `<li class="text-center pb-0 viewAll"><a onclick="hitDeviceListPage('footageNonCompliance', 'Non-Compliance Health')" class="text-dark">All</a></li>`;
                }
                else {
                    NonComplianceListString += `<li>No Offline Device</li>`;
                }

                document.getElementById('nonCompList').innerHTML = NonComplianceListString;
            })
            .catch(error => console.log('ERROR: ', error));
    }

});



