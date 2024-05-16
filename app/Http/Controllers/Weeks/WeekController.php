<?php

namespace App\Http\Controllers\Weeks;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\Game;
use App\Models\Week;
use App\Models\TimeSlot;
use App\Models\Year;
use App\Models\User;
use App\Models\Profile;
use App\Http\Controllers\Games\GameService;
use Illuminate\Support\Facades\Auth;

class WeekController extends Controller
{
    public function allWeeks(): \Inertia\Response
    {
        $years = Year::orderBy('year', 'desc')->get();
        $user = Auth::user();

        $years_info = [];
        foreach ($years as $year) {

            $weeks = Week::where('year_id', $year->id)->get();
            $weeks_info = [];
            foreach ($weeks as $week) {
                $weeks_info[] = [
                    
                    'id' => $week->id,
                    'week' => $week->week,
                    // 'link' => route('week', $week), fix this
                ];
            }
            $years_info[] = [

                'weeks' => $weeks_info,
                'year' => $year->year,
                'id' => $year->id,
            ];
        }

        return Inertia::render('Weeks/AllWeeks', [
            'user' => $user ? [

                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'edit_url' => route('profile.edit', $user),
            ] : null,
            'years' => $years_info,
        ]);
    }

    public function bestOfs(): \Inertia\Response
    {
        $year = Year::where('year', Year::max('year'))->first();
        $latest_week = Week::where('year_id', /*$year->id*/2)->where('week', Week::max('week'))->first();
        $best_ofs_week = Week::where('year_id', /*$year->id*/2)->where('week', $latest_week->week - 1)->first();

        return $this->Week($year, $best_ofs_week);
    }
}
