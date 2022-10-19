
var ROOT_PATH = 'https://echarts.apache.org/examples';

var chartDom7 = document.getElementById('main7');
var myChart7 = echarts.init(chartDom7);
var option7;
let text7 = '';
if (sessionStorage.getItem('modbusOnlineCount') == null) {
    text7 = 'Modbus not present at site';
}

function runModbusPie() {
    option7 = {
        title: {
            text: text7,
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
                    { value: sessionStorage.getItem('modbusOnlineCount'), name: 'online' },
                    { value: sessionStorage.getItem('modbusOfflineCount'), name: 'offline' }
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

    option7 && myChart7.setOption(option7);
}

myChart7.on('click', function (params) {
      document.getElementById('type').value = 'modbus';
      document.getElementById('status').value = params.name;
      document.getElementById('siteListForm').submit();

    // toastr.warning("Data not available");
});