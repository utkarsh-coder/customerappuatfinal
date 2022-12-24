<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="{{ asset('css/design.css') }}" />

    <!-- Latest compiled and minified CSS -->

    <script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/5.3.3/echarts.min.js"></script>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

    <!-- toastr CSS -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.0/css/toastr.css" rel="stylesheet" />

    <!-- toastr JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.0/js/toastr.js"></script>

    <style>
        .enclosingContainer {
            width: 40rem;
            border: 2px solid black;
            border-radius: 20px;
        }

        .colstatus {
            display: inline-block;
            width: 11rem;
            height: 9rem;
            border-radius: 5px;
            text-align: center;
            margin-top: 20px;
        }

        .heading {
            margin-top: 30px;
            font-weight: bold;
        }

        .cardbck {
            background-color: #b7b3b3;
            border-radius: 10px;
        }

        .stronghealth {
            padding-top: 40%;
        }

        .num {
            font-size: 20px;
        }

        .pstatus {
            padding-top: 20%;
        }

        .piecard {
            width: 100%;
            height: 450px;
        }

        .pieintro {
            padding-left: 20px;
            padding-top: 20px;
        }

        .horizontal_line {
            background-color: black;
            width: 90%;
            height: 0.5px;
            margin-left: 5%;
            line-height: 80%;
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
        sessionStorage.removeItem("glOnlineCount");
        sessionStorage.removeItem("glOfflineCount");

        sessionStorage.removeItem("inOnlineCount");
        sessionStorage.removeItem("inOfflineCount");

        sessionStorage.removeItem("cameraOnlineCount");
        sessionStorage.removeItem("cameraOfflineCount");

        sessionStorage.removeItem("modbusOnlineCount");
        sessionStorage.removeItem("modbusOfflineCount");

        sessionStorage.removeItem("armCount");
        sessionStorage.removeItem("disarmCount");

        sessionStorage.removeItem("allonline");
        sessionStorage.removeItem("alloffline");

        function hitLink(link) {
            window.location.href = link;
        }
    </script>
    <main>
        <!-- <header class="mobileHeader">
            <a href="">
                <img src="{{ asset('img/backArrow.svg') }}" alt="" />
            </a>
            <h2>Health Status</h2>
        </header> -->

        <div id="loader" style="position: absolute; top: 50%; left:45%; z-index: 2; opacity:1;">
            <img id="loaderImgBlack" id="loaderimg" src="img/loaderImgBlack.gif" alt="">
        </div>
        <div class="pt-3 pb-4 bg-primary">
            <!-- <div class="container pb-2">
                    <div class="row">
                        <div class="col">
                            <h2 class="text-white">Current Status</h2>
                        </div>
                    </div>
                </div> -->

            <div class="container">
                <!-- <img id="loaderimg" src="img/loaderImg.gif" alt=""> -->
                <div class="row">
                    <div class="col-12">
                        <h4 class="text-white">Devices</h4>
                    </div>
                </div>
                <div class="grid-row grid-row-col-2 grid-row-80">
                    <div class="card">
                        <div class="card-body site-status">
                            <div class="d-flex flex-column justify-content-between h-100">
                                <p class="subHeading">Offline</p>
                                <span id="alloffline" class="num">...</span>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body site-status">
                            <div class="d-flex flex-column justify-content-between h-100">
                                <p class="subHeading">Online</p>
                                <span id="allonline" class="num">...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container my-3">
            <div class="row">
                <div class="col-12 mb-2">
                    <h3>Site Status</h3>
                </div>
                <div class="col-12 mb-3">
                    <div class="card siteHealthCard">
                        <div class="card-body">
                            <h4>NVR</h4>

                            <div class="cardTitle d-flex justify-content-between align-items-start">
                                <div style="width: 100%; height:350px" id="main1">
                                    <!-- <img
                                            src="{{
                                                asset('img/graphcards.svg')
                                            }}"
                                            class="w-100"
                                            alt=""
                                        /> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="col-12 mb-3">
                    <div class="card siteHealthCard">
                        <div class="card-body">
                            <h4>Network</h4>

                            <div class="cardTitle d-flex justify-content-between align-items-start">
                                <div id="main2" style="width:100%; height:350px"></div>
                            </div>

                        </div>
                    </div>
                </div>


                <div class="col-12 mb-3">
                    <div class="card siteHealthCard">
                        <div class="card-body">
                            <h4>Alarm Panel</h4>

                            <div class="cardTitle d-flex justify-content-between align-items-start">
                                <div id="main3" style="width:100%; height:350px"></div>

                            </div>

                        </div>
                    </div>
                </div>

                <div class="col-12 mb-3">
                    <div class="card siteHealthCard">
                        <div class="card-body">
                            <h4>Camera</h4>

                            <div class="cardTitle d-flex justify-content-between align-items-start">
                                <div id="main4" style="width:100%; height:350px"></div>

                            </div>

                        </div>
                    </div>
                </div>

                <!-- <div class="col-12 mb-3">
                    <div class="card siteHealthCard">
                        <div class="card-body">
                            <h4>Footage</h4>

                            <div class="cardTitle d-flex justify-content-between align-items-start">
                                <div id="main5" style="width:100%; height:350px"></div>

                            </div>

                        </div>
                    </div>
                </div> -->

                <div class="col-12 mb-3">
                    <div class="card siteHealthCard">
                        <div class="card-body">
                            <h4>ARM/ DISARM</h4>

                            <div class="cardTitle d-flex justify-content-between align-items-start">
                                <div id="main6" style="width:100%; height:350px"></div>

                            </div>

                        </div>
                    </div>
                </div>


                <!-- <div class="col-12 mb-3">
                    <div class="card siteHealthCard">
                        <div class="card-body">
                            <h4>Modbus</h4>

                            <div class="cardTitle d-flex justify-content-between align-items-start">
                                <div id="main7" style="width:100%; height:350px"></div>

                            </div>

                        </div>
                    </div>
                </div> -->



            </div>
        </div>


        <p id="fetchHost" hidden>{{env('APP_URL')}}</p>
    </main>

    <footer>
        <div class="menuItems" onclick="hitLink(getElementById('fetchHost').innerHTML+'/home')">
            <img src="{{asset('img/home.svg')}}" alt="" />
            <span>Home</span>
        </div>
        <div class="menuItems" onclick="hitLink(getElementById('fetchHost').innerHTML+'/sitelocation')">
            <img src="{{asset('img/location.svg')}}" alt="" />
            <span>Location</span>
        </div>
        <div class="menuItems" onclick="hitLink(getElementById('fetchHost').innerHTML+'/healthchart')">
            <img src="{{asset('img/graph.svg')}}" alt="" />
            <span>Status</span>
        </div>
        <div class="menuItems">
            <img src="{{asset('img/setting.svg')}}" alt="" />
            <span>Setting</span>
        </div>
    </footer>

    <div class="card container enclosingContainer d-none">
        <h2 class="heading">Devices</h2>
        <div style="width: 100%; text-align: center">
            <div class="colstatus cardbck">
                <p class="pstatus">Offline</p>
                <strong id="alloffline" class="num">...</strong>
            </div>
            <div class="colstatus cardbck">
                <p class="pstatus">Online</p>
                <strong id="allonline" class="num">...</strong>
            </div>
        </div>

        <!-- <h4 class="heading">Site Status</h4>
        <div class="piecard cardbck">
            <h4 class="pieintro">NVR</h4>
            <div class="horizontal_line"></div>
            <div id="main1" style="height: 80%"></div>
        </div>

        <div class="piecard cardbck">
            <h4 class="pieintro">Network</h4>
            <div class="horizontal_line"></div>
            <div id="main2" style="height: 400px"></div>
        </div>

        <div class="piecard cardbck">
            <h4 class="pieintro">Alarm Panel</h4>
            <div class="horizontal_line"></div>
            <div id="main3" style="height: 80%"></div>
        </div>

        <div class="piecard cardbck">
            <h4 class="pieintro">Cameras</h4>
            <div class="horizontal_line"></div>
            <div id="main4" style="height: 80%"></div>
        </div>

        <div class="piecard cardbck">
            <h4 class="pieintro">Footage</h4>
            <div class="horizontal_line"></div>
            <div id="main5" style="height: 80%"></div>
        </div>

        <div class="piecard cardbck">
            <h4 class="pieintro">ARM/ DISARM</h4>
            <div class="horizontal_line"></div>
            <div id="main6" style="height: 80%"></div>
        </div>

        <div class="piecard cardbck">
            <h4 class="pieintro">Modbus</h4>
            <div class="horizontal_line"></div>
            <div id="main7" style="height: 80%"></div>
        </div>
    </div> -->

        <form id="siteListForm" action="{{ url('/') }}/sitelist" method="post" class="primeContainer">
            <input id="type" type="hidden" name="type" value="" />
            <input id="status" type="hidden" name="status" value="" />
        </form>

        <!-- Latest compiled and minified JavaScript -->

        <script src="js/pie1.js"></script>
        <script src="js/pie2.js"></script>
        <script src="js/pie3.js"></script>
        <script src="js/pie4.js"></script>
        <script src="js/pie6.js"></script>
        <script src="js/pie7.js"></script>

        <script>
            //your code here...
        </script>
</body>

</html>