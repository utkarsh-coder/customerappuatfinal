// import * as echarts from 'echarts';

// var express = require('express');
// var router = express.Router();

var ROOT_PATH = 'https://echarts.apache.org/examples';

var chartDom4 = document.getElementById('main4');
var myChart4 = echarts.init(chartDom4);
var option4;
let text4 = '';

// $("#main1").append("<div id='loading1' class='loading';></div");

// const weatherIcons = {
//   Sunny: ROOT_PATH + '/data/asset/img/weather/sunny_128.png',
//   Cloudy: ROOT_PATH + '/data/asset/img/weather/cloudy_128.png',
//   Showers: ROOT_PATH + '/data/asset/img/weather/showers_128.png'
// };

// 'http://54.197.121.111:8001/iot/1.6/public/getSiteHealthStatus?business_id=193'
console.log("url is:  ", document.getElementById('fetchHost').innerHTML + "/getChartData");
function runNvr() {
    // console.log(data);
    // document.body.style.opacity = 1;
    // document.getElementById('loaderImgBlack').remove();
    // document.body.style.pointerEvents = "auto";

    // if (data.data.modbus[0] != undefined) {
    //     sessionStorage.setItem('modbusOnlineCount', data.data.modbus[1].count);
    //     sessionStorage.setItem('modbusOfflineCount', data.data.modbus[0].count);
    // }
    // else {
    //     sessionStorage.setItem('modbusOnlineCount', 0);
    //     sessionStorage.setItem('modbusOfflineCount', 0);

    // document.getElementById('allonline').innerHTML = data.nvr[0].online_count + data.gl[0].online + data.in[0].in_online_count;
    // document.getElementById('alloffline').innerHTML = data.nvr[0].offline_count + data.gl[0].offline + data.in[0].in_offline_count;

    document.getElementById("nvronlinecount").innerHTML =
            "<span>Online</span> " + sessionStorage.getItem('nvrOnlineCount');
        document.getElementById("nvronlinecount").classList.add("br-right");
        document.getElementById("nvrofflinecount").innerHTML =
            "<span>Offline</span> " + sessionStorage.getItem('nvrOfflineCount');

    console.log("starting hello world!");

    if (sessionStorage.getItem('nvrOnlineCount') == 'null') {
        text3 = 'NVR not present at site';
    }

    let nvrOnlinePercent = Math.round((Number(sessionStorage.getItem('nvrOnlineCount')) / (Number(sessionStorage.getItem('nvrOnlineCount')) + Number(sessionStorage.getItem('nvrOfflineCount')))) * 100);
    let nvrOfflinePercent = Math.round((Number(sessionStorage.getItem('nvrOfflineCount')) / (Number(sessionStorage.getItem('nvrOnlineCount')) + Number(sessionStorage.getItem('nvrOfflineCount')))) * 100);

    option4 = {
        title: {
            text: text4,
            // text: 'NVR',
            // subtext: 'Real-time data',
            left: 'center'
        },
        legend: {
            top: '5%',
            left: 'center',
            data: ['offline: ' + nvrOfflinePercent + '%','online: ' + nvrOnlinePercent + '%']
        },
        color: [
            '#FF0000',
            '#0361a1',
        ],
        height: '100%',
        width: '100%',
        series: [
            {
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 0,
                    borderColor: '#fff',
                    borderWidth: 0
                },
                label: {
                    show: true,
                    position: 'center',
                    formatter: function (d) {
                        return d.name;
                    },
                    fontSize: 16,
                },
                emphasis: {
                    label: {
                        show: false,
                        fontSize: "18",
                        fontWeight: "regular"
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: nvrOfflinePercent, name: nvrOfflinePercent + '%'+ '\n Offline' },
                    { value: nvrOnlinePercent, name: nvrOnlinePercent + '%'+' \n Online' },
                ]
            }
        ],
        legend: [
            {
                show: false,
                bottom: 10,
                orient: "vertical",
                selectorLabel: {
                    show: false
                }
            }
        ],
    };

    console.log("11");

    option4 && myChart4.setOption(option4);
    runCompNonComp();
    // runGlPie();

    // var tr = document.createElement('tr');
    // var td1 = tr.appendChild(document.createElement('td'));
    // var td2 = tr.appendChild(document.createElement('td'));

    // let uptime = ((data.data.nvr[1].count) / (data.data.nvr[1].count + data.data.nvr[0].count)) * 100;
    // td1.innerHTML = 'NVR';
    // td2.innerHTML = uptime.toFixed(2);
    // document.getElementById('tb').appendChild(tr);

    // $('#loading1').remove();
    // runModbusPie();
    // runNvrPie();

    // let script = $(document).createElement('script');
    // script.src = './example2.js';
    // document.body.appendChild(script);
}

myChart4.on('click', function (params) {
    // printing data name in console

    // console.log(params.name);
    // if (params.name == 'Online') {
    //     window.location.href = "/TableNvrOnline.html";
    // }
    // else {
    //     window.location.href = "/TableNvrOffline.html";
    // }

    console.log('val: ', params.name);

    document.getElementById('type').value = 'nvr';
    document.getElementById('status').value = params.name;
    console.log("This is the data of the site:  ", params.name);
    document.getElementById('siteListForm').submit();

    // const data = { type: 'nvr' }

    // fetch('http://127.0.0.1:8000/drilldown', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    // })
    //     // .then((response) => response.json())
    //     .then((data) => {
    //         console.log('Success: ', data);
    //         if (data.redirected == true) {
    //             window.location.href = 'http://127.0.0.1:8000/drilldown';
    //         }

    //     })
    //     .catch((error) => {
    //         console.error('Error: ', error);
    //     });

});