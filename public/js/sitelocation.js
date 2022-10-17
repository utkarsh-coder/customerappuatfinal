let nvrList = [];
let inList = [];
let glList = [];
let modbusList = [];
let locationList = [];
let checkCount = 0;
let siteArray = [];
let totalOffline = 0;
let totalArmed = 0;
let totalDisarmed = 0;


let typeValues = ['nvr', 'in', 'gl', 'modbus'];
let statusValues = ['online', 'offline'];


fetch('http://54.197.121.111:8001/iot/1.6/public/getDeviceInfo?business_id=257&type=location&status=active').then(res => {
    return res.json();
})
    .then(data => {
        checkCount++;
        locationList = locationList.concat(data.data);
        typeValues.forEach(function (typeValue) {
            statusValues.forEach(function (statusValue) {
                fetch('http://54.197.121.111:8001/iot/1.6/public/getDeviceInfo?business_id=257&type=' + typeValue + '&status=' + statusValue).then(res => {
                    return res.json();
                })
                    .then(dataDevices => {
                        checkCount++;
                        eval(typeValue + 'List=' + typeValue + 'List.concat(dataDevices.data)');
                        // console.log('nvrList:  ', nvrList);
                        console.log('count' + typeValue + "  " + statusValue, eval(typeValue + 'List.length'));
                        // if(typeValue == 'in'){
                        //     console.log(inList);
                        // }
                        console.log('count original:  ', dataDevices.data.length);
                        if (checkCount == 9) {
                            runProcess();
                        }
                    })
                    .catch(error => console.log('ERROR', error));
            });
        });
        // data.data.forEach(runLocationLoop);
    })
    .catch(error => console.log('ERROR', error));

function runLocationLoop(site) {
    console.log(site.location_id);
}

function runProcess() {

    for (let a = 0; a < locationList.length; a++) {

        let name = null;
        let totalOnlineDevices = 0;
        let totalOfflineDevices = 0;
        let siteStatus = null;
        let siteMode = null;

        for (let c = 0; c < inList.length; c++) {
            if (inList[c].location_id == locationList[a].location_id) {
                console.log(inList[c].name+"      "+inList[c].status+inList[c].mode);
                if (name == null) {
                    name = locationList[a].location_name;
                }
                if (inList[c].status == "offline    ") {
                    totalOffline++;
                    totalOfflineDevices++;
                    if (siteStatus == null) {
                        siteStatus = 'offline';
                    }
                }
                else if (inList[c].status == "online    ") {
                    totalOnlineDevices++;
                    if (siteStatus == null) {
                        siteStatus = "online";
                        if (inList[c].mode == 1) {
                            siteMode = 'arm';
                            totalArmed++;
                        }
                        else{
                            siteMode = 'disarm';
                            totalDisarmed++;
                        }
                    }
                    // if(inList[c].mode == 1)
                }


                // if (inList[c].mode == 1) {
                //     totalArmed++;
                // }
                // else if (inList[c].mode == 0) {
                //     totalDisarmed++;
                // }


                // if (siteStatus == "online" && inList[c].mode == 1 && siteMode == 'N/A') {
                //     siteMode = 'arm';
                // }
                // else if (siteStatus == "online" && inList[c].mode == 0 && siteMode == 'N/A') {
                //     siteMode = 'disarm';
                // }
            }
        }

        for (let b = 0; b < nvrList.length; b++) {
            if (nvrList[b].location_id == locationList[a].location_id) {
                if (name == null) {
                    name = locationList[a].location_name;
                }

                if (nvrList[b].status == "offline") {
                    totalOffline++;
                    totalOfflineDevices++;
                    if (siteStatus == null) {
                        siteStatus = 'offline';
                    }
                }
                else if (nvrList[b].status == "online") {
                    totalOnlineDevices++;
                    if (siteStatus == null) {
                        siteStatus = 'online';
                    }
                }
            }
        }

        for (let d = 0; d < glList.length; d++) {
            if (glList[d].location_id == locationList[a].location_id) {
                if (name == null) {
                    name = locationList[a].location_name;
                }
                if (glList[d].status == "offline") {
                    totalOffline++;
                    totalOfflineDevices++;
                    if (siteStatus == null) {
                        siteStatus = 'offline';
                    }
                }
                else if (glList[d].status == "online") {
                    totalOnlineDevices++;
                    if (siteStatus == null) {
                        siteStatus = 'online';
                    }
                }
            }
        }

        for (let e = 0; e < modbusList.length; e++) {
            if (modbusList[e].location_id == locationList[a].location_id) {
                if (name == null) {
                    name = locationList[a].location_name;
                }
                if (modbusList[e].status == "offline") {
                    totalOffline++;
                    totalOfflineDevices++;
                    if (siteStatus == null) {
                        siteStatus = 'offline';
                    }
                }
                else if (modbusList[e].status == "online") {
                    totalOnlineDevices++; 
                    if (siteStatus == null) {
                        siteStatus = 'online';
                    }
                }
            }
        }

        if (name != null) {
            const jsonOb = {
                name: name,
                online: totalOnlineDevices,
                offline: totalOfflineDevices,
                status: siteStatus,
                mode: siteMode
            }
            siteArray.push(jsonOb);
            // console.log(jsonOb);
        }
    }

    // console.log('sitearray:  ',siteArray);

    for (let i = 0; i < siteArray.length; i++) {
        // console.log('do');
        let tempVal = null;
        // console.log(siteArray[i].name+"        "+siteArray[i].status+"         "+siteArray[i].mode);
        if (siteArray[i].mode != null) {
            tempVal = siteArray[i].mode;
        }
        else {
            tempVal = siteArray[i].status;
        }
        document.getElementById('siteblockcontainer').innerHTML += '<div class="cardbck siteblock"><div style="display:inline-block; width: 60%;"><h4>' + siteArray[i].name + '</h4><p>This is the address of the site</p></div><strong>' + tempVal + '</strong><div><div class="colstatus cardbck"><strong id="networkoffline" class="num stronghealth">' + siteArray[i].offline + '</strong><p>Offline</p></div><div class="colstatus cardbck"><strong id="networkup" class="num stronghealth">' + siteArray[i].online + '</strong><p>Online</p></div></div></div>';
        document.getElementById('siteoff').innerHTML = totalOffline;
        document.getElementById('sitearmed').innerHTML = totalArmed;
        document.getElementById('sitedisarmed').innerHTML = totalDisarmed;
    }
}
