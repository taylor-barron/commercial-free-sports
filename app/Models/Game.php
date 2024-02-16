<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\TimeSlot;

class Game extends Model
{
    use HasFactory;

    public function getTimeSlot()
    {
        return $this->belongsTo(TimeSlot::class);
    }
}
