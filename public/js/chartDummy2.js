// var chartDomdummy2 = document.getElementById('mainDummy2');
// var myChartdummy2 = echarts.init(chartDomdummy2);
// var optiondummy2;

// optiondummy2 = {
//     xAxis: [{
//       type: 'category',
//       axisLabel: {
//         rotate: 90
//         },
//       data: ['1-dec-22', '2-dec-22', '3-dec-22', '4-dec-22', '5-dec-22', '6-dec-22', '7-dec-22', '8-dec-22', '9-dec-22', '10-dec-22', '11-dec-22', '12-dec-22', '13-dec-22', '14-dec-22', '15-dec-22']
//     }],
//     yAxis: {
//       type: 'value'
//     },
//     series: [
//       {
//         data: [100, 89, 76, 98, 67, 90, 80, 100, 70, 50, 70, 60, 60, 40, 90],
//         type: 'line'
//       }
//     ]
//   };

// optiondummy2 && myChartdummy2.setOption(optiondummy2);




var chartDomdummy2 = document.getElementById('mainDummy2');
var myChartdummy2 = echarts.init(chartDomdummy2);
var optiondummy2;

let dIn = new Date();
dIn.setDate(d.getDate() - 1);
let stringDateIn = dIn.getFullYear() + "-" + (dIn.getMonth() + 1) + "-" + dIn.getDate();
console.log('checking today date:  ', stringDateIn);

fetch("https://cc.gizmosmart.io/iot/1.6/public/getUptimeDowntime?type=in&from=2022-12-7&to=" + stringDate + "&business_name=fincare").then(res => {
  return res.json();
})
  .then(data => {
    console.log(data.data);

    let inMap = new Map();
    let inCount = new Map();
    let startDate = new Date("2022-12-07");
    let traverseDate = new Date("2022-12-07");
    let endDate = new Date(stringDateIn);
    let keyArray = [];
    let valueArray = [];
    let count = 0;


    for (let i = 0; i < data.data.length; i++) {
      const d = new Date(data.data[i].created_at);
      // d.setDate(d.getDate() - 1);
      let stringDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
      inMap.set(stringDate, inMap.has(stringDate) ? inMap.get(stringDate) + (Number(data.data[i].uptime) / 100) * 24 : (Number(data.data[i].uptime) / 100) * 24);
      inCount.set(stringDate, inCount.has(stringDate) ? inCount.get(stringDate) + 1 : 0 + 1);
    }

    while (traverseDate <= endDate) {
      let stringDate = traverseDate.getFullYear() + '-' + (traverseDate.getMonth() + 1) + '-' + traverseDate.getDate();
      console.log("string date: ", stringDate);
      if (inCount.has(stringDate)) {
        keyArray[count] = stringDate;
        valueArray[count] = Math.round((inMap.get(stringDate) / (inCount.get(stringDate) * 24)) * 10000) / 100;
      }
      traverseDate.setDate(traverseDate.getDate() + 1);
      count++;
    }

    console.log('keyarray: ', keyArray);
    console.log('valuearray: ', valueArray);
    console.log('inmap: ', inMap);
    console.log('incount: ', inCount);

    // optiondummy = {
    //   xAxis: [{
    //     type: 'category',
    //     axisLabel: {
    //       rotate: 70
    //     },
    //     data: keyArray
    //   }],
    //   yAxis: {
    //     type: 'value'
    //   },
    //   series: [
    //     {
    //       data: valueArray,
    //       type: 'line'
    //     }
    //   ]
    // };

    // optiondummy && myChartdummy.setOption(optiondummy);

    // optiondummy2 = {
    //   title: {
    //     text: ''
    //   },
    //   tooltip: {
    //     trigger: 'axis',
    //     axisPointer: {
    //       type: 'cross',
    //       label: {
    //         backgroundColor: '#6a7985'
    //       }
    //     }
    //   },
    //   legend: {
    //     data: ['Uptime']
    //   },
    //   toolbox: {
    //     feature: {
    //       saveAsImage: {}
    //     }
    //   },
    //   grid: {
    //     left: '3%',
    //     right: '4%',
    //     bottom: '3%',
    //     containLabel: true
    //   },
    //   xAxis: [
    //     {
    //       type: 'category',
    //       axisLabel: {
    //         rotate: 70
    //       },
    //       boundaryGap: false,
    //       data: keyArray
    //     }
    //   ],
    //   yAxis: [
    //     {
    //       type: 'value'
    //     }
    //   ],
    //   series: [
    //     {
    //       name: 'Uptime',
    //       type: 'line',
    //       stack: 'Total',
    //       label: {
    //         show: false,
    //         position: 'top'
    //       },
    //       areaStyle: {},
    //       emphasis: {
    //         focus: 'series'
    //       },
    //       data: valueArray
    //     }
    //   ]
    // };

    // optiondummy2 && myChartdummy2.setOption(optiondummy2);


    myChartdummy2.setOption({
      xAxis: {
        data: [1,2,3],
        axisLabel: {
          rotate: 70
        },
      },
      yAxis: {
      },
      brush: {
        toolbox: ['lineX'],
        type: 'lineX',
      },
      series: [{
        type: 'line', // changing this to scatter or other types makes the brush selection work
        data: [1,2,3]
      }]
    });


  })
  .catch(error => console.log('ERROR: ', error));