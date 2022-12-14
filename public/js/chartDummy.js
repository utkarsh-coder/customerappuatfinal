var chartDomdummy = document.getElementById('mainDummy');
var myChartdummy = echarts.init(chartDomdummy);
var optiondummy;

optiondummy = {
    xAxis: [{
      type: 'category',
      axisLabel: {
        rotate: 90
        },
      data: ['1-dec-22', '2-dec-22', '3-dec-22', '4-dec-22', '5-dec-22', '6-dec-22', '7-dec-22', '8-dec-22', '9-dec-22', '10-dec-22', '11-dec-22', '12-dec-22', '13-dec-22', '14-dec-22', '15-dec-22']
    }],
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [100, 89, 76, 98, 67, 90, 80, 100, 70, 50, 70, 60, 60, 40, 90],
        type: 'line'
      }
    ]
  };

optiondummy && myChartdummy.setOption(optiondummy);