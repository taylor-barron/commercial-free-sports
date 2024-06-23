<?php

namespace App\Http\Controllers\bestOfs;

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

class BestOfsController extends Controller
{
    public function allBestOfs(): \Inertia\Response
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
                    'link' => route('best-of.show', [ 'year' => $year->year, 'week' => $week->week ]),
                ];
            }
            
            $weeks_info = collect($weeks_info)->sortBy('week')->values()->all();
            foreach ($weeks_info as $key => $week_info) {
                if ($week_info['week'] == 16) {
                    $weeks_info[$key]['week'] = 'BOWLS';
                }
            }

            $weeks_info[] = [

                'id' => 0,
                'week' => 'All',
                'link' => route('best-of.show', [ 'year' => $year->year ]),
            ];

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
            'head' => 'Best Ofs'
        ]);
    }

    public function show($year, $week = null): \Inertia\Response
    {
        $game_controller = new GameController();
        $user = Auth::user();
        $games['version'] = 'default';

        $year_object = Year::where('year', $year)->first();

        if ($week) {

            $week_object = Week::where('year_id', $year_object->id)->where('week', $week)->first();
            $games = $week_object->games;

        } else {

            $week_object = null;
            $games = $year_object->games;
        }

        $top_overall_games = [];
        $top_score_score_games = [];
        $top_importance_score_games = [];
        $top_explosiveness_score_games = [];
        $top_talent_score_games = [];
        $top_penalty_score_games = [];
        foreach ($games as $game) {

            $overall_score = $game_controller->calculateDefaultOverallScore($game);
            $game_info = $game_controller->getDefaultGameInfo($game, [], $overall_score);

            if (count($top_overall_games) < 5) {
                $top_overall_games[] = $game_info;
            } else {
                $top_overall_games = $game_controller->sortGames($top_overall_games);
                if ($game_info['overall_score'] > $top_overall_games[4]['overall_score']) {
                    $top_overall_games[4] = $game_info;
                }
            }

            if (count($top_score_score_games) < 5) {
                $top_score_score_games[] = $game_info;
            } else {
                $top_score_score_games = $game_controller->sortGames($top_score_score_games, 'score_score');
                if ($game_info['score_score'] > $top_score_score_games[4]['score_score']) {
                    $top_score_score_games[4] = $game_info;
                }
            }

            if (count($top_importance_score_games) < 5) {
                $top_importance_score_games[] = $game_info;
            } else {
                $top_importance_score_games = $game_controller->sortGames($top_importance_score_games, 'importance_score');
                if ($game_info['importance_score'] > $top_importance_score_games[4]['importance_score']) {
                    $top_importance_score_games[4] = $game_info;
                }
            }

            if (count($top_explosiveness_score_games) < 5) {
                $top_explosiveness_score_games[] = $game_info;
            } else {
                $top_explosiveness_score_games = $game_controller->sortGames($top_explosiveness_score_games, 'explosiveness_score');
                if ($game_info['explosiveness_score'] > $top_explosiveness_score_games[4]['explosiveness_score']) {
                    $top_explosiveness_score_games[4] = $game_info;
                }
            }

            if (count($top_talent_score_games) < 5) {
                $top_talent_score_games[] = $game_info;
            } else {
                $top_talent_score_games = $game_controller->sortGames($top_talent_score_games, 'talent_score');
                if ($game_info['talent_score'] > $top_talent_score_games[4]['talent_score']) {
                    $top_talent_score_games[4] = $game_info;
                }
            }

            if (count($top_penalty_score_games) < 5) {
                $top_penalty_score_games[] = $game_info;
            } else {
                $top_penalty_score_games = $game_controller->sortGames($top_penalty_score_games, 'penalty_score');
                if ($game_info['penalty_score'] > $top_penalty_score_games[4]['penalty_score']) {
                    $top_penalty_score_games[4] = $game_info;
                }
            }

        }

        if ($week_object) {

            $week = $week_object->week;
            $date_string = 'Week ' . (string) $week_object->week .', '. (string) $year_object->year;
            $head = "Best of $date_string";
            $games['week'] = $week_object->week;

        } else {

            $week = null;
            $date_string = 'All Weeks, '. (string) $year_object->year;
            $head_string = (string) $year_object->year;
            $head = "Best of $head_string";
            $games['week'] = null;
        }
        
        $games = [];
        $games['version'] = 'default';

        $top_overall_games = $game_controller->sortGames($top_overall_games);
        $games['time_slots'][] = [

            'id' => 0,
            'time_slot' => 'Highest Overall Score',
            'date' => $date_string,
            'games' => [
                'default' =>$top_overall_games
            ],
        ];

        $top_score_score_games = $game_controller->sortGames($top_score_score_games, 'score_score');
        $games['time_slots'][] = [

            'id' => 1,
            'time_slot' => 'Highest Score Score',
            'date' => $date_string,
            'games' => [
                'default' => $top_score_score_games
            ],
        ];

        $top_importance_score_games = $game_controller->sortGames($top_importance_score_games, 'importance_score');
        $games['time_slots'][] = [

            'id' => 2,
            'time_slot' => 'Highest Game Importance Score',
            'date' => $date_string,
            'games' => [
                'default' => $top_importance_score_games
            ],
        ];

        $top_explosiveness_score_games = $game_controller->sortGames($top_explosiveness_score_games, 'explosiveness_score');
        $games['time_slots'][] = [

            'id' => 3,
            'time_slot' => 'Highest Explosiveness Score',
            'date' => $date_string,
            'games' => [
                'default' => $top_explosiveness_score_games,
            ],
        ];

        $top_talent_score_games = $game_controller->sortGames($top_talent_score_games, 'talent_score');
        $games['time_slots'][] = [

            'id' => 4,
            'time_slot' => 'Highest Talent Score',
            'date' => $date_string,
            'games' => [
                'default' => $top_talent_score_games
            ],
        ];

        $top_penalty_score_games = $game_controller->sortGames($top_penalty_score_games, 'penalty_score');
        $games['time_slots'][] = [

            'id' => 5,
            'time_slot' => 'Highest Penalty Score',
            'date' => $date_string,
            'games' => [
                'default' => $top_penalty_score_games
            ],
        ];

        return Inertia::render('BestOfs/BestOfs', [
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

        return $this->show($year_object->year, $week_object->week);
    }
}
