// import * as echarts from 'echarts';

// import { run_state_chart } from "./bar_state_chart_stack";

var app = {};

var divRef;
var myChart;
var option;
var array;
var level = 1;
var key;
var trackArray = [];
var type;


divRef = document.getElementById('bar_zone');
myChart = echarts.init(divRef);


function functionBar1(params) {
    type = params.type;
    var url;
    if (level == 1) {
        url = 'http://54.197.121.111:8001/iot/1.6/public/getDeviceInfoFilter?business_id=193&type='+type;
        key = 'zone';
        // level = 2;
    }
    else if (level == 2) {
        url = 'http://54.197.121.111:8001/iot/1.6/public/getDeviceInfoFilter?business_id=193&type='+type+'&filterType=zone&value=' + params.value;
        key = 'state';
        // level = 3;
    }
    else if (level == 3) {
        url = 'http://54.197.121.111:8001/iot/1.6/public/getDeviceInfoFilter?business_id=193&type='+type+'&filterType=state&value=' + params.value;
        key = 'city';
        // level = 4;
    }
    else {
        url = 'http://54.197.121.111:8001/iot/1.6/public/getDeviceInfoFilter?business_id=193&type='+type+'&filterType=city&value=' + params.value;
        key = 'name';
    }


    fetch(url).then(res => {
        return res.json();
    })
        .then(data => {
            if (level > 1) {
                document.getElementById('back_btn').style.visibility = 'visible';
            }
            // console.log('key: ', key);
            const length = data.data.length;
            
            array = new Array(length + 1);
            array[0] = [key, 'Onlinenvr', 'Offline'];
            for (let i = 0; i < length; i++) {
                array[i + 1] = [];
                array[i + 1][0] = data.data[i][key];
                array[i + 1][1] = data.data[i].online_count;
                array[i + 1][2] = data.data[i].offline_count;
                // console.log("array: ", data.data[i][key] + "     " + data.data[i].online_count + "     " + data.data[i].offline_count);
            }

            option = {
                legend: {},
                color: ["#5470c6", "#ffa500"],
                tooltip: {},
                axisPointer: [
                    {
                        show: 'auto',
                        type: 'line'
                    }
                ],
                aria: {
                    decal: {
                        decals: [
                            {
                                dashArrayX: [
                                    0, 1
                                ]
                            }
                        ]
                    }
                },

                dataset: {
                    source: array,

                    // [
                    //   ['Zone', 'Online', 'Offline'],
                    //   ['North', 43.3, 85.8],
                    //   ['South', 83.1, 73.4],
                    //   ['East', 86.4, 65.2],
                    //   ['West', 72.4, 53.9]
                    // ]
                },
                xAxis: [
                    {
                        axisLabel: {
                            rotate: 90
                        },
                        type: "category",
                    }],

                yAxis: {},
                // Declare several bar series, each will be mapped
                // to a column of dataset.source by default.
                series: [{ type: 'bar' }, { type: 'bar' }]
            };
            // console.log("option value: " + option);
            // console.log("option value: " + myChart);
            option && myChart.setOption(option);

        })
        .catch(error => console.log('ERROR:', error));
}

myChart.on('click', function (param) {

    // let parameter = {
    //     'ref': params.ref,
    //     'type': params.type,
    //     'value': param.data[0],
    //     'categ': 'zone',
    //     'area': 'state'
    // }
    // displayBarGraphState(parameter);

    console.log('printing value check', param.data[0]);
    let parameters = {
        type: type,
        value: param.data[0],
    }

    trackArray[level - 1] = param.data[0];
    if (level < 4) {
        level += 1;
        functionBar1(parameters);
    }
    console.log('track array: ', trackArray);
    
});