// import * as echarts from 'echarts';

// var express = require('express');
// var router = express.Router();

var ROOT_PATH = 'https://echarts.apache.org/examples';

var chartDom7 = document.getElementById('main7');
var myChart7 = echarts.init(chartDom7);
var option7;
let text7 = '';


function runSensor() {
    console.log("starting hello world!");

    document.getElementById("workingsensorcount").innerHTML =
        "<span>Working</span> " + sessionStorage.getItem('workingSensorCount');
    document.getElementById("workingsensorcount").classList.add("br-right");
    document.getElementById("faultysensorcount").innerHTML =
        "<span>Faulty</span> " + sessionStorage.getItem('faultySensorCount');

    // document.getElementById('camOnlineCount').innerHTML = 'Online: ' + sessionStorage.getItem('cameraOnlineCount');
    // document.getElementById('camOfflineCount').innerHTML = 'Offline: ' + sessionStorage.getItem('cameraOfflineCount');

    let workingSensorPercent = Math.round((Number(sessionStorage.getItem('workingSensorCount')) / (Number(sessionStorage.getItem('workingSensorCount')) + Number(sessionStorage.getItem('faultySensorCount')))) * 100);
    let faultySensorPercent = Math.round((Number(sessionStorage.getItem('faultySensorCount')) / (Number(sessionStorage.getItem('workingSensorCount')) + Number(sessionStorage.getItem('faultySensorCount')))) * 100);

    option7 = {
        title: {
            text: text7,
            // text: 'NVR',
            // subtext: 'Real-time data',
            left: 'center'
        },
        legend: {
            top: '5%',
            left: 'center',
            data: ['faulty: ' + faultySensorPercent + '%', 'working: ' + workingSensorPercent + '%']
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
                        if (d.name == faultySensorPercent + '%' + '\n faulty') {
                            return '';
                        }
                        return d.name;
                    },
                    fontSize: 16,
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: "16",
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: faultySensorPercent, name: faultySensorPercent + '%' + '\n faulty' },
                    { value: workingSensorPercent, name: workingSensorPercent + '%' + '\n working' },
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

    option7 && myChart7.setOption(option7);
    text7 = '';
    runHDD();

    // if (checkAllData == 2) {
    //     document.body.style.opacity = 1;
    //     document.getElementById('loaderImgBlack').remove();
    //     document.body.style.pointerEvents = "auto";
    // }
}

myChart7.on('click', function (params) {

    console.log('val: ', params.name);

    document.getElementById('type').value = 'nvr';
    document.getElementById('status').value = params.name;
    console.log("This is the data of the site:  ", params.name);
    document.getElementById('siteListForm').submit();
});