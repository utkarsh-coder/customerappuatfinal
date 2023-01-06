
let inDisarmListString = ``;
let inArmListString = ``;

function fetchArmDisarm(filter_type, value) {
    console.log('function called');

    fetch(document.getElementById('fetchHost').innerHTML + "/getDeviceList", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'typeValue': 'in',
            'statusValue': 'disarm',
            'filter_type': filter_type,
            'value': value
        }),
    }).then(res => {
        console.log('response: ', res);
        return res.json();
    })
        .then(data => {
            // sessionStorage.setItem("camerasOffline", JSON.stringify(data.data));
            console.log('device List data in: ', data);

            for (let i = 0; i < data.data.length; i++) {
                inDisarmListString += `<li><div class="d-flex w-100 align-items-start flex-nowrap gap-1"><div class="listData"><h5>${data.data[i].location_name}</h5><div class="d-flex gap-2 align-items-start"><p>${data.data[i].address.slice(0, 1).toUpperCase() + data.data[i].address.slice(1).toLowerCase()} </p><span class="badge bg-primary" onclick="triggerState(7975, 'arm')">Arm</span></div></div></div></li>`;
            }

            $(document).ready(function () {
                document.getElementById('disarmIn').innerHTML = inDisarmListString;
            })
        })
        .catch(error => console.log('ERROR: ', error));


    fetch(document.getElementById('fetchHost').innerHTML + "/getDeviceList", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'typeValue': 'in',
            'statusValue': 'arm',
            'filter_type': filter_type,
            'value': value
        }),
    }).then(res => {
        return res.json();
    })
        .then(data => {
            // sessionStorage.setItem("camerasOffline", JSON.stringify(data.data));
            console.log('device List data in: ', data);

            for (let i = 0; i < data.data.length; i++) {
                inArmListString += `<li><div class="d-flex w-100 align-items-start flex-nowrap gap-1"><div class="listData"><h5>${data.data[i].location_name}</h5><div class="d-flex gap-2 align-items-start"><p>${data.data[i].address.slice(0, 1).toUpperCase() + data.data[i].address.slice(1).toLowerCase()}</p><span class="badge bg-danger" onclick="triggerState(7975, 'disarm')">Disarm</span></div></div></div></li>`;
            }

            $(document).ready(function () {
                document.getElementById('armIn').innerHTML = inArmListString;
            })
        })
        .catch(error => console.log('ERROR: ', error));
}