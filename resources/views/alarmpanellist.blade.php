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

    <main>
      
           <div class="pb-4 tabspage">
                <div class="container pb-2">
                    <div class="row headerBar align-items-center">
                        <div class="col">
                            <h2 class="fw-bold">Alarm Panel</h2>
                        </div>
                        
                    </div>

                    
  
                </div>
                <nav>

                <section>                
                    <div class="nav nav-tabs px-3" id="nav-tab" role="tablist">
                        <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Home</button>
                        <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</button>
                        <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</button>
                    </div>
                    </nav>
                    <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active px-3" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <ul class="notificationLists mb-0 mt-3">
                    <li>
                        <div class="d-flex w-100 align-items-start flex-nowrap gap-1">
                            <div class="listData">
                                <h5>Mothkur,Telangana</h5>
                                <p>Fincare Small Finance Bank Ltd,H No.5-245, First Floor Opp APMC Market Yard,Bhongiri Road, Mothkur,Yadadri Dist,Telangana </p>
                            </div>
                        </div>
                    </li>

                    <li>
                        <div class="d-flex w-100 align-items-start flex-nowrap gap-1">
                            <div class="listData">
                                <h5>Mothkur,Telangana</h5>
                                <p>Fincare Small Finance Bank Ltd,H No.5-245, First Floor Opp APMC Market Yard,Bhongiri Road, Mothkur,Yadadri Dist,Telangana </p>
                            </div>
                        </div>
                    </li>

                    <li>
                        <div class="d-flex w-100 align-items-start flex-nowrap gap-1">
                            <div class="listData">
                                <h5>Mothkur,Telangana</h5>
                                <p>Fincare Small Finance Bank Ltd,H No.5-245, First Floor Opp APMC Market Yard,Bhongiri Road, Mothkur,Yadadri Dist,Telangana </p>
                            </div>
                        </div>
                    </li>


                    <li>
                        <div class="d-flex w-100 align-items-start flex-nowrap gap-1">
                            <div class="listData">
                                <h5>Mothkur,Telangana</h5>
                                <p>Fincare Small Finance Bank Ltd,H No.5-245, First Floor Opp APMC Market Yard,Bhongiri Road, Mothkur,Yadadri Dist,Telangana </p>
                            </div>
                        </div>
                    </li>
                    </ul>
                    </div>
                    <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">...</div>
                    <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...</div>
                    </div>
                </section>

            </div>

    </main>

    <script src="js/devicelist.js"></script>
</body>

</html>