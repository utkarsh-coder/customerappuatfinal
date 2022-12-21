// import * as echarts from 'echarts';

// var express = require('express');
// var router = express.Router();

var ROOT_PATH = 'https://echarts.apache.org/examples';

var chartDom5 = document.getElementById('main5');
var myChart5 = echarts.init(chartDom5);
var option5;
let text5 = '';


function runCompNonComp() {
    console.log("starting hello world!");

    document.getElementById("compcount").innerHTML =
            "<span>Online</span> " + sessionStorage.getItem('compCount');
        document.getElementById("compcount").classList.add("br-right");
        document.getElementById("noncompcount").innerHTML =
            "<span>Offline</span> " + sessionStorage.getItem('nonCompCount');

    let compPercent = Math.round((Number(sessionStorage.getItem('compCount')) / (Number(sessionStorage.getItem('compCount')) + Number(sessionStorage.getItem('nonCompCount')))) * 100);
    let nonCompPercent = Math.round((Number(sessionStorage.getItem('nonCompCount')) / (Number(sessionStorage.getItem('compCount')) + Number(sessionStorage.getItem('nonCompCount')))) * 100);

    option5 = {
        title: {
            text: text4,
            // text: 'NVR',
            // subtext: 'Real-time data',
            left: 'center'
        },
        legend: {
            top: '5%',
            left: 'center',
            data: ['offline: ' + nonCompPercent + '%','online: ' + compPercent + '%']
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
                    { value: nonCompPercent, name: nonCompPercent + '%' +'\n Non-Compliance' },
                    { value: compPercent, name: compPercent + '%' +'\n Compliance' },
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

    option5 && myChart5.setOption(option5);
    runCamera();
}

myChart5.on('click', function (params) {

    console.log('val: ', params.name);

    document.getElementById('type').value = 'nvr';
    document.getElementById('status').value = params.name;
    console.log("This is the data of the site:  ", params.name);
    document.getElementById('siteListForm').submit();
});