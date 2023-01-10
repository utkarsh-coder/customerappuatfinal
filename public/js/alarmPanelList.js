
let inOfflineListString = ``;
let inOnlineListString = ``;
let alarmapicount = 0;

function concatOnlineOfflineIn() {
    document.getElementById('allIn').innerHTML = inOfflineListString + inOnlineListString;
}

function fetchAlarmPanel(type, filter_type, value, complianceCheck) {
    fetch(document.getElementById('fetchHost').innerHTML + "/getDeviceList", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'typeValue': type,
            'statusValue': (localStorage.getItem('complianceCheck') == 0)?'offline':'footage_noncompliance',
            'filter_type': filter_type,
            'value': value
        }),
    }).then(res => {
        return res.json();
    })
        .then(data => {
            inOfflineListString = ``;
            alarmapicount++;
            // sessionStorage.setItem("camerasOffline", JSON.stringify(data.data));
            console.log('device List data in: ', data);

            for (let i = 0; i < data.data.length; i++) {
                inOfflineListString += `<li><div class="d-flex w-100 align-items-start flex-nowrap gap-1"><div class="listData"><h5>${data.data[i].location_name}</h5><div class="d-flex gap-2 align-items-start"><p>${data.data[i].address.slice(0, 1).toUpperCase() + data.data[i].address.slice(1).toLowerCase()} </p><span class="badge bg-danger">Offline</span></div></div></div></li>`;
            }

            if (alarmapicount == 2) {
                alarmapicount = 0;
                concatOnlineOfflineIn();
            }

            $(document).ready(function () {
                document.getElementById('offlineIn').innerHTML = inOfflineListString;
            })
        })
        .catch(error => console.log('ERROR: ', error));


    fetch(document.getElementById('fetchHost').innerHTML + "/getDeviceList", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'typeValue': type,
            'statusValue': (localStorage.getItem('complianceCheck') == 0)?'online':'footage_compliance',
            'filter_type': filter_type,
            'value': value
        }),
    }).then(res => {
        return res.json();
    })
        .then(data => {
            inOnlineListString = ``;
            alarmapicount++;

            // sessionStorage.setItem("camerasOffline", JSON.stringify(data.data));
            console.log('device List data in: ', data);

            for (let i = 0; i < data.data.length; i++) {
                inOnlineListString += `<li><div class="d-flex w-100 align-items-start flex-nowrap gap-1"><div class="listData"><h5>${data.data[i].location_name}</h5><div class="d-flex gap-2 align-items-start"><p>${data.data[i].address.slice(0, 1).toUpperCase() + data.data[i].address.slice(1).toLowerCase()}</p><span class="badge bg-primary">Online</span></div></div></div></li>`;
            }

            if (alarmapicount == 2) {
                alarmapicount = 0;
                concatOnlineOfflineIn();
            }

            $(document).ready(function () {
                document.getElementById('onlineIn').innerHTML = inOnlineListString;
            })
        })
        .catch(error => console.log('ERROR: ', error));
}