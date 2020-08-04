<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Bookable;
use Faker\Generator as Faker;
use Illuminate\Support\Arr;

$bookable = [
    'Luxury Suites',
    'Galaxy Villas',
    'Premium Villas',
    'Pristine Condos',
    'First Class Villas',
    'Continental Villas',
];

$factory->define(Bookable::class, function (Faker $faker) use ($bookable) {
    return [
        'title' => Arr::random($bookable) . ' in ' . $faker->city,
        'description' => $faker->text(),
        'price' => random_int(50, 500),
    ];
});
