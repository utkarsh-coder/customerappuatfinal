// import * as echarts from 'echarts';

// var express = require('express');
// var router = express.Router();

var ROOT_PATH = 'https://echarts.apache.org/examples';

var chartDom1 = document.getElementById('main1');
var myChart1 = echarts.init(chartDom1);
var option1;
let text1 = '';

// $("#main1").append("<div id='loading1' class='loading';></div");

// const weatherIcons = {
//   Sunny: ROOT_PATH + '/data/asset/img/weather/sunny_128.png',
//   Cloudy: ROOT_PATH + '/data/asset/img/weather/cloudy_128.png',
//   Showers: ROOT_PATH + '/data/asset/img/weather/showers_128.png'
// };

// 'http://54.197.121.111:8001/iot/1.6/public/getSiteHealthStatus?business_id=193'
console.log("url is:  ", document.getElementById('fetchHost').innerHTML + "/getChartData");
fetch(document.getElementById('fetchHost').innerHTML + "/getChartData").then(res => {
    return res.json();
})
    .then(data => {
        console.log(data);
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
        // }

        sessionStorage.setItem('nvrOnlineCount', data.nvr[0].online);
        sessionStorage.setItem('nvrOfflineCount', data.nvr[0].offline);

        sessionStorage.setItem('glOnlineCount', data.gl[0].online);
        sessionStorage.setItem('glOfflineCount', data.gl[0].offline);

        sessionStorage.setItem('inOnlineCount', data.in[0].in_online_count);
        sessionStorage.setItem('inOfflineCount', data.in[0].in_offline_count);

        sessionStorage.setItem('cameraOnlineCount', Number(data.nvr[0].camera_online_count));
        sessionStorage.setItem('cameraOfflineCount', data.nvr[0].camera_offline_count);

        sessionStorage.setItem('modbusOnlineCount', data.modbus[0].online);
        sessionStorage.setItem('modbusOfflineCount', data.modbus[0].offline);

        sessionStorage.setItem('armCount', data.in[0].arm_count);
        sessionStorage.setItem('disarmCount', data.in[0].disarm_count);

        document.getElementById('inonlinecount').innerHTML = 'Online: ' + sessionStorage.getItem('inOnlineCount');
        document.getElementById('inofflinecount').innerHTML = 'Offline: ' + sessionStorage.getItem('inOfflineCount');

        // document.getElementById('allonline').innerHTML = data.nvr[0].online_count + data.gl[0].online + data.in[0].in_online_count;
        // document.getElementById('alloffline').innerHTML = data.nvr[0].offline_count + data.gl[0].offline + data.in[0].in_offline_count;
        console.log("starting hello world!");

        if (data.nvr[0].online_count == 'null') {
            text1 = 'NVR not present at site';
        }

        option1 = {
            title: {
                text: text1,
                // text: 'NVR',
                // subtext: 'Real-time data',
                left: 'center'
            },
            legend: {
                top: '5%',
                left: 'center',
                data: ['online', 'offline']
            },
            color: [
                '#0361a1',
                '#FF0000'
            ],
            series: [
                {
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: "18",
                            fontWeight: "regular"
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: sessionStorage.getItem('inOnlineCount'), name: 'Online' },
                        { value: sessionStorage.getItem('inOfflineCount'), name: 'Offline' }
                    ]
                }
            ],
            legend: [
                {
                    bottom: 10,
                    orient: "horizontal",
                    selectorLabel: {
                        show: false
                    }
                }
            ],
        };

        console.log("11");

        option1 && myChart1.setOption(option1);
        runArmDisarm();

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

    })
    .catch(error => console.log('ERROR: ', error));

myChart1.on('click', function (params) {
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