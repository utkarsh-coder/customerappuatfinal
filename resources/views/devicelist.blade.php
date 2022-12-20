<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"
        />
        <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
            crossorigin="anonymous"
        />
        <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
            crossorigin="anonymous"
        ></script>
        <link rel="stylesheet" href="{{ asset('css/design.css') }}" />

        <script
            src="https://code.jquery.com/jquery-3.6.0.min.js"
            integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
            crossorigin="anonymous"
        ></script>

        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
            integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
            crossorigin="anonymous"
            referrerpolicy="no-referrer"
        />

        <link
            href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.0/css/toastr.css"
            rel="stylesheet"
        />

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
            <header
                class="p-3 bg-primary d-flex appHeader align-items-center text-white"
            >
                <a href="#"><i class="bi bi-arrow-left"></i></a>
                <h6>Network Health</h6>
                <div class="searchBoxBar ms-auto">
                    <i class="bi bi-search"></i>
                </div>
            </header>
            <div class="pb-4 devicelist">
                <div class="container">
                    <!-- <div class="row my-3">
                        <div class="col-12">
                            <label for="" class="position-relative w-100">
                                <span class="searchIcon"
                                    ><i class="bi bi-search"></i
                                ></span>
                                <input
                                    type="text"
                                    name=""
                                    class="searchBar"
                                    id=""
                                />
                            </label>
                        </div>
                    </div> -->
                    <div class="grid-row grid-row-col-1 mb-3">
                        <div class="card-body px-0 site-status">
                            <ul class="notificationLists mb-0">
                                <li>
                                    <div
                                        class="d-flex w-100 align-items-start flex-nowrap gap-1"
                                    >
                                        <div class="NotificationDate">
                                            <span>16</span>
                                            <p>mins</p>
                                        </div>
                                        <div class="listData">
                                            <h5>Gurgaon CC</h5>
                                            <p>
                                                Gurgaon Post Office, Gurgaon,
                                                along with its address
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div
                                        class="d-flex w-100 align-items-start flex-nowrap gap-1"
                                    >
                                        <div class="NotificationDate">
                                            <span>16</span>
                                            <p>mins</p>
                                        </div>
                                        <div class="listData">
                                            <h5>Gurgaon CC</h5>
                                            <p>
                                                Gurgaon Post Office, Gurgaon,
                                                along with its address
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div
                                        class="d-flex w-100 align-items-start flex-nowrap gap-1"
                                    >
                                        <div class="NotificationDate">
                                            <span>16</span>
                                            <p>mins</p>
                                        </div>
                                        <div class="listData">
                                            <h5>Gurgaon CC</h5>
                                            <p>
                                                Gurgaon Post Office, Gurgaon,
                                                along with its address
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div
                                        class="d-flex w-100 align-items-start flex-nowrap gap-1"
                                    >
                                        <div class="NotificationDate">
                                            <span>16</span>
                                            <p>mins</p>
                                        </div>
                                        <div class="listData">
                                            <h5>Gurgaon CC</h5>
                                            <p>
                                                Gurgaon Post Office, Gurgaon,
                                                along with its address
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div
                                        class="d-flex w-100 align-items-start flex-nowrap gap-1"
                                    >
                                        <div class="NotificationDate">
                                            <span>16</span>
                                            <p>mins</p>
                                        </div>
                                        <div class="listData">
                                            <h5>Gurgaon CC</h5>
                                            <p>
                                                Gurgaon Post Office, Gurgaon,
                                                along with its address
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div
                                        class="d-flex w-100 align-items-start flex-nowrap gap-1"
                                    >
                                        <div class="NotificationDate">
                                            <span>16</span>
                                            <p>mins</p>
                                        </div>
                                        <div class="listData">
                                            <h5>Gurgaon CC</h5>
                                            <p>
                                                Gurgaon Post Office, Gurgaon,
                                                along with its address
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div
                                        class="d-flex w-100 align-items-start flex-nowrap gap-1"
                                    >
                                        <div class="NotificationDate">
                                            <span>16</span>
                                            <p>mins</p>
                                        </div>
                                        <div class="listData">
                                            <h5>Gurgaon CC</h5>
                                            <p>
                                                Gurgaon Post Office, Gurgaon,
                                                along with its address
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <!-- <div class="card">
                        </div> -->
                    </div>
                </div>
            </div>
        </main>
    </body>
</html>
