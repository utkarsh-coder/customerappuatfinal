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

let typeValues = ["nvr", "in", "gl"];
let statusValues = ["online", "offline"];

setInterval(waitAndshow, 60000);

// document.getElementById('fetchHost').innerHTML+"/customerapp/public/getData"
fetch(document.getElementById("fetchHost").innerHTML + "/getLocationData")
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        // console.log('location data: ', data);
        checkCount++;
        locationList = locationList.concat(data.data);
        typeValues.forEach(function (typeValue) {
            statusValues.forEach(function (statusValue) {
                console.log(
                    "initials: ",
                    typeValue,
                    typeValue.length,
                    statusValue,
                    statusValue.length
                );
                fetch(
                    document.getElementById("fetchHost").innerHTML +
                    "/getDeviceList",
                    {
                        method: "POST", // or 'PUT'
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            typeValue: typeValue,
                            statusValue: statusValue,
                        }),
                    }
                )
                    .then((res) => {
                        return res.json();
                    })
                    .then((dataDevices) => {
                        // console.log('device data:'+ typeValue+""+ statusValue);
                        // console.log('device list:  ', dataDevices.data);
                        checkCount++;
                        eval(
                            typeValue +
                            "List=" +
                            typeValue +
                            "List.concat(dataDevices.data)"
                        );
                        // console.log('nvrList:  ', nvrList);
                        // console.log('count' + typeValue + "  " + statusValue, eval(typeValue + 'List.length'));
                        // console.log('print it: ', inList);
                        // if(typeValue == 'in'){
                        //     console.log(inList);
                        // }
                        // console.log('count original:  ', dataDevices.data.length);
                        if (checkCount == 7) {
                            runProcess();
                        }
                    })
                    .catch((error) => console.log("ERROR", error));
            });
        });
        // data.data.forEach(runLocationLoop);
    })
    .catch((error) => console.log("ERROR", error));

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
        let checkForTotal = 0;

        for (let c = 0; c < inList.length; c++) {
            if (inList[c].location_id == locationList[a].location_id) {
                checkForTotal++;
                // console.log(inList[c].name + "      " + inList[c].status + inList[c].mode);
                if (name == null) {
                    name = locationList[a].location_name;
                }
                if (inList[c].status.trim() == "offline") {
                    // totalOffline++;
                    totalOfflineDevices++;
                    console.log("in offline: ", name);
                    if (siteStatus == null) {
                        siteStatus = "offline";
                    }
                } else if (inList[c].status.trim() == "online") {
                    // checkForOnline = 1;
                    totalOnlineDevices++;
                    console.log("in online: ", name);
                    if (siteStatus == null) {
                        siteStatus = "online";
                        if (inList[c].mode == 1) {
                            siteMode = "arm";
                            totalArmed++;
                        } else {
                            siteMode = "disarm";
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
                checkForTotal++;
                if (name == null) {
                    name = locationList[a].location_name;
                }

                if (nvrList[b].status.trim() == "offline") {
                    // totalOffline++;
                    totalOfflineDevices++;
                    console.log("nvr offline: ", name);
                    if (siteStatus == null) {
                        siteStatus = "offline";
                    }
                } else if (nvrList[b].status.trim() == "online") {
                    // checkForOnline = 1;
                    totalOnlineDevices++;
                    console.log("nvr online: ", name);
                    if (siteStatus == null) {
                        siteStatus = "online";
                    }
                } else {
                    console.log("nvr error part: ", name);
                }
            }
        }

        for (let d = 0; d < glList.length; d++) {
            if (glList[d].location_id == locationList[a].location_id) {
                checkForTotal++;
                if (name == null) {
                    name = locationList[a].location_name;
                }
                if (glList[d].status.trim() == "offline") {
                    // totalOffline++;
                    totalOfflineDevices++;
                    console.log("gl offline: ", name);
                    if (siteStatus == null) {
                        siteStatus = "offline";
                    }
                } else if (glList[d].status.trim() == "online") {
                    // checkForOnline = 1;
                    totalOnlineDevices++;
                    console.log("gl online: ", name);
                    if (siteStatus == null) {
                        siteStatus = "online";
                    }
                }
            }
        }

        // for (let e = 0; e < modbusList.length; e++) {
        //     if (modbusList[e].location_id == locationList[a].location_id) {
        //         if (name == null) {
        //             name = locationList[a].location_name;
        //         }
        //         if (modbusList[e].status == "offline") {
        //             checkForOffline++;
        //             // totalOffline++;
        //             totalOfflineDevices++;
        //             if (siteStatus == null) {
        //                 siteStatus = 'offline';
        //             }
        //         }
        //         else if (modbusList[e].status == "online") {
        //             // checkForOnline = 1;
        //             totalOnlineDevices++;
        //             if (siteStatus == null) {
        //                 siteStatus = 'online';
        //             }
        //         }
        //     }
        // }

        if (name != null) {
            const jsonOb = {
                name: name,
                address: locationList[a].address,
                online: totalOnlineDevices,
                offline: totalOfflineDevices,
                status: siteStatus,
                mode: siteMode,
            };
            // console.log('checking the site location: ', jsonOb.name+"    "+jsonOb.online+"    "+jsonOb.offline);
            siteArray.push(jsonOb);
            // console.log(jsonOb);
            if (totalOfflineDevices == checkForTotal) {
                totalOffline++;
            }
        }
    }

    // console.log('sitearray:  ',siteArray);

    document.getElementById("siteoff").innerHTML = totalOffline;
    document.getElementById("sitearmed").innerHTML = totalArmed;
    document.getElementById("sitedisarmed").innerHTML = totalDisarmed;

    console.log("site Array length: ", siteArray.length);

    siteArray = siteArray.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
    });

    for (let i = 0; i < siteArray.length; i++) {
        let tempVal = null;
        let tempClass = null;
        // console.log(siteArray[i].name+"        "+siteArray[i].status+"         "+siteArray[i].mode);
        if (siteArray[i].mode != null) {
            tempClass = siteArray[i].mode;
            tempVal = siteArray[i].mode == "arm" ? "ARM" : "DISARM";
        } else {
            // tempVal = siteArray[i].status;
            tempClass = "offline";
            tempVal = "OFFLINE";
        }

        // $('#loaderimg').remove();

        // document.getElementById('siteblockcontainer').innerHTML += '<div class="cardbck siteblock"><div style="display:inline-block; width: 60%;"><h4>' + siteArray[i].name + '</h4><p>This is the address of the site</p></div><strong>' + tempVal + '</strong><div><div class="colstatus cardbck"><strong id="networkoffline" class="num stronghealth">' + siteArray[i].offline + '</strong><p>Offline</p></div><div class="colstatus cardbck"><strong id="networkup" class="num stronghealth">' + siteArray[i].online + '</strong><p>Online</p></div></div></div>';

        // console.log(tempVal);
        document.getElementById(
            "siteblockcontainer"
        ).innerHTML += `<div class="container my-3"><div class="row"><div class="col-12"><div class="card siteHealthCard"><div class="card-body"><div class="cardTitle d-flex justify-content-between align-items-start flex-wrap"><div class="cardTitle-content"><h3>${siteArray[i].name}</h3></div><div class="cardTitle-icon"><span class="${tempClass}">${tempVal}</span></div><span class="mt-3 clamp-two">${siteArray[i].address}</span></div></div><div class="grid-row grid-row-col-2 siteHealthCard-content"><div class="d-flex flex-column align-items-center siteHealthCard-content-details"><imgsrc="{{asset('img/camera-switch.svg')}}"alt=""/><h6>Offline</h6><span>${siteArray[i].offline}</span></div><divclass="d-flex flex-column align-items-center siteHealthCard-content-details"><imgsrc="{{asset('img/network-switch.svg')}}"alt=""/><h6>Online</h6><span>${siteArray[i].online}</span></div><!-- <divclass="d-flex flex-column align-items-center siteHealthCard-content-details"><imgsrc="{{asset('img/video-switch.svg')}}"alt=""/><h6>Hello</h6><span>Error</span></div> --></div></div></div></div></div>`;
    }
    document.body.style.opacity = 1;
    // document.getElementById('loader').style.opacity = 1;
    document.getElementById("loaderImgBlack").remove();
    document.body.style.pointerEvents = "auto";
}
