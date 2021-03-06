<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('bookables', 'Api\BookableController')->only(['index', 'show']);
Route::get('bookables/{bookable}/availability', 'Api\BookableAvailabilityController')->name('bookables.availability');
Route::get('bookables/{bookable}/reviews', 'Api\BookableReviewController')->name('bookables.reviews');
Route::get('bookables/{bookable}/price', 'Api\BookablePriceController')->name('bookables.price');
Route::apiResource('reviews', 'Api\ReviewController')->only(['show', 'store']);
Route::get('/booking-by-review/{reviewKey}', 'Api\BookingByReviewController')->name('booking.by-review');
