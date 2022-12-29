<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\customers;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Redirect;

class CustomerController extends Controller
{
    public function index()
    {
        return "index function";
    }

    // public function store(Request $request)
    // {
    //     echo "<pre>";
    //     // return $request->all();
    //     // return "data printing";
    //     $customers = customers::where('email', $request->email)->first();
    //     if ($customers == null) {
    //         $customers = new customers();
    //         $customers->email = $request->email;
    //         $customers->password = $request->password;

    //         $customers->save();
    //         echo "Record inserted successfully.<br/>";
    //         echo '<a href = "/login">Click Here</a> to go back.';
    //     } else {
    //         echo "Email/Mobile already exists. Try using another one.<br/>";
    //         echo '<a href = "/login">Click Here</a> to go back.';
    //     }


    //     // return $customers->all();

    //     // return redirect('http://127.0.0.1:8000/login' ::previous());
    //     // redirect()->back();
    //     // window.location.assign("http://127.0.0.1:8000/login");

    //     // return "data saved";
    // }

    // public function update(Request $request)
    // {
    //     $customers = customers::where('email', $request->email)->first();
    //     $customers->email = $request->email;
    //     $customers->password = $request->password;
    //     $customers->save();
    //     return redirect('login');
    // }

    public function search()
    {
        return view("homebackup2");
    }

    // public function view()
    // {
    //     echo "<pre>";
    //     // return $request->all();
    //     // return "data printing";

    //     $customers = new customers();
    //     // $customers->id = 3;
    //     // // return $customers->all();
    //     return customers::all()->where("email", "utkarshblp@gmail.com");

    //     // return "data saved";
    // }

    public function register()
    {
        return view("register");
    }

    public function forgotmail()
    {
        return view("forgotmail");
    }

    public function verifyOTP()
    {
        return view("otp");
    }

    public function mapuser()
    {
        return view('usermapping');
    }

    public function deviceList(Request $request){
        return view('devicelist', ['type' => $request->type, 'status' => $request->status]);
    }

    public function alarmPanelList(){
        return view("alarmpanellist");
    }

    public function armDisarmList(){
        return view("armdisarmlist");
    }

    public function verify(Request $request)
    {
        // $customers = new customers();
        // $data = customers::all()->where("email", $request->email)->first();

        // $dataarray = array(
        //     'email' => 'iot.developers@kochartech.com',
        //     'password' => 'Kipl@1234'
        // );
        // $data = json_encode($dataarray);

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'http://cc.gizmosmart.io/iot/1.6/public/api_login',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => '{"email":"' . $request->email . '","password":"' . $request->password . '"}',
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json',
                'Cookie: JSESSIONID=eyJpdiI6IkIrYXM2b0UrN3lhTmROWEM4U2RLeGc9PSIsInZhbHVlIjoiT1JXMXlCZVp3dVFDSWVYckVsRlN1V0FzYXZHSGRzRkJ2d2NUaDFKZUtva0MycnVqdElPaVN1VlB2S3VwXC82bGRQQmVtTEdFRmhwTUswMzJ3aTF3QUNnPT0iLCJtYWMiOiJjMjIwZjQxMzNjNjA0ZjQxMGU4YzY5OGU1ZmVjNDA4NjBkMWE3ODIxZWNkZWJiMmRlYzA1MGNlZmFmMDc1MzBmIn0%3D'
            ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        $data = json_decode($response);

        if ($data->code == 1) {
            session()->put('user_id', 1);
            session()->put('business_id', 193);

            return redirect('home');
        } else if ($data->message == "User doesnt found") {
            echo "User not found";
        } else {
            echo "incorrect credentials";
        }

        // return $data[0]->email;
        // print_r($data);
        // if ($data != '') {
        //     if ($data->password == $request->password) {
        //         session()->put('user_id', 1);
        //         // session()->forget('user_id');
        //         return view("home");
        //     } else {
        //         return "incorrect credentials";
        //     }
        // }
        // return "data not found";
    }

    public function home()
    {
        // $customers = new customers();
        // $data = customers::all()->where("email", $request->email);
        // // return sizeof($data);
        // if (sizeof($data) > 0) {
        //     if ($data[0]->password == $request->password) {
        //         return view("home");
        //     } else {
        //         return "incorrect credentials";
        //     }
        // }
        return view("home");
    }

    public function healthChart()
    {
        return view("healthchart");
    }

    public function sitelocation()
    {
        return view("sitelocation");
    }

    public function drilldown(Request $request)
    {
        return view('drilldownchart', ['type' => $request->type]);
    }

    public function sitelist(Request $request)
    {
        return view('deviceListTable', ['type' => $request->type, 'status' => $request->status]);
    }

