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
                    borderRadius: 0,
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
                    { value: sessionStorage.getItem('cameraOnlineCount'), name: 'online' },
                    { value: sessionStorage.getItem('cameraOfflineCount'), name: 'offline' }
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

    option6 && myChart6.setOption(option6);

    document.body.style.opacity = 1;
    document.getElementById('loaderImgBlack').remove();
    document.body.style.pointerEvents = "auto";
}

myChart5.on('click', function (params) {

    console.log('val: ', params.name);

    document.getElementById('type').value = 'nvr';
    document.getElementById('status').value = params.name;
    console.log("This is the data of the site:  ", params.name);
    document.getElementById('siteListForm').submit();
});