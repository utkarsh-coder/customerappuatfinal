// import * as echarts from 'echarts';

// var express = require('express');
// var router = express.Router();

var ROOT_PATH = 'https://echarts.apache.org/examples';

var chartDom3 = document.getElementById('main3');
var myChart3 = echarts.init(chartDom3);
var option3;
let text3 = '';
if (sessionStorage.getItem('inOnlineCount') == null) {
    text3 = 'In not present at site';
}

// const weatherIcons = {
//   Sunny: ROOT_PATH + '/data/asset/img/weather/sunny_128.png',
//   Cloudy: ROOT_PATH + '/data/asset/img/weather/cloudy_128.png',
//   Showers: ROOT_PATH + '/data/asset/img/weather/showers_128.png'
// };

// $("#main3").append("<div id='loading3' class='loading'></div");

function runInPie() {
  option3 = {
    title: {
      text: text3,
      //   text: 'IN',
      // subtext: 'Real-time data',
      left: 'center'
    },
    color: ["#5470c6", "#ffa500"],
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      bottom: 10,
      left: 'center',
      data: ['online', 'offline']
    },
    series: [
      {
        type: 'pie',
        radius: '65%',
        name: 'No. of devices',
        center: ['50%', '50%'],
        // selectedMode: 'single',
        data: [
          // {
          //   value: 1548,
          //   name: 'CityE',
          //   label: {
          //     formatter: [
          //       '{title|{b}}{abg|}',
          //       '  {weatherHead|Weather}{valueHead|Days}{rateHead|Percent}',
          //       '{hr|}',
          //       '  {Sunny|}{value|202}{rate|55.3%}',
          //       '  {Cloudy|}{value|142}{rate|38.9%}',
          //       '  {Showers|}{value|21}{rate|5.8%}'
          //     ].join('\n'),
          //     backgroundColor: '#eee',
          //     borderColor: '#777',
          //     borderWidth: 1,
          //     borderRadius: 4,
          //     rich: {
          //       title: {
          //         color: '#eee',
          //         align: 'center'
          //       },
          //       abg: {
          //         backgroundColor: '#333',
          //         width: '100%',
          //         align: 'right',
          //         height: 25,
          //         borderRadius: [4, 4, 0, 0]
          //       },
          //       Sunny: {
          //         height: 30,
          //         align: 'left',
          //         backgroundColor: {
          //           image: weatherIcons.Sunny
          //         }
          //       },
          //       Cloudy: {
          //         height: 30,
          //         align: 'left',
          //         backgroundColor: {
          //           image: weatherIcons.Cloudy
          //         }
          //       },
          //       Showers: {
          //         height: 30,
          //         align: 'left',
          //         backgroundColor: {
          //           image: weatherIcons.Showers
          //         }
          //       },
          //       weatherHead: {
          //         color: '#333',
          //         height: 24,
          //         align: 'left'
          //       },
          //       hr: {
          //         borderColor: '#777',
          //         width: '100%',
          //         borderWidth: 0.5,
          //         height: 0
          //       },
          //       value: {
          //         width: 20,
          //         padding: [0, 20, 0, 30],
          //         align: 'left'
          //       },
          //       valueHead: {
          //         color: '#333',
          //         width: 20,
          //         padding: [0, 20, 0, 30],
          //         align: 'center'
          //       },
          //       rate: {
          //         width: 40,
          //         align: 'right',
          //         padding: [0, 10, 0, 0]
          //       },
          //       rateHead: {
          //         color: '#333',
          //         width: 40,
          //         align: 'center',
          //         padding: [0, 10, 0, 0]
          //       }
          //     }
          //   }
          // },
          { value: sessionStorage.getItem('inOnlineCount'), name: 'online' },
          { value: sessionStorage.getItem('inOfflineCount'), name: 'offline' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  option3 && myChart3.setOption(option3);
  runCameraPie();
  //   console.log("printing nvr: ");

  //   var tr = document.createElement('tr');
  //   var td1 = tr.appendChild(document.createElement('td'));
  //   var td2 = tr.appendChild(document.createElement('td'));

  //   let uptime = ((parseInt(sessionStorage.getItem('inOnlineCount'))) / (parseInt(sessionStorage.getItem('inOnlineCount')) + parseInt(sessionStorage.getItem('inOfflineCount')))) * 100;
  //   td1.innerHTML = 'IN';
  //   td2.innerHTML = uptime.toFixed(2);
  //   document.getElementById('tb').appendChild(tr);
}

myChart3.on('click', function (params) {
  // printing data name in console

  //   console.log(params.name);
  //   if (params.name == 'Online') {
  //     window.location.href = "/TableInOnline.html";
  //   }
  //   else {
  //     window.location.href = "/TableInOffline.html";
  //   }

  document.getElementById('type').value = 'in';
  document.getElementById('status').value = params.name;
  document.getElementById('siteListForm').submit();
});