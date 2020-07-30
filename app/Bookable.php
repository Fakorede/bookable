<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bookable extends Model
{
    protected $table = 'bookables';

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
