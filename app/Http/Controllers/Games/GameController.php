<?php

namespace App\Http\Controllers\Games;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\Game;
use App\Models\Week;
use App\Models\TimeSlot;
use App\Models\Year;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class GameController extends Controller
{
    public function currentWeek()
    {
        $user = Auth::user();

        $year = Year::where('year', Year::max('year'))->first();

        $latest_week = Week::where('year_id', $year->id)->where('week', Week::max('week'))->first();
        $games['week'] = $latest_week->week;

        $time_slots = TimeSlot::where('week_id', $latest_week->id)->get();
        foreach ($time_slots as $time_slot) {

            $games['time_slots'][] = [

                'id' => $time_slot->id,
                'time_slot' => $time_slot->timeslot,
                'date' => date('F d, Y', strtotime($time_slot->date)),
                'games' => [],
            ];

            $gamesForTimeSlot = Game::where('time_slot_id', $time_slot->id)->get();
            foreach ($gamesForTimeSlot as $game) {

                $last_key = array_key_last($games['time_slots']);
                // if user and user has custom sliders need to also include the user's sliders
                $overall_score = round(
                    (env('SCORE_SCORE_WEIGHT') * $game->score_score) +
                    (env('IMPORTANCE_SCORE_WEIGHT') * $game->importance_score) +
                    (env('EXPLOSIVENESS_SCORE_WEIGHT') * $game->explosiveness_score) +
                    (env('TALENT_SCORE_WEIGHT') * $game->talent_score) + 
                    (env('PENALTY_SCORE_WEIGHT') * $game->penalty_score)
                );

                $games['time_slots'][$last_key]['games'][] = [

                    'id' => $game->id,
                    'quarter' => $game->quarter,
                    'start_time' => $game->start_time,
                    'home_color' => $game->home_color,
                    'away_color' => $game->away_color,
                    'home_team' => $game->home_team,
                    'away_team' => $game->away_team,
                    'score_score' => $game->score_score,
                    'importance_score' => $game->importance_score,
                    'explosiveness_score' => $game->explosiveness_score,
                    'talent_score' => $game->talent_score,
                    'penalty_score' => $game->penalty_score,
                    'overall_score' => $overall_score,
                ];
            }

            usort($games['time_slots'][$last_key]['games'], function ($a, $b) {
                return $b['overall_score'] <=> $a['overall_score'];
            });
        }

        if ($user) {
            return Inertia::render('Games/CurrentWeek', [

                'user' => User::all()->map(function ($user) {
                    return [

                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'edit_url' => route('profile.edit', $user),
                    ];
                }),

                'games' => $games,
            ]);
        } else {

            return Inertia::render('Games/CurrentWeek', [
                'games' => $games,
            ]);
        }
    }
}
