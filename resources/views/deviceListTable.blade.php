<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="{{ asset('css/design.css') }}" />
    <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>

    <!-- <style>
        .loading {
            height: 200px;
            width: 200px;
            position: absolute;
            top: 50%;
            left: 50%;
            background-image: url(loading.gif);
            background-position: center center;
        }
    </style> -->

    <style>
        body {
            opacity: 0.3;
            pointer-events: none;
        }
    </style>
</head>

<body>
    <p id="fetchHost" hidden>{{ env("APP_URL") }}</p>
    <script>
        function backTable() {
            location.replace(document.getElementById('fetchHost').innerHTML + '/healthchart');
        }
    </script>

    <div id="loader" style="position: absolute; top: 50%; left:50%; z-index: 2; opacity:1;">
        <img id="loaderImgBlack" id="loaderimg" src="img/loaderImgBlack.gif" alt="">
    </div>
    <main>
        <header class="mobileHeader">
            <a onclick="backTable()">
                <img src="{{ asset('img/backArrow.svg') }}" alt="" />
            </a>
            <h2>Health Status</h2>
        </header>
        <div class="container py-3 mb-5 bg-white">
            <div class="row">
                <div class="col-12">
                    <div class="table-responsive">
                        <table id="tb6" class="table table-bordered">
                            <thead>
                                <th class="pe-8">Name</th>
                                <th>Location</th>
                                <th>Status</th>
                            </thead>

                            <tbody>

                            </tbody>

                            <!-- <img id="loaderimg" src="img/loaderImgBlack.gif" alt=""> -->

                            <div class="content">

                            </div>
                            <p id="fetchHost" hidden>{{env('APP_URL')}}</p>
                            <p id="fetchType" hidden>{{$type}}</p>
                            <p id="fetchStatus" hidden>{{$status}}</p>
                            <!-- document.getElementById('fetchHost').innerHTML + "/getLocationData" -->

                            <script>
                                $(".content").append("<div id='load' class='loading'></div");
                                console.log("done:  ", "{{$type}}");
                                console.log("done:  ", "{{$status}}");

                                $(document).ready(function() {
                                    $.ajax({
                                        // headers: {
                                        //   "accept": "application/json",
                                        //   "Access-Control-Allow-Origin": "http://54.197.121.111:800/",
                                        // },
                                        // cache: false,
                                        // async: true,
                                        type: 'POST',
                                        dataType: 'json',
                                        url: document.getElementById('fetchHost').innerHTML + "/getTableData",
                                        // crossDomain: true,
                                        // mode: 'no-cors',
                                        data: {
                                            'type': document.getElementById('fetchType').innerHTML,
                                            'status': document.getElementById('fetchStatus').innerHTML // <-- the $ sign in the parameter name seems unusual, I would avoid it
                                        },
                                        success: successFn,
                                        error: errorFn,
                                        complete: function(xhr, status) {
                                            console.log("the request is complete");
                                            document.body.style.opacity = 1;
                                            document.getElementById('loader').style.opacity = 1;
                                            document.getElementById('loaderImgBlack').remove();
                                            document.body.style.pointerEvents = "auto";
                                        }
                                    })

                                    console.log('log1');

                                    function successFn(result) {
                                        document.body.style.opacity = 1;
                                        document.getElementById('loader').style.opacity = 1;
                                        document.getElementById('loaderImgBlack').remove();
                                        document.body.style.pointerEvents = "auto";
                                        console.log('success');
                                        $('#loaderimg').remove();
                                        $('.loading').remove();
                                        let sortedList = result.data.sort((a, b) => {
                                            if (a.name < b.name) {
                                                return -1;
                                            }
                                        });
                                        for (let i in result.data) {
                                            console.log(result.data[i]);
                                            var tr = document.createElement('tr');
                                            var td1 = tr.appendChild(document.createElement('td'));
                                            var td2 = tr.appendChild(document.createElement('td'));
                                            var td3 = tr.appendChild(document.createElement('td'));

                                            td1.innerHTML = result.data[i].name;
                                            td2.innerHTML = result.data[i].location_name;

                                            if (result.data[i].status == 0) {
                                                td3.innerHTML = 'disarm';
                                            } else if (result.data[i].status == 1) {
                                                td3.innerHTML = 'arm';
                                            } else {
                                                td3.innerHTML = result.data[i].status;
                                            }
                                            document.getElementById('tb6').appendChild(tr);
                                        }
                                        // console.log('result: ', result.data[0].name);
                                    }

                                    console.log('log2');

                                    function errorFn() {
                                        console.log('error');
                                    }
                                })

                                // $(document).ready(function () {
                                //   // any code that you want to be run when the document gets loaded
                                //   console.log("testing 1");
                                //   fetch('http://54.197.121.111:8001/iot/1.6/public/getDeviceInfo?business_id=257&type=in&status=offline',{
                                //     method: 'GET',
                                //     mode: 'no-cors',
                                //   }).then(res => {
                                //     console.log(res);
                                //     return res.json;
                                //   })
                                //     .then(data => {
                                //       console.log(data);

                                //       // var tr = document.createElement('tr');
                                //       // var td1 = tr.appendChild(document.createElement('td'));
                                //       // var td2 = tr.appendChild(document.createElement('td'));
                                //       // var td3 = tr.appendChild(document.createElement('td'));

                                //       // td1.innerHTML = 'nvr';
                                //       // td2.innerHTML = 'amritsar';
                                //       // td3.innerHTML = 'offline';

                                //     })
                                //     .catch(error => console.log('ERROR:  ',error));
                                // });
                            </script>

                        </table>
                    </div>


                </div>
            </div>
        </div>
    </main>

</body>

</html>