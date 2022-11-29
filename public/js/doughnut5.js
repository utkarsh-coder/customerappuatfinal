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
                    { value: sessionStorage.getItem('compCount'), name: 'compliance' },
                    { value: sessionStorage.getItem('nonCompCount'), name: 'non-compliance' }
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