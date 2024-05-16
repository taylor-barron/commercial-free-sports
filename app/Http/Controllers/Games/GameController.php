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
use App\Models\Profile;
use App\Http\Controllers\Games\GameService;
use Illuminate\Support\Facades\Auth;

class GameController extends Controller
{
    public function Week($year, $week): \Inertia\Response
    {
        $game_service = new GameService();
        $user = Auth::user();

        $favorite_teams = [];
        $custom_weights = [];
        if ($user) {

            $profile = $user->profile;
            $favorite_teams = $game_service->getFavoriteTeams($profile);
            $custom_weights = $game_service->getCustomWeights($profile);
            $games['version'] = 'custom';

        } else {
            $games['version'] = 'default';
        }

        $year = Year::where('year', Year::max('year'))->first();

        $latest_week = Week::where('year_id', /*$year->id*/2)->where('week', Week::max('week'))->first();
        $games['week'] = $latest_week->week;

        $time_slots = TimeSlot::where('week_id', $latest_week->id)->get();
        foreach ($time_slots as $time_slot) {

            $games['time_slots'][] = $game_service->getTimeSlotsInfo($time_slot);

            $games_for_time_slot_objects = Game::where('time_slot_id', $time_slot->id)->get();
            $games_last_key = 0;
            foreach ($games_for_time_slot_objects as $game) {

                $time_slot_last_key = array_key_last($games['time_slots']);
                $default_overall_score = $game_service->calculateDefaultOverallScore($game);

                if ($user) {

                    $custom_overall_score = null;
                    $custom_overall_score = $game_service->calculateCustomOverallScore($game, $custom_weights);
                    $games['time_slots'][$time_slot_last_key]['games']['custom'][$games_last_key] = $game_service->getCustomGameInfo($game, $favorite_teams, $custom_overall_score);
                }
                $games['time_slots'][$time_slot_last_key]['games']['default'][$games_last_key] = $game_service->getDefaultGameInfo($game, $favorite_teams, $default_overall_score);

                $games_last_key++;
            }

            if (isset($games['time_slots'][$time_slot_last_key]['games']['custom'])) {
                $games['time_slots'][$time_slot_last_key]['games']['custom'] = $game_service->sortGames($games['time_slots'][$time_slot_last_key]['games']['custom']);
            }
            $games['time_slots'][$time_slot_last_key]['games']['default'] = $game_service->sortGames($games['time_slots'][$time_slot_last_key]['games']['default']);
        }

        return Inertia::render('Games/CurrentWeek', [
            'user' => $user ? [

                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'edit_url' => route('profile.edit', $user),
            ] : null,
            'games' => $games,
        ]);
    }

    public function nextWeek(): \Inertia\Response
    {
        $year = Year::where('year', Year::max('year'))->first();
        $latest_week = Week::where('year_id', /*$year->id*/2)->where('week', Week::max('week'))->first();
        $next_week = Week::where('year_id', /*$year->id*/2)->where('week', $latest_week->week + 1)->first();

        return $this->Week($year, $next_week);
    }

    public function lastWeek(): \Inertia\Response
    {
        $year = Year::where('year', Year::max('year'))->first();
        $latest_week = Week::where('year_id', /*$year->id*/2)->where('week', Week::max('week'))->first();
        $last_week = Week::where('year_id', /*$year->id*/2)->where('week', $latest_week->week - 1)->first();

        return $this->Week($year, $last_week);
    }
}
