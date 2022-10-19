
var ROOT_PATH = 'https://echarts.apache.org/examples';

var chartDom4 = document.getElementById('main4');
var myChart4 = echarts.init(chartDom4);
var option4;
let text4 = '';
if (sessionStorage.getItem('cameraOnlineCount') == null) {
    text4 = 'Camera not present at site';
}

function runCameraPie() {
  option4 = {
    title: {
      text: text4,
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
        data: [
          { value: sessionStorage.getItem('cameraOnlineCount'), name: 'online' },
          { value: sessionStorage.getItem('cameraOfflineCount'), name: 'offline' }
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

  option4 && myChart4.setOption(option4);
  runArmDisarmPie();
}

myChart4.on('click', function (params) {
  document.getElementById('type').value = 'cameras';
  document.getElementById('status').value = params.name;
  document.getElementById('siteListForm').submit();

//   toastr.warning("Data not available");
});