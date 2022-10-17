console.log('running the home.js file');

// console.log('session storage: ', sessionStorage.getItem("business_id"));

$(document).ready(function () {

    fetch('http://54.197.121.111:8001/iot/1.6/public/getSiteHealthStatus?business_id=193').then(res => {
        return res.json();
    })
        .then(data => {
            console.log(data.gl[0].offline);
            document.getElementById('siteoff').innerHTML = data.nvr[0].offline_count + data.gl[0].offline + data.in[0].in_offline_count;
            document.getElementById('sitearmed').innerHTML = data.in[0].arm_count;
            document.getElementById('sitedisarmed').innerHTML = data.in[0].disarm_count;
            
            document.getElementById('networkeffected').innerHTML = data.effected[0].effect_count;
            document.getElementById('networkoffline').innerHTML = data.gl[0].offline;
            document.getElementById('networkup').innerHTML = data.gl[0].online;

            document.getElementById('nvrtotal').innerHTML = data.nvr[0].offline_count + data.nvr[0].online_count;
            document.getElementById('nvroff').innerHTML = data.nvr[0].offline_count;
            // document.getElementById('footagetotal').innerHTML = data.nvr[0].footage_count;
            // document.getElementById('footageoff').innerHTML = (data.nvr[0].camera_offline_count +  Number(data.nvr[0].camera_online_count))-data.nvr[0].footage_count;
            document.getElementById('alarmpaneltotal').innerHTML = data.in[0].in_offline_count + data.in[0].in_online_count;
            document.getElementById('alarmpaneloff').innerHTML = data.in[0].in_offline_count;
            document.getElementById('cameratotal').innerHTML = Number(data.nvr[0].camera_online_count) + data.nvr[0].camera_offline_count;
            document.getElementById('cameraoff').innerHTML = data.nvr[0].camera_offline_count;
        })
        .catch(error => console.log('ERROR'));
});