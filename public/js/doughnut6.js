// import * as echarts from 'echarts';

// var express = require('express');
// var router = express.Router();

var ROOT_PATH = 'https://echarts.apache.org/examples';

var chartDom6 = document.getElementById('main6');
var myChart6 = echarts.init(chartDom6);
var option6;
let text6 = '';


function runCamera() {
    console.log("starting hello world!");

    document.getElementById('camOnlineCount').innerHTML = 'Camera Online: ' + sessionStorage.getItem('cameraOnlineCount');
    document.getElementById('camOfflineCount').innerHTML = 'Camera Offline: ' + sessionStorage.getItem('cameraOfflineCount');

    let cameraOnlinePercent = Math.round((Number(sessionStorage.getItem('cameraOnlineCount')) / (Number(sessionStorage.getItem('cameraOnlineCount')) + Number(sessionStorage.getItem('cameraOfflineCount')))) * 100);
    let cameraOfflinePercent = Math.round((Number(sessionStorage.getItem('cameraOfflineCount')) / (Number(sessionStorage.getItem('cameraOnlineCount')) + Number(sessionStorage.getItem('cameraOfflineCount')))) * 100);

    option6 = {
        title: {
            text: text6,
            // text: 'NVR',
            // subtext: 'Real-time data',
            left: 'center'
        },
        legend: {
            top: '5%',
            left: 'center',
            data: ['offline: ' + cameraOfflinePercent + '%', 'online: ' + cameraOnlinePercent + '%']
        },
        height: '100%',
        width: '100%',
        color: [
            '#FF0000',
            '#0361a1',
        ],
        series: [
            {
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 0,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center',
                    formatter: function (d) {
                        return d.name;
                    },
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
                    { value: cameraOfflinePercent, name: 'Offline: ' + cameraOfflinePercent + '%' },
                    { value: cameraOnlinePercent, name: 'Online: ' + cameraOnlinePercent + '%' },
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

    option6 && myChart6.setOption(option6);

    if (checkAllData == 2) {
        document.body.style.opacity = 1;
        document.getElementById('loaderImgBlack').remove();
        document.body.style.pointerEvents = "auto";
    }
}

myChart6.on('click', function (params) {

    console.log('val: ', params.name);

    document.getElementById('type').value = 'nvr';
    document.getElementById('status').value = params.name;
    console.log("This is the data of the site:  ", params.name);
    document.getElementById('siteListForm').submit();
});