    public function getData()
    {

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'http://cc.gizmosmart.io/iot/1.6/public/getSiteHealthStatus?business_id=' . session()->get('business_id'),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HTTPHEADER => array(
                'Cookie: JSESSIONID=eyJpdiI6IlZoK0kwbFZ2ODAycXBhaWJjaHFUVHc9PSIsInZhbHVlIjoiUEZ2WmNNK005dnRRUnYzYWgrOXJCRFYxYUoweVV6OUFQdkhRamhCbUpoQlpGXC8xblg4azRZSE9xZ3E2dVdGZ1VVUktIbk85Nk1nZ1JWMmxCNTJiM21nPT0iLCJtYWMiOiI3YjE1YTE4YTk4ODVjOGJhNTg0MjIwMjExMTAxNDNmMTljOTY3N2FjNGM5ODExZWYwMjU1MWYyMGQxOTQ2ZTc1In0%3D'
            ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        // echo $response;

        // $data = array(
        //     'key' => 'value',
        // );
        // $payload = json_encode($data);
        return $response;
    }

    public function getLocationData()
    {
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'http://cc.gizmosmart.io/iot/1.6/public/getDeviceInfo?business_id=' . session()->get('business_id') . '&type=location&status=active',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HTTPHEADER => array(
                'Cookie: JSESSIONID=eyJpdiI6InU5WTNxSGJaQnJTTXEyWFhyM2g1UXc9PSIsInZhbHVlIjoiRTBxS3BmZXBZN3ZYSDhzQzBGbzVBclwvZEVuOHhiR244c2ppbXVXcDFKcUlyV1FpM01UQ3RcL3h1UkF3MHJ5czVuXC9kMFl2ZlZUbmNHVlVWZVwvbXdyU2ZnPT0iLCJtYWMiOiI4ODhhZWEzZjNiOTFjYWFjNGYxZmZhODQwNDA3N2QyNzJhNWQ3Njc4ZGJlNGVkZmQzMzhiMGZjYzMxMjQwNGY1In0%3D'
            ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        return $response;
    }

    public function getDeviceList(Request $request)
    {
        // echo 'printing data of the curl request';
        $curl = curl_init();

        // https://cc.gizmosmart.io/iot/1.6/public/getDeviceInfo?business_id=257&type=nvr&status=offline
        curl_setopt_array($curl, array(
            CURLOPT_URL => 'http://cc.gizmosmart.io/iot/1.6/public/getDeviceInfo?business_id=' . session()->get('business_id') . '&type=' . $request->typeValue . '&status=' . $request->statusValue,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HTTPHEADER => array(
                'Cookie: JSESSIONID=eyJpdiI6IlVsYTJHdE94ZlppeVNLeVBVM00zWUE9PSIsInZhbHVlIjoiNEhnV1RtUjBzQ2J5eFAxZEs3eFlqdmxKVVlyeGs1N0diOE5QbnQxQ3kxTDJjb3Z3XC8xbGhndGNlMUg4XC9Hc3VkalIzcGlMODBrTXhXeDN4YnFiSjVNQT09IiwibWFjIjoiNzZlOGFjMjQ0MTI0YTBlN2UxYzgxNjBmZDQ3OTM4ZWNlNjMzMjNjOTBhMTI3NzVmOTMwZDJiYmViYzk5ZDgwYiJ9'
            ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        // session()->put($request->typeValue, $response);
        return  $response;
    }

    public function getSensorData()
    {
        $siteName = 'icici';
        if(session()->get('business_id') == 193){
            $siteName = 'fincare';
        }
        else if(session()->get('business_id') == 257){
            $siteName = 'icici';
        }
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://crm.igzy.com/get_faulty_sensors.php?account_name='.$siteName,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json'
            ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        return $response;
    }

    public function getChartData()
    {
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'http://cc.gizmosmart.io/iot/1.6/public/getSiteHealthStatus?business_id=' . session()->get('business_id'),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HTTPHEADER => array(
                'Cookie: JSESSIONID=eyJpdiI6Iks3d05yam1mT3FZcmdxZ0N3UzZYa2c9PSIsInZhbHVlIjoiZ05JcmpOWXd4dVRNSWlCdGt4VzBIYVZQclE4blRUcVBhZjlXWXVDMElkU0ZrYkFWKzByWUNtdGxZcSt0aXNcL2VpQmxDVlh1cjhcL3Y0bzl2ZThYRnEzQT09IiwibWFjIjoiYWRjYWYyNmFhOTdjNmJjZTRjM2VjMmUzNTI0YjkxYjM5M2E1ZWExMTU1Y2U3MmFhYWQwODdmNjVmNGVkY2ZhMyJ9'
            ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        return $response;
    }

    public function getTableData(Request $request)
    {
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'http://cc.gizmosmart.io/iot/1.6/public/getDeviceInfo?business_id=' . session()->get('business_id') . '&type=' . $request->type . '&status=' . $request->status,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HTTPHEADER => array(
                'Cookie: JSESSIONID=eyJpdiI6ImRNK2JYR0NrcG5DdWJoeWdDbXdnclE9PSIsInZhbHVlIjoiUzVEeTBNa0RSd0tKQkd5R3ZZWmNPUFo3UlBQM3M2WmFzQytKTG5GaVpOdmRkZjRDclBIRmJCSXpvOFhGN2lWY0pIck9qbUIwQ2ZvZnkwZnB3cjV5T1E9PSIsIm1hYyI6IjQyMjU5ZTJkNGNiM2MxNzQxNDllZTQzMmVmZTdlZTkzNzNhYzBiZjQ3ZDAwZmQ4NDkxZTI2MjIyYTdlMmE5OGUifQ%3D%3D'
            ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        return $response;
    }
}
