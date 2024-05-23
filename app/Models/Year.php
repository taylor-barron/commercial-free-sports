<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Year extends Model
{
    use HasFactory;

    public function weeks()
    {
        return $this->hasMany(Week::class);
    }

    public function games()
    {
        return $this->hasManyThrough(
            Game::class,
            Week::class,
            'year_id', // Foreign key on Week table...
            'time_slot_id', // Foreign key on Game table...
            'id', // Local key on Year table...
            'id' // Local key on Week table...
        );
    }
}
