// import * as echarts from 'echarts';

// var express = require('express');
// var router = express.Router();

var ROOT_PATH = 'https://echarts.apache.org/examples';

var chartDom8 = document.getElementById('main8');
var myChart8 = echarts.init(chartDom8);
var option8;
let text8 = '';


function runHDD() {
    console.log("starting hello world!");

    document.getElementById("workinghddcount").innerHTML =
            "<span>Working</span> " + sessionStorage.getItem('workingHardDriveCount');
        document.getElementById("workinghddcount").classList.add("br-right");
        document.getElementById("faultyhddcount").innerHTML =
            "<span>Faulty</span> " + sessionStorage.getItem('faultyHardDriveCount');

    // document.getElementById('camOnlineCount').innerHTML = 'Online: ' + sessionStorage.getItem('cameraOnlineCount');
    // document.getElementById('camOfflineCount').innerHTML = 'Offline: ' + sessionStorage.getItem('cameraOfflineCount');

    let workingHddPercent = Math.round((Number(sessionStorage.getItem('workingHardDriveCount')) / (Number(sessionStorage.getItem('workingHardDriveCount')) + Number(sessionStorage.getItem('faultyHardDriveCount')))) * 100);
    let faultyHddPercent = Math.round((Number(sessionStorage.getItem('faultyHardDriveCount')) / (Number(sessionStorage.getItem('workingHardDriveCount')) + Number(sessionStorage.getItem('faultyHardDriveCount')))) * 100);

    option8 = {
        title: {
            text: text8,
            // text: 'NVR',
            // subtext: 'Real-time data',
            left: 'center'
        },
        legend: {
            top: '5%',
            left: 'center',
            data: ['faulty: ' + faultyHddPercent + '%', 'working: ' + workingHddPercent + '%']
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
                    { value: faultyHddPercent, name: faultyHddPercent + '%' +'\n faulty' },
                    { value: workingHddPercent, name: workingHddPercent + '%' +'\n working' },
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

    option8 && myChart8.setOption(option8);
    text8 = '';

    if (checkAllData == 2) {
        checkAllData = 0;
        document.body.style.opacity = 1;
        document.getElementById('loaderImgBlack').remove();
        document.body.style.pointerEvents = "auto";
    }
}

myChart8.on('click', function (params) {

    console.log('val: ', params.name);

    document.getElementById('type').value = 'nvr';
    document.getElementById('status').value = params.name;
    console.log("This is the data of the site:  ", params.name);
    document.getElementById('siteListForm').submit();
});