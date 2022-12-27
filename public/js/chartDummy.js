

function runUptime(type, id, mode) {
  var chartDomdummy = document.getElementById(id);
  var myChartdummy = echarts.init(chartDomdummy);
  var optiondummy;

  let d = new Date();
  d.setDate(d.getDate() - 1);
  let startDateString = '';
  let endDateString = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  d.setDate(d.getDate() + 1);
  console.log('checking today date:  ', endDateString);

  if (mode.localeCompare('daily') == 0) {
    d.setDate(d.getDate() - 30);
    startDateString = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    if ((new Date(startDateString)) < (new Date('2022-12-07'))) {
      startDateString = "2022-12-07";
    }
  }
  else if (mode.localeCompare('weekly') == 0) {
    let noofweeks = 0;
    d.setDate(d.getDate() - 7);

    while (d >= new Date('2022-12-7') && noofweeks <= 15) {
      startDateString = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      noofweeks++;
      console.log('string date check: ', startDateString);
      d.setDate(d.getDate() - 7);
    }
  }
  else if (mode.localeCompare('monthly') == 0) {
    let noofmonths = 0;
    d.setDate(d.getDate() - 30);

    while (d >= new Date('2022-12-7') && noofmonths <= 6) {
      startDateString = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      noofmonths++;
      console.log('string date check: ', startDateString);
      d.setDate(d.getDate() - 30);
    }
    if (startDateString == '') {
      startDateString = '2022-12-07';
    }
  }

  fetch("https://cc.gizmosmart.io/iot/1.6/public/getUptimeDowntime?type="+type+"&from=" + startDateString + "&to=" + endDateString + "&business_name=fincare").then(res => {
    return res.json();
  })
    .then(data => {
      console.log(data.data);

      let inMap = new Map();
      let inCount = new Map();
      // let startDate = new Date("2022-12-07");
      let traverseDate = new Date(startDateString);
      let endDate = new Date(endDateString);
      let keyArray = [];
      let valueArray = [];


      for (let i = 0; i < data.data.length; i++) {
        const d = new Date(data.data[i].created_at);
        d.setDate(d.getDate() - 1);
        // d.setDate(d.getDate() - 1);
        let stringDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        inMap.set(stringDate, inMap.has(stringDate) ? inMap.get(stringDate) + (Number(data.data[i].uptime) / 100) * 24 : (Number(data.data[i].uptime) / 100) * 24);
        inCount.set(stringDate, inCount.has(stringDate) ? inCount.get(stringDate) + 1 : 0 + 1);
      }

      let noofdays = 0;
      let weeklycount = 0;
      let weeklySum = 0;
      let monthlycount = 0;
      let monthlySum = 0;
      let count = 0;

      if (mode.localeCompare('daily') == 0) {
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
      }
      else if (mode.localeCompare('weekly') == 0) {
        while (traverseDate <= endDate) {
          let stringDate = traverseDate.getFullYear() + '-' + (traverseDate.getMonth() + 1) + '-' + traverseDate.getDate();
          console.log("string date sample: ", stringDate);
          console.log('status: ', inMap.has(stringDate));
          console.log('test1');
          do {
            console.log('test2', noofdays);
            weeklySum += inMap.get(stringDate);
            weeklycount += inCount.get(stringDate);
            console.log('weekly check', weeklySum);
            console.log('weekly check date', stringDate);
            noofdays++;
            traverseDate.setDate(traverseDate.getDate() + 1);
            stringDate = traverseDate.getFullYear() + '-' + (traverseDate.getMonth() + 1) + '-' + traverseDate.getDate();
          } while (noofdays % 7 != 0 && traverseDate <= endDate);

          console.log('weekly sum', weeklySum);
          keyArray[Math.floor(noofdays / 7) - 1] = mode + Math.floor(noofdays / 7);
          valueArray[Math.floor(noofdays / 7) - 1] = Math.round((weeklySum / (weeklycount * 24)) * 10000) / 100;
          weeklySum = 0;
          weeklycount = 0;
        }
      }
      else if (mode.localeCompare('monthly') == 0) {
        while (traverseDate <= endDate) {
          let stringDate = traverseDate.getFullYear() + '-' + (traverseDate.getMonth() + 1) + '-' + traverseDate.getDate();
          // console.log("string date sample: ", stringDate);
          // console.log('status: ', inMap.has(stringDate));
          // console.log('test1');
          console.log("start: ", startDateString);
          console.log("end: ", endDateString);
          do {
            // console.log('test2');
            monthlySum += inMap.get(stringDate);
            monthlycount += inCount.get(stringDate);
            noofdays++;
            traverseDate.setDate(traverseDate.getDate() + 1);
            stringDate = traverseDate.getFullYear() + '-' + (traverseDate.getMonth() + 1) + '-' + traverseDate.getDate();
            // console.log('monthly sum: ',monthlySum);
          } while (noofdays % 30 != 0 && traverseDate <= endDate);

          // console.log('monthly sum: ',monthlySum);
          if (noofdays < 30) {
            keyArray[Math.floor(noofdays / 30)] = mode + Math.floor(noofdays / 30)+1;
            valueArray[Math.floor(noofdays / 30)] = Math.round((monthlySum / (monthlycount * 24)) * 10000) / 100;
          }
          else {
            keyArray[Math.floor(noofdays / 30) - 1] = mode + Math.floor(noofdays / 30);
            valueArray[Math.floor(noofdays / 30) - 1] = Math.round((monthlySum / (monthlycount * 24)) * 10000) / 100;
          }

          monthlySum = 0;
          monthlycount = 0;
        }
      }

      console.log('keyarray: ', keyArray);
      console.log('valuearray: ', valueArray);
      console.log('inmap: ', inMap);
      console.log('incount: ', inCount);

      // optiondummy = {
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

      optiondummy = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Uptime']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: keyArray
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Uptime',
            type: 'line',
            stack: 'Total',
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
}