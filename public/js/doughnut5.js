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

    document.getElementById('compcount').innerHTML = 'Compliance: ' + sessionStorage.getItem('compCount');
    document.getElementById('noncompcount').innerHTML = 'Non-Compliance: ' + sessionStorage.getItem('nonCompCount');

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
            data: ['online: ' + compPercent + '%', 'offline: ' + nonCompPercent + '%']
        },
        height: '80%',
        width: '100%',
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
                        show: false,
                        fontSize: "18",
                        fontWeight: "regular"
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: compPercent, name: 'compliance: ' + compPercent + '%' },
                    { value: nonCompPercent, name: 'non-compliance: ' + nonCompPercent + '%' }
                ]
            }
        ],
        legend: [
            {
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