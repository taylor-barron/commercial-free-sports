<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\TimeSlot;
use App\Models\Team;

class Game extends Model
{
    use HasFactory;

    public function getTimeSlot()
    {
        return $this->belongsTo(TimeSlot::class);
    }

    public function teams()
    {
        return $this->belongsToMany(Team::class);
    }
}
