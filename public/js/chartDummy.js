var chartDomdummy = document.getElementById('mainDummy');
var myChartdummy = echarts.init(chartDomdummy);
var optiondummy;

let d = new Date();
d.setDate(d.getDate()-1);
let stringDate = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
console.log('checking today date:  ',stringDate);

fetch("https://cc.gizmosmart.io/iot/1.6/public/getUptimeDowntime?type=gl&from=2022-12-7&to="+stringDate+"&business_name=fincare").then(res => {
  return res.json();
})
  .then(data => {
    console.log(data.data);

    let inMap = new Map();
    let inCount = new Map();
    let startDate = new Date("2022-12-07");
    let traverseDate = new Date("2022-12-07");
    let endDate = new Date(stringDate);
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

    optiondummy = {
      title: {
        text: ''
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['Uptime']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          axisLabel: {
            rotate: 70
          },
          boundaryGap: false,
          data: keyArray
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Uptime',
          type: 'line',
          stack: 'Total',
          label: {
            show: false,
            position: 'top'
          },
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: valueArray
        }
      ]
    };

    optiondummy && myChartdummy.setOption(optiondummy);


    // myChartdummy.setOption({
    //   xAxis: {
    //     data: [3, 4, 5]
    //   },
    //   yAxis: {
    //   },
    //   brush: {
    //     toolbox: ['lineX'],
    //     type: 'lineX',
    //   },
    //   series: [{
    //     type: 'line', // changing this to scatter or other types makes the brush selection work
    //     data: [120, 200, 150]
    //   }]
    // });


  })
  .catch(error => console.log('ERROR: ', error));