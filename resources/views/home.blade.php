<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="{{ asset('css/design.css') }}" />

    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <link href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.0/css/toastr.css" rel="stylesheet" />

    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.0/js/toastr.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/5.3.3/echarts.min.js"></script>

    <script src="js/chartDummy.js"></script>

    <style>
        .searchBtn {
            border: none;
            box-shadow: none;
            outline: none;
            background: transparent;
        }

        .searchLists {
            list-style: none;
            padding-left: 0;
        }

        .searchLists li {
            margin-bottom: 8px;
        }

        .searchLists .search-item {
            border-bottom: 1px solid #dfdfdf;
            padding: 6px 0px;
            display: block;
            text-decoration: none;
            color: #212529;
        }
    </style>
</head>

<body>
    <style>
        body {
            opacity: 0.3;
            pointer-events: none;
        }
    </style>

    <script>
        $(document).ready(function() {
            document.getElementById('all').checked = true;
            runUptime('gl', 'mainDummy', 'daily');
            runUptime('in', 'mainDummy2', 'daily');
            sessionStorage.setItem('filter_type', 'none');
            sessionStorage.setItem('value', 'none');
        })
        var minutes = 0;

        function waitAndshow() {
            minutes++;
            document.getElementById("timeAgoId").innerHTML =
                minutes + " min ago";
        }

        var glData = null;

        function pieHealth() {
            window.location.href = "http://127.0.0.1:8000/healthchart";
        }

        function siteLocation() {
            window.location.href = "http://127.0.0.1:8000/sitelocation";
        }
        // var socket = io.connect("http://uat.gizmosmart.io:9001/");
        // socket.on("message", (msg) => {
        //     toastr.warning(msg, 100);
        //     // alert('event triggered!');
        //     console.log(msg);
        //     // console.log('git'); // x8WIv7-mJelg7on_ALbx
        // });

        function hitLink(link, id) {
            window.location.href = link;
            document
                .getElementById("home")
                .classList.remove("active-state");
            document
                .getElementById("location")
                .classList.remove("active-state");
            document
                .getElementById("healthchart")
                .classList.remove("active-state");
            document
                .getElementById("setting")
                .classList.remove("active-state");
            document.getElementById(id).classList.add("active-state");
        }

        function hitDeviceListPage(type, deviceTypeHeadingText) {
            sessionStorage.setItem('deviceTypeHeadingText',deviceTypeHeadingText);
            document.getElementById("type").value = type;
            document.getElementById("status").value = "non-compliance";
            console.log("This is the data of the site:  ", "offline");
            document.getElementById("deviceListForm").submit();
        }

        function switchNetworkUptime(element) {
            console.log("switched.........", element.value);
            runUptime('gl', 'mainDummy', JSON.stringify(element.value).slice(1, -1));
        }

        function switchAlarmPanelUptime(element) {
            console.log("switched.........", element.value);
            runUptime('in', 'mainDummy2', JSON.stringify(element.value).slice(1, -1));
        }
    </script>

    <form id="deviceListForm" action="{{ url('/') }}/deviceList" method="post" class="primeContainer">
        <input id="type" type="hidden" name="type" value="" />
        <input id="status" type="hidden" name="status" value="" />
    </form>

    <main>
        <div id="loader" style="
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    z-index: 2;
                    opacity: 1;
                ">
            <img id="loaderImgBlack" id="loaderimg" src="img/loaderImgBlack.gif" alt="" />
        </div>
        <div class="pb-4">
            <div class="container pb-2">
                <div class="row headerBar align-items-center">
                    <div class="col">
                        <h2 class="fw-bold">Igzy Mobile App</h2>
                    </div>
                    <div class="col-3 text-end">
                        <span id="timeAgoId" class="timeAgo">0 mins ago</span>
                    </div>
                </div>

                <div class="row mb-4">
                    <div class="col-12">
                        <label for="" class="position-relative w-100">
                            <span class="searchIcon"><i class="bi bi-search"></i></span>
                            <input type="text" name="" class="searchBar" id="searchInput" />
                            <div class="dropdown dropdown-align-filter">
                                <button class="btn btn-secondary p-1" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-funnel"></i>
                                </button>
                                <ul class="dropdown-menu px-2" aria-labelledby="dropdownMenuButton1">
                                    <li>
                                        <div class="form-check ">
                                            <input class="form-check-input" type="radio" value="all" id="all" name="zone">
                                            <label class="form-check-label" for="flexCheckDefault">
                                                All
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="form-check ">
                                            <input class="form-check-input" type="radio" value="north" id="north" name="zone">
                                            <label class="form-check-label" for="flexCheckDefault">
                                                North
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="form-check ">
                                            <input class="form-check-input" type="radio" value="east" id="east" name="zone">
                                            <label class="form-check-label" for="flexCheckDefault">
                                                East
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" value="west" id="west" name="zone">
                                            <label class="form-check-label" for="flexCheckDefault">
                                                West
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" value="south" id="south" name="zone">
                                            <label class="form-check-label" for="flexCheckDefault">
                                                South
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="form-check ">
                                            <input class="form-check-input" type="radio" value="central" id="central" name="zone">
                                            <label class="form-check-label" for="flexCheckDefault">
                                                Central
                                            </label>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                        </label>
                    </div>
                </div>

                <div class="row my-3">
                    <div class="col-12">
                        <h3>Alarm Panel</h3>
                    </div>
                </div>

                <div class="grid-row mb-3 grid-row-col-2 minRowHeight">
                    <div id="cardIn" class="card">
                        <div class="card-body site-status graphsReverse">
                            <div id="main1" class="d-flex flex-column justify-content-between autoheight">
                                <!-- <img src="https://cdn-icons-png.flaticon.com/512/5555/5555775.png" class="img-flude" /> -->
                            </div>
                            <div class="notificationContainer">
                                <p id="inonlinecount" class="notificationContent br-right">
                                    <span>Online</span> ...
                                </p>
                                <p id="inofflinecount" class="notificationContent">
                                    <span>Offline</span> ...
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div id="cardInArmDisarm" class="card-body site-status">
                            <div id="main2" class="d-flex flex-column justify-content-between autoheight"></div>
                            <div class="notificationContainer">
                                <p id="armcount" class="notificationContent br-right">
                                    ARM: ...
                                </p>
                                <p id="disarmcount" class="notificationContent">
                                    DISARM: ...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-10 mt-4 mb-3">
                    <h3>Network Health</h3>
                </div>
                <div class="grid-row grid-row-col-1 mb-3">
                    <div class="card">
                        <div class="card-body site-status px-0">
                            <div class="d-flex">
                                <div class="graphsection">
                                    <div id="main3" class="d-flex flex-column justify-content-between autoheight"></div>
                                    <div class="notificationContainer">
                                        <p id="glonlinecount" class="notificationContent br-right">
                                            <span>Online</span> ...
                                        </p>
                                        <p id="glofflinecount" class="notificationContent">
                                            <span>Offline</span> ...
                                        </p>
                                    </div>
                                </div>
                                <div class="notificationWithGraph px-2">
                                    <ul id="glList" class="notificationLists mb-0"></ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-10 mt-4 mb-3">
                    <h3>NVR Status</h3>
                </div>
                <div class="grid-row grid-row-col-1 mb-3">
                    <div class="card">
                        <div class="card-body site-status px-0">
                            <div class="d-flex">
                                <div class="graphsection">
                                    <div id="main4" class="d-flex flex-column justify-content-between autoheight"></div>
                                    <div class="notificationContainer">
                                        <p id="nvronlinecount" class="notificationContent br-right">
                                            <span>Online</span> ...
                                        </p>
                                        <p id="nvrofflinecount" class="notificationContent">
                                            <span>Offline</span> ...
                                        </p>
                                    </div>
                                </div>
                                <div class="notificationWithGraph px-2">
                                    <ul id="nvrList" class="notificationLists mb-0"></ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-10 mt-3">
                    <h3>Network Uptime (PAN India)</h3>
                </div>
                <div class="grid-row grid-row-col-1 mt-2 mb-3 networdHelth" style="height: 400px">
                    <div class="card" style="height: 400px">
                        <div class="card-body site-status px-0">
                            <select onchange="switchNetworkUptime(this)" class="form-select selectNewStyle ms-auto me-2">
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                            <div class="notificationContainer"></div>
                            <div id="mainDummy" class="d-flex flex-column justify-content-between h-100"></div>
                        </div>
                    </div>
                </div>

                <div class="col-10 mt-3">
                    <h3>Alarm Panel Uptime (PAN India)</h3>
                </div>
                <div class="grid-row grid-row-col-1 mt-2 mb-3 networdHelth" style="height: 440px">
                    <div class="card" style="height: 440px">
                        <div class="card-body site-status">
                            <select onchange="switchAlarmPanelUptime(this)" class="form-select selectNewStyle ms-auto me-2">
                                <option selected value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                            <div class="notificationContainer"></div>
                            <div id="mainDummy2" class="d-flex flex-column justify-content-between h-100"></div>
                        </div>
                    </div>
                </div>

                <div class="col-10 mt-4 mb-3">
                    <h3>Compliance Status</h3>
                </div>
                <div class="grid-row grid-row-col-1 mb-3">
                    <div class="card">
                        <div class="card-body site-status px-0">
                            <div class="d-flex">
                                <div class="graphsection">
                                    <div id="main5" class="d-flex flex-column justify-content-between autoheight"></div>
                                    <div class="notificationContainer">
                                        <p id="compcount" class="notificationContent br-right">
                                            <span>Online</span> ...
                                        </p>
                                        <p id="noncompcount" class="notificationContent">
                                            <span>Offline</span> ...
                                        </p>
                                    </div>
                                </div>
                                <div class="notificationWithGraph px-2">
                                    <ul id="nonCompList" class="notificationLists mb-0"></ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- <div class="col-10 mt-3">
                    <h2>Compliance Status</h2>
                </div>
                <div class="grid-row grid-row-col-1 mt-2 mb-3 networdHelth">
                    <div class="card">
                        <div class="card-body site-status">
                            <div class="notificationContainer">
                                <p id="compcount" class="notificationContent">
                                    Compliance: ...
                                </p>
                                <p id="noncompcount" class="notificationContent">
                                    Non-Compliance: ...
                                </p>
                            </div>
                            <div id="main5" class="d-flex flex-column justify-content-between h-100"></div>
                        </div>
                    </div>
                </div> -->

                <!-- <div class="col-10 mt-3">
                    <h2>Camera Status</h2>
                </div>
                <div class="grid-row grid-row-col-1 mt-2 mb-3 networdHelth">
                    <div class="card">
                        <div class="card-body site-status">
                            <div class="notificationContainer">
                                <p id="camOnlineCount" class="notificationContent">
                                    Online: ...
                                </p>
                                <p id="camOfflineCount" class="notificationContent">
                                    Offline: ...
                                </p>
                            </div>
                            <div id="main6" class="d-flex flex-column justify-content-between h-100"></div>
                        </div>
                    </div>
                </div> -->

                <div class="col-10 mt-4 mb-3">
                    <h3>Camera Status</h3>
                </div>
                <div class="grid-row grid-row-col-1 mb-3">
                    <div class="card">
                        <div class="card-body site-status px-">
                            <div class="d-flex">
                                <div class="graphsection">
                                    <div id="main6" class="d-flex flex-column justify-content-between autoheight"></div>
                                    <div class="notificationContainer">
                                        <p id="camOnlineCount" class="notificationContent br-right">
                                            <span>Online</span> ...
                                        </p>
                                        <p id="camOfflineCount" class="notificationContent">
                                            <span>Offline</span> ...
                                        </p>
                                    </div>
                                </div>
                                <div class="notificationWithGraph px-2">
                                    <ul id="camerasList" class="notificationLists mb-0"></ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- <div class="row my-3">
                    <div class="col-12">
                        <h3>Sensors Status</h3>
                    </div>
                </div>
                <div class="grid-row mb-3 grid-row-col-1 minRowHeight">
                    <div class="card">
                        <div class="card-body site-status graphsReverse">
                            <div id="main7" class="d-flex flex-column justify-content-between autoheight"></div>
                            <div class="notificationContainer">
                                <p id="workingsensorcount" class="notificationContent br-right">
                                    <span>Working</span> ...
                                </p>
                                <p id="faultysensorcount" class="notificationContent">
                                    <span>Faulty</span> ...
                                </p>
                            </div>
                        </div>
                    </div>
                </div> -->

                <div class="row my-3">
                    <div class="col-12">
                        <h3>Hard Disk Status</h3>
                    </div>
                </div>
                <div class="grid-row mb-3 grid-row-col-1 minRowHeight">
                    <div class="card">
                        <div class="card-body site-status graphsReverse">
                            <div id="main8" class="d-flex flex-column justify-content-between autoheight"></div>
                            <div class="notificationContainer">
                                <p id="workinghddcount" class="notificationContent br-right">
                                    <span>Working</span> ...
                                </p>
                                <p id="faultyhddcount" class="notificationContent">
                                    <span>Faulty</span> ...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-10 mt-3">
                    <h2>Health Status</h2>
                </div>
                <div class="grid-row grid-row-col-3 mt-2 mb-3">
                    <div class="card">
                        <div class="card-body site-status">
                            <div class="d-flex flex-column justify-content-between h-100">
                                <p class="subHeading">Faulty Sensors (PAN India)</p>
                                <span id="faultySensorCount" class="num">...</span>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-body site-status">
                            <div class="d-flex flex-column justify-content-between h-100">
                                <p class="subHeading">Faulty HDD</p>
                                <span id="hddCount" class="num">...</span>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-body site-status">
                            <div class="d-flex flex-column justify-content-between h-100">
                                <p class="subHeading">Open Notifications</p>
                                <span id="open-noti" class="num">...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <section class="d-none">
            <div class="pt-3 pb-4 bg-primary">
                <div class="container pb-2">
                    <div class="row">
                        <div class="col">
                            <h2 class="text-white">Current Status</h2>
                        </div>
                    </div>
                </div>
                <!-- <img id="loaderimg" src="img/loaderImg.gif" alt=""> -->

                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h4 class="text-white">Site Health</h4>
                        </div>
                    </div>
                    <div class="grid-row grid-row-col-3 grid-row-80">
                        <div class="card">
                            <div class="card-body site-status">
                                <div class="d-flex flex-column justify-content-between h-100">
                                    <p class="subHeading">Off-Devices</p>
                                    <span id="siteoff" class="num">...</span>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body site-status">
                                <div class="d-flex flex-column justify-content-between h-100">
                                    <p class="subHeading">Armed</p>
                                    <span id="sitearmed" class="num">...</span>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-body site-status">
                                <div class="d-flex flex-column justify-content-between h-100">
                                    <p class="subHeading">Disamrmed</p>
                                    <span id="sitedisarmed" class="num">...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container my-3">
                <div class="row">
                    <div class="col-12">
                        <h4>Network Health</h4>
                    </div>
                    <div class="grid-row grid-row-col-3">
                        <div class="card">
                            <div class="card-body site-status">
                                <div class="d-flex flex-column justify-content-between h-100">
                                    <p class="subHeading">Effected</p>
                                    <span id="networkeffected" class="num">...</span>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-body site-status">
                                <div class="d-flex flex-column justify-content-between h-100">
                                    <p class="subHeading">Offline</p>
                                    <span id="networkoffline" class="num">...</span>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-body site-status">
                                <div class="d-flex flex-column justify-content-between h-100">
                                    <p class="subHeading">Up</p>
                                    <span id="networkup" class="num">...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container my-3">
                <div class="row">
                    <div class="col-12">
                        <h4>Health Status</h4>
                    </div>
                    <div class="grid-row grid-row-col-2 grid-row-200">
                        <div class="grid-row grid-row-col-1">
                            <div class="card graphBg">
                                <div class="card-body site-status">
                                    <div class="d-flex flex-column justify-content-between h-100">
                                        <div class="d-flex justify-content-between align-items-center healthStatus">
                                            <div class="healthStatus-content">
                                                <h3 id="nvrtotal">...</h3>
                                                <span class="subHeading">NVR</span>
                                            </div>
                                            <div class="healthStatus-value text-center">
                                                <span id="nvroff">1 </span>
                                                <span>Off</span>
                                            </div>
                                        </div>

                                        <div class="d-flex justify-content-between align-items-center healthStatus">
                                            <div class="healthStatus-content">
                                                <h3 id="compliance">...</h3>

                                                <span class="subHeading">Compliance</span>
                                            </div>
                                            <div class="healthStatus-value text-center">
                                                <span id="noncompliance">...
                                                </span>
                                                <span>Off</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="grid-row grid-row-col-1">
                            <div class="card cardBgWave">
                                <div class="card-body site-status d-flex">
                                    <div class="d-flex justify-content-between w-100 align-items-center healthStatus">
                                        <div class="healthStatus-content">
                                            <h3 id="alarmpaneltotal">
                                                ...
                                            </h3>
                                            <p class="subHeading">
                                                Alarm Panel
                                            </p>
                                        </div>
                                        <div class="healthStatus-value text-center">
                                            <span id="alarmpaneloff">...
                                            </span>
                                            <span>Off</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="card cardBgWave">
                                <div class="card-body site-status d-flex">
                                    <div class="d-flex justify-content-between w-100 align-items-center healthStatus">
                                        <div class="healthStatus-content">
                                            <h3 id="cameratotal">...</h3>
                                            <span class="subHeading">Camera</span>
                                        </div>
                                        <div class="healthStatus-value text-center">
                                            <span id="cameraoff">... </span>
                                            <span>Off</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <p id="fetchHost" hidden>{{ env("APP_URL") }}</p>
    </main>
    <footer>
        <div id="home" class="active-state menuItems" onclick="hitLink(getElementById('fetchHost').innerHTML+'/home', 'home')">
            <img src="{{ asset('img/home.svg') }}" alt="" />
            <span>Home</span>
        </div>
        <div id="location" class="menuItems" onclick="hitLink(getElementById('fetchHost').innerHTML+'/sitelocation', 'location')">
            <img src="{{ asset('img/location.svg') }}" alt="" />
            <span>Location</span>
        </div>
        <div id="healthchart" class="menuItems" onclick="hitLink(getElementById('fetchHost').innerHTML+'/healthchart', 'healthchart')">
            <img src="{{ asset('img/graph.svg') }}" alt="" />
            <span>Status</span>
        </div>
        <!-- <div id="setting" class="menuItems">
            <img src="{{ asset('img/setting.svg') }}" alt="" />
            <span>Setting</span>
        </div> -->
    </footer>

    <!-- <h4 class="heading">Network Health</h4>
    <div class="cardbck networkblock">
        <div class="colstatus cardbck">
            <strong id="networkeffected" class="num stronghealth">...</strong>
            <p>Effected</p>
        </div>
        <div class="colstatus cardbck">
            <strong id="networkoffline" class="num stronghealth">...</strong>
            <p>Offline</p>
        </div>
        <div class="colstatus cardbck">
            <strong id="networkup" class="num stronghealth">...</strong>
            <p>Up</p>
        </div>
    </div>

    <h4 class="heading">Health Status</h4>
    <div style="height: 200px">
        <div class="cardbck verticalcard">
            <div>
                <div class="subhorizontal">
                    <strong id="nvrtotal" class="num stronghealth">...</strong>
                    <p>NVR</p>
                </div>
                <div class="subhorizontal2 encircle">
                    <strong id="nvroff">...</strong>
                    <p>Off</p>
                </div>
            </div>

            <div style="margin: 100px 0px 0px 20px">
                <div class="subhorizontal">
                    <strong id="footagetotal" class="num stronghealth">N/A</strong>
                    <p>Footage</p>
                </div>
                <div class="subhorizontal2 encircle">
                    <strong id="footageoff">N/A</strong>
                    <p>Off</p>
                </div>
            </div>
        </div>
        <div class="verticalblock">
            <div class="cardbck horizontalcard">
                <div>
                    <div class="subhorizontal">
                        <strong id="alarmpaneltotal">...</strong>
                        <p>Alarm Panel</p>
                    </div>
                    <div class="subhorizontal2 encircle">
                        <strong id="alarmpaneloff">...</strong>
                        <p>Off</p>
                    </div>
                </div>
            </div>
            <div class="cardbck horizontalcard">
                <div class="subhorizontal">
                    <strong id="cameratotal">...</strong>
                    <p>Camera</p>
                </div>
                <div class="subhorizontal2 encircle">
                    <strong id="cameraoff">...</strong>
                    <p>Off</p>
                </div>
            </div>
        </div>
    </div>
    <div style="margin-top: 30px; text-align: center">
        <div class="icons">
            <i class="fa-solid fa-house-user"></i>
        </div>

        <div class="icons">
            <i onclick="siteLocation()" class="fa-solid fa-map-pin"></i>
        </div>

        <div class="icons">
            <i onclick="pieHealth()" class="fas fa-camera"></i>
        </div>

        <div class="icons">
            <i class="fa-solid fa-exclamation"></i>
        </div>
        <div class="icons">
            <i class="fa-solid fa-gear"></i>
        </div>
    </div> -->

    <script src="js/doughnut1.js"></script>
    <script src="js/doughnut2.js"></script>
    <script src="js/doughnut3.js"></script>
    <script src="js/doughnut4.js"></script>
    <script src="js/doughnut5.js"></script>
    <script src="js/doughnut6.js"></script>
    <script src="js/doughnut7.js"></script>
    <script src="js/doughnut8.js"></script>

    <!-- <script src="js/chartDummy2.js"></script> -->
    <script src="js/home.js"></script>
</body>

</html>