<?php

use Illuminate\Support\Facades\Route;

// fallback route - match routes not prefixed with api
Route::get('/{any?}', function () {
    return view('welcome');
})->where('any', '^(?!api\/)[\/\w\.-]*');
