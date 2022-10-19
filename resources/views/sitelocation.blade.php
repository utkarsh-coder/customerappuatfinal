<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Site Health</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="{{ asset('css/design.css') }}" />


    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js" integrity="sha512-aVKKRRi/Q/YV+4mjoKBsE4x3H+BkegoM/em46NNlCqNTmUYADjBbeNefNxYV7giUp0VxICtqdrbqU7iVaeZNXA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <!-- Latest compiled and minified CSS -->

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
            background-color: #B7B3B3;
            border-radius: 10px;
        }

        .pstatus {
            padding-top: 20%;
        }

        .stronghealth {
            padding-top: 40%;
        }

        .num {
            font-size: 20px;
        }

        .siteblock {
            width: 100%;
            height: 200px;
            text-align: center;
            margin-top: 20px;
        }

        .verticalcard {
            display: inline-block;
            position: absolute;
            margin-left: 1%;
            width: 150px;
            height: 200px;
        }

        .horizontalcard {
            display: inline-block;
            width: 90%;
            height: 100px;
        }

        .verticalblock {
            display: inline-block;
            position: absolute;
            margin-left: 12%;
            width: 200px;
        }

        .subhorizontal {
            display: inline-block;
            position: absolute;
            margin-left: 10px;
            width: 100px;
            margin-top: 30px;
        }

        .subhorizontal2 {
            display: inline-block;
            position: absolute;
            margin-left: 50%;
            height: 50px;
            width: 50px;
            text-align: center;
            margin-top: 30px;
        }

        .icons {
            display: inline-block;
            width: 18%;
            height: 50px;
            margin-top: 20px;
        }

        .encircle {
            border: 2px solid black;
            border-radius: 50px;
        }
    </style>
</head>

<body>

    <script>
        function hitLink(link) {
            window.location.href = link;
        }
    </script>

    <main>
        <header class="mobileHeader">
            <a href="">
                <img src="{{ asset('img/backArrow.svg') }}" alt="" />
            </a>
            <h2>Site Health</h2>
        </header>

        <div class="pt-3 pb-4 bg-primary">
            <div class="container pb-2">
                <div class="row">
                    <div class="col">
                        <h2 class="text-white">Current Status</h2>
                    </div>
                </div>
            </div>

            <div class="container">

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


        <!-- repeat section  start -->
        <div id="siteblockcontainer">
            <!-- <div class="container my-3">
                <div class="row">

                    <div class="col-12">
                        <div class="card siteHealthCard">
                            <div class="card-body">
                                <div class="cardTitle d-flex justify-content-between align-items-start">
                                    <div class="cardTitle-content">
                                        <h3>ASTU - 09093</h3>
                                        <span>DLF Golf Course roar, Gurgaon,
                                            Haryana, 122 OM</span>
                                    </div>
                                    <div class="cardTitle-icon">
                                        <img
                                            src="{{
                                                asset('img/powerButton.svg')
                                            }}"
                                            alt=""
                                        />
                                        <span class="arm">Arm</span>
                                        <span class="disarm">Disarm</span>
                                    </div>
                                </div>
                            </div>

                            <div class="grid-row grid-row-col-2 siteHealthCard-content">
                                <div class="d-flex flex-column align-items-center siteHealthCard-content-details">
                                    <img src="{{
                                            asset('img/camera-switch.svg')
                                        }}" alt="" />
                                    <h6>Offline</h6>
                                    <span>Error</span>
                                </div>
                                <div class="d-flex flex-column align-items-center siteHealthCard-content-details">
                                    <img src="{{
                                            asset('img/network-switch.svg')
                                        }}" alt="" />
                                    <h6>Online</h6>
                                    <span>Error</span>
                                </div>
                                <div
                                    class="d-flex flex-column align-items-center siteHealthCard-content-details"
                                >
                                    <img
                                        src="{{
                                            asset('img/video-switch.svg')
                                        }}"
                                        alt=""
                                    />
                                    <h6>Hello</h6>
                                    <span>Error</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>

        <!-- repeat section  end -->

        <p id="fetchHost" hidden>{{env('APP_URL')}}</p>
    </main>


    <footer>
        <div class="menuItems" onclick="hitLink(getElementById('fetchHost').innerHTML+'/customerapp/public/home')">
            <img src="{{asset('img/home.svg')}}" alt="" />
            <span>Home</span>
        </div>
        <div class="menuItems" onclick="hitLink(getElementById('fetchHost').innerHTML+'/customerapp/public/sitelocation')">
            <img src="{{asset('img/location.svg')}}" alt="" />
            <span>Location</span>
        </div>
        <div class="menuItems" onclick="hitLink(getElementById('fetchHost').innerHTML+'/customerapp/public/healthchart')">
            <img src="{{asset('img/graph.svg')}}" alt="" />
            <span>Status</span>
        </div>
        <div class="menuItems">
            <img src="{{asset('img/setting.svg')}}" alt="" />
            <span>Setting</span>
        </div>
    </footer>


    <!-- <div class="card container enclosingContainer">
        <h2 class="heading">Sites</h2>
        <div style="width: 100%; text-align: center;">
            <div class="colstatus cardbck">
                <p class="pstatus">Offline</p><strong id="siteoff" class="num">...</strong>
            </div>
            <div class="colstatus cardbck">
                <p class="pstatus">Armed</p><strong id="sitearmed" class="num">...</strong>
            </div>
            <div class="colstatus cardbck">
                <p class="pstatus">Disamrmed</p><strong id="sitedisarmed" class="num">...</strong>
            </div>
        </div>
        <h4 class="heading">Site Status</h4>
        <div id="siteblockcontainer">
            <div class="cardbck siteblock">
                <div style="display:inline-block; width: 60%;">
                    <h4>This is the site name</h4>
                    <p>This is the address of the site</p>
                </div>
                <strong>Arm/disarm status</strong>

                <div>
                    <div class="colstatus cardbck">
                        <strong id="networkoffline" class="num stronghealth">...</strong>
                        <p>Offline</p>
                    </div>
                    <div class="colstatus cardbck">
                        <strong id="networkup" class="num stronghealth">...</strong>
                        <p>Online</p>
                    </div>
                </div>
            </div>
        </div>
    </div> -->

    <script src="js/sitelocation.js"></script>
</body>

</html>