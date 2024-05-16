<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Week extends Model
{
    use HasFactory;

    public function getYear()
    {
        return $this->belongsTo(Year::class);
    }

    public function timeSlots()
    {
        return $this->hasMany(TimeSlot::class);
    }

    public function games()
    {
        return $this->hasManyThrough(Game::class, TimeSlot::class);
    }
}
