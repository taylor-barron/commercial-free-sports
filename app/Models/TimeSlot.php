<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimeSlot extends Model
{
    use HasFactory;

    public function getWeek()
    {
        return $this->belongsTo(Week::class);
    }

    public function games()
    {
        return $this->hasMany(Game::class);
    }
}
