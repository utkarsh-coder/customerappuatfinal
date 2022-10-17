
var ROOT_PATH = 'https://echarts.apache.org/examples';

var chartDom6 = document.getElementById('main6');
var myChart6 = echarts.init(chartDom6);
var option6;

function runArmDisarmPie() {
  option6 = {
    title: {
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
      data: ['arm', 'disarm']
    },
    series: [
      {
        type: 'pie',
        radius: '65%',
        name: 'No. of devices',
        center: ['50%', '50%'],
        data: [
          { value: sessionStorage.getItem('armCount'), name: 'arm' },
          { value: sessionStorage.getItem('disarmCount'), name: 'disarm' }
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

  option6 && myChart6.setOption(option6);
  runModbusPie();
}

myChart6.on('click', function (params) {
  document.getElementById('type').value = 'in';
  document.getElementById('status').value = params.name;
  document.getElementById('siteListForm').submit();

//   toastr.warning("Data not available");
});