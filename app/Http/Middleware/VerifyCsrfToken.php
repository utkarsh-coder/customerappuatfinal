<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        //
        "customer",
        "verify",
        "send-mail",
        "verifyotp",
        "update",
        "drilldown",
        "sitelist",
        "getDeviceList",
        "getTableData",
        "deviceList"
    ];
}
