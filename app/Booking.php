<?php

namespace App;

use App\Http\Resources\BookableIndexResource;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['from', 'to'];
    
    public function bookable() 
    {
        return $this->belongsTo(Bookable::class);
    }
}
