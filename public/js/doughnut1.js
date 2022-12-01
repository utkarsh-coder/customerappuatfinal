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
        sessionStorage.setItem('nvrOnlineCount', data.nvr[0].online_count);
        sessionStorage.setItem('nvrOfflineCount', data.nvr[0].offline_count);

        sessionStorage.setItem('glOnlineCount', data.gl[0].online);
        sessionStorage.setItem('glOfflineCount', data.gl[0].offline);

        sessionStorage.setItem('inOnlineCount', data.in[0].in_online_count);
        sessionStorage.setItem('inOfflineCount', data.in[0].in_offline_count);

        sessionStorage.setItem('armCount', data.in[0].arm_count);
        sessionStorage.setItem('disarmCount', data.in[0].disarm_count);

        sessionStorage.setItem('compCount', data.nvr[0].comp_count);
        sessionStorage.setItem('nonCompCount', data.nvr[0].non_cpm_count);

        sessionStorage.setItem('offSites', data.in[0].in_offline_count);
        sessionStorage.setItem('hardDriveCount', data.nvr[0].hdd_count);
        sessionStorage.setItem('open-noti', data.openNotification[0].count);

        sessionStorage.setItem('cameraOnlineCount', Number(data.nvr[0].camera_online_count));
        sessionStorage.setItem('cameraOfflineCount', data.nvr[0].camera_offline_count);

        sessionStorage.setItem('modbusOnlineCount', data.modbus[0].online);
        sessionStorage.setItem('modbusOfflineCount', data.modbus[0].offline);

        document.getElementById('inonlinecount').innerHTML = 'Online: ' + sessionStorage.getItem('inOnlineCount');
        document.getElementById('inofflinecount').innerHTML = 'Offline: ' + sessionStorage.getItem('inOfflineCount');

        document.getElementById('siteoff').innerHTML = sessionStorage.getItem('offSites');
        document.getElementById('hddCount').innerHTML = sessionStorage.getItem('hardDriveCount');
        document.getElementById('open-noti').innerHTML = sessionStorage.getItem('open-noti');

        if (sessionStorage.getItem('inOnlineCount') == 'null') {
            text1 = 'IN not present at site';
        }

        let onlinePercent = Math.round((Number(sessionStorage.getItem('inOnlineCount'))/(Number(sessionStorage.getItem('inOnlineCount'))+Number(sessionStorage.getItem('inOfflineCount'))))*100);
        let offlinePercent = Math.round((Number(sessionStorage.getItem('inOfflineCount'))/(Number(sessionStorage.getItem('inOnlineCount'))+Number(sessionStorage.getItem('inOfflineCount'))))*100);

        option1 = {
            title: {
                text: text1,
                // text: 'NVR',
                // subtext: 'Real-time data',
                left: 'center'
            },
            height: '80%',
            width: '100%',
            color: [
                '#FF0000',
                '#0361a1',
            ],
            // width: '60%',
            series: [
                {
                    position: 'auto',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: true,
                    itemStyle: {
                        borderRadius: 0,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: 'right',
                        // distanceToLabelLine: -20,
                        // edgeDistance: '-20%',
                        // bleedMargin: 0,
                        formatter: function (d) {
                            return d.value;
                        },
                        fontSize: 10,
                    },
                    labelLayout: {
                        verticalAlign: "bottom",
                        align: "left"
                    },
                    labelLine: {
                        show: true,
                    },
                    emphasis: {
                        label: {
                            show: false,
                            fontSize: "18",
                            fontWeight: "regular"
                        }
                    },
                    data: [
                        { value: offlinePercent, name: 'offline: '+offlinePercent+'%' },
                        { value: onlinePercent, name: 'online: '+onlinePercent+'%' },
                    ]
                }
            ],
            legend: [
                {
                    show: true,
                    bottom: 10,
                    orient: "vertical",
                    selectorLabel: {
                        show: false
                    },
                    left: 'center',
                    data: ['offline: '+offlinePercent+'%', 'online: '+onlinePercent+'%']
                }
            ],
        };

        option1 && myChart1.setOption(option1);
        runArmDisarm();
    })
    .catch(error => console.log('ERROR: ', error));

myChart1.on('click','legend', function (params) {

    console.log('val: ', params.name);

    document.getElementById('type').value = 'nvr';
    document.getElementById('status').value = params.name;
    console.log("This is the data of the site:  ", params.name);
    document.getElementById('siteListForm').submit();

});