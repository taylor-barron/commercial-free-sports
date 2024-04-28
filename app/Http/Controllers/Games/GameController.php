<?php

namespace App\Http\Controllers\Games;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;

class GameController extends Controller
{
    public function currentWeek()
    {
        return Inertia::render('Games/CurrentWeek');
    }
}
