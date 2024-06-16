<?php

namespace App\Http\Controllers\Weeks;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Games\GameController;
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
                    'link' => route('week.show', [ 'year' => $year->year, 'week' => $week->week ]),
                ];
            }
            
            $weeks_info = collect($weeks_info)->sortBy('week')->values()->all();
            foreach ($weeks_info as $key => $week_info) {
                if ($week_info['week'] == 16) {
                    $weeks_info[$key]['week'] = 'BOWLS';
                }
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
            'head' => 'All Weeks'
        ]);
    }

    public function show($year, $week, $head = null): \Inertia\Response
    {
        $game_controller = new GameController();
        $user = Auth::user();

        $favorite_teams = [];
        $custom_weights = [];
        if ($user) {

            $profile = $user->profile;
            $favorite_teams = $game_controller->getFavoriteTeams($profile);
            $custom_weights = $game_controller->getCustomWeights($profile);
            $games['version'] = 'custom';

        } else {
            $games['version'] = 'default';
        }

        $year_object = Year::where('year', $year)->first();

        $week_object = Week::where('year_id', $year_object->id)->where('week', $week)->first();
        $games['week'] = $week_object->week;

        $time_slots = TimeSlot::where('week_id', $week_object->id)->get();
        foreach ($time_slots as $time_slot) {

            $games['time_slots'][] = $game_controller->getTimeSlotsInfo($time_slot);

            $games_for_time_slot_objects = Game::where('time_slot_id', $time_slot->id)->get();
            $games_last_key = 0;
            foreach ($games_for_time_slot_objects as $game) {

                $time_slot_last_key = array_key_last($games['time_slots']);
                $default_overall_score = $game_controller->calculateDefaultOverallScore($game);

                if ($user) {

                    $custom_overall_score = null;
                    $custom_overall_score = $game_controller->calculateCustomOverallScore($game, $custom_weights);
                    $games['time_slots'][$time_slot_last_key]['games']['custom'][$games_last_key] = $game_controller->getCustomGameInfo($game, $favorite_teams, $custom_overall_score);
                }
                $games['time_slots'][$time_slot_last_key]['games']['default'][$games_last_key] = $game_controller->getDefaultGameInfo($game, $favorite_teams, $default_overall_score);

                $games_last_key++;
            }

            if (isset($games['time_slots'][$time_slot_last_key]['games']['custom'])) {
                $games['time_slots'][$time_slot_last_key]['games']['custom'] = $game_controller->sortGames($games['time_slots'][$time_slot_last_key]['games']['custom']);
            }
            $games['time_slots'][$time_slot_last_key]['games']['default'] = $game_controller->sortGames($games['time_slots'][$time_slot_last_key]['games']['default']);
        }

        if (!$head) {

            $week_str = $games['week'];
            $year_str = $year_object->year;
            $head = "Week $week_str, $year_str";
        }

        return Inertia::render('Games/CurrentWeek', [
            'user' => $user ? [

                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'edit_url' => route('profile.edit', $user),
            ] : null,
            'games' => $games,
            'head' => $head
        ]);
    }

    public function nextWeek()/*: \Inertia\Response*/
    {
        return 'this isn\'t done yet';
    }

    public function thisWeek(): \Inertia\Response
    {
        $year_object = Year::where('year', Year::max('year'))->first();
        $week_object = Week::where('year_id', $year_object->id)
            ->whereHas('games', function ($query) {
                $query->whereNotNull('score_score');
            })
            ->orderBy('week', 'desc')
            ->first();

        if (!$week_object) {

            $year_object = Year::where('year', Year::max('year') - 1)->first();
            $week_object = Week::where('year_id', $year_object->id)
            ->whereHas('games', function ($query) {
                $query->whereNotNull('score_score');
            })
            ->orderBy('week', 'desc')
            ->first();
        }

        return $this->show($year_object->year, $week_object->week, 'This Week');
    }
}
