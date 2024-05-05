<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Profile;
use App\Models\Game;

class Team extends Model
{
    use HasFactory;

    public function profiles()
    {
        return $this->belongsToMany(Profile::class);
    }

    public function games()
    {
        return $this->belongsToMany(Game::class);
    }
}
