// import * as echarts from 'echarts';

// var express = require('express');
// var router = express.Router();

var ROOT_PATH = 'https://echarts.apache.org/examples';

var chartDom3 = document.getElementById('main3');
var myChart3 = echarts.init(chartDom3);
var option3;
let text3 = '';

// $("#main1").append("<div id='loading1' class='loading';></div");

// const weatherIcons = {
//   Sunny: ROOT_PATH + '/data/asset/img/weather/sunny_128.png',
//   Cloudy: ROOT_PATH + '/data/asset/img/weather/cloudy_128.png',
//   Showers: ROOT_PATH + '/data/asset/img/weather/showers_128.png'
// };

// 'http://54.197.121.111:8001/iot/1.6/public/getSiteHealthStatus?business_id=193'
console.log("url is:  ", document.getElementById('fetchHost').innerHTML + "/getChartData");
function runGl() {
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

    document.getElementById("glonlinecount").innerHTML =
            "<span>Online</span> " + sessionStorage.getItem('glOnlineCount');
        document.getElementById("glonlinecount").classList.add("br-right");
        document.getElementById("glofflinecount").innerHTML =
            "<span>Offline</span> " + sessionStorage.getItem('glOfflineCount');

    console.log("starting hello world!");

    if (sessionStorage.getItem('glOnlineCount') == 'null') {
        text3 = 'GL not present at site';
    }

    let glOnlinePercent = Math.round((Number(sessionStorage.getItem('glOnlineCount')) / (Number(sessionStorage.getItem('glOnlineCount')) + Number(sessionStorage.getItem('glOfflineCount')))) * 100);
    let glOfflinePercent = Math.round((Number(sessionStorage.getItem('glOfflineCount')) / (Number(sessionStorage.getItem('glOnlineCount')) + Number(sessionStorage.getItem('glOfflineCount')))) * 100);

    option3 = {
        title: {
            text: text3,
            // text: 'NVR',
            // subtext: 'Real-time data',
            left: 'center'
        },
        height: '100%',
        width: '100%',
        legend: {
            top: '5%',
            left: 'center',
            data: ['offline: ' + glOfflinePercent + '%','online: ' + glOnlinePercent + '%']
        },
        color: [
            '#FF0000',
            '#0361a1',
        ],
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
                    fontSize: 18,
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
                    { value: glOfflinePercent, name: glOfflinePercent + '%'+ '\n Offline' },
                    { value: glOnlinePercent, name: glOnlinePercent + '%'+'\n Online' },
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

    option3 && myChart3.setOption(option3);
    runNvr();
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

myChart3.on('click', function (params) {
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