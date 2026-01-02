<?php

namespace App\Http\Controllers\Games;

use App\Http\Controllers\Controller;

class GameController extends Controller
{
    public function getFavoriteTeams($profile)
    {
        $favorite_teams = [];
        $favorite_team_objects = $profile->teams()->get();
        foreach($favorite_team_objects as $team) {
            $favorite_teams[] = [
                'id' => $team->id,
                'name' => $team->name,
            ];
        }

        return $favorite_teams;
    }

    public function getCustomWeights($profile)
    {
        $weights = [];
        if ($profile->score_score) {
            $weights = [
                'custom_score_score_weight' => $profile->score_score,
                'custom_importance_score_weight' => $profile->importance_score,
                'custom_explosiveness_score_weight' => $profile->explosiveness_score,
                'custom_talent_score_weight' => $profile->talent_score,
                'custom_penalty_score_weight' => $profile->penalty_score,
            ];
        } else {
            $weights = [
                'custom_score_score_weight' => env('SCORE_SCORE_WEIGHT') ? env('SCORE_SCORE_WEIGHT') * 100 : 35,
                'custom_importance_score_weight' => env('IMPORTANCE_SCORE_WEIGHT') ? env('IMPORTANCE_SCORE_WEIGHT') * 100 : 25,
                'custom_explosiveness_score_weight' => env('EXPLOSIVENESS_SCORE_WEIGHT') ? env('EXPLOSIVENESS_SCORE_WEIGHT') * 100 : 25,
                'custom_talent_score_weight' => env('TALENT_SCORE_WEIGHT') ? env('TALENT_SCORE_WEIGHT') * 100 : 10,
                'custom_penalty_score_weight' => env('PENALTY_SCORE_WEIGHT') ? env('PENALTY_SCORE_WEIGHT') * 100 : 5,
            ];
        }

        return $weights;
    }

    public function getTimeSlotsInfo($time_slot)
    {
        $time_slot = [
            'id' => $time_slot->id,
            'time_slot' => $time_slot->timeslot,
            'date' => date('F d, Y', strtotime($time_slot->date)),
            'games' => [],
        ];

        return $time_slot;
    }

    public function calculateDefaultOverallScore($game)
    {
        $default_overall_score = round(
            (env('SCORE_SCORE_WEIGHT') ? env('SCORE_SCORE_WEIGHT') * $game->score_score : .35 * $game->score_score) +
            (env('IMPORTANCE_SCORE_WEIGHT') ? env('IMPORTANCE_SCORE_WEIGHT') * $game->importance_score : .25 * $game->importance_score) +
            (env('EXPLOSIVENESS_SCORE_WEIGHT') ? env('EXPLOSIVENESS_SCORE_WEIGHT') * $game->explosiveness_score : .25 * $game->explosiveness_score) +
            (env('TALENT_SCORE_WEIGHT') ? env('TALENT_SCORE_WEIGHT') * $game->talent_score : .10 * $game->talent_score) +
            (env('PENALTY_SCORE_WEIGHT') ? env('PENALTY_SCORE_WEIGHT') * $game->penalty_score : .05 * $game->penalty_score)
        );

        return $default_overall_score;
    }

    public function calculateCustomOverallScore($game, $custom_weights)
    {
        $custom_overall_score = round(
            (($custom_weights['custom_score_score_weight'] * $game->score_score) +
            ($custom_weights['custom_importance_score_weight'] * $game->importance_score) +
            ($custom_weights['custom_explosiveness_score_weight'] * $game->explosiveness_score) +
            ($custom_weights['custom_talent_score_weight'] * $game->talent_score) + 
            ($custom_weights['custom_penalty_score_weight'] * $game->penalty_score))
            / 100
        );

        return $custom_overall_score;
    }

    public function getCustomGameInfo($game, $favorite_teams, $custom_overall_score)
    {
        $away_team = $game->away_team;
        $home_team = $game->home_team;
        $game_info = [
            'id' => $game->id,
            'favorite' => false,
            'quarter' => $game->quarter,
            'start_time' => $game->start_time,
            'home_color' => $game->home_color,
            'away_color' => $game->away_color,
            'home_team' => $home_team,
            'away_team' => $away_team,
            'score_score' => $game->score_score,
            'importance_score' => $game->importance_score,
            'explosiveness_score' => $game->explosiveness_score,
            'talent_score' => $game->talent_score,
            'penalty_score' => $game->penalty_score,
            'overall_score' => $custom_overall_score,
        ];

        foreach ($favorite_teams as $team) {
            if ($team['name'] == $home_team) {
                $game_info['favorite'] = true;
                $game_info['favorite_color'] = $game['home_color'];

            } elseif ($team['name'] == $away_team) {
                $game_info['favorite'] = true;
                $game_info['favorite_color'] = $game['away_color'];
            }
        }

        return $game_info;
    }

    public function getDefaultGameInfo($game, $favorite_teams, $default_overall_score)
    {
        $away_team = $game->away_team;
        $home_team = $game->home_team;
        $game_info = [
            'id' => $game->id,
            'favorite' => false,
            'quarter' => $game->quarter,
            'start_time' => $game->start_time,
            'home_color' => $game->home_color,
            'away_color' => $game->away_color,
            'home_team' => $home_team,
            'away_team' => $away_team,
            'score_score' => $game->score_score,
            'importance_score' => $game->importance_score,
            'explosiveness_score' => $game->explosiveness_score,
            'talent_score' => $game->talent_score,
            'penalty_score' => $game->penalty_score,
            'overall_score' => $default_overall_score,
        ];

        foreach ($favorite_teams as $team) {
            if ($team['name'] == $home_team || $team['name'] == $away_team) {
                $game_info['favorite'] = true;
                break;
            }
        }

        return $game_info;
    }

    public function sortGames($games, $key = 'overall_score')
    {
        usort($games, function ($a, $b) use ($key) {
            return $b[$key] <=> $a[$key];
        });
        
        $favorite_games = [];
        $non_favorite_games = [];
        foreach ($games as $game) {
            if ($game['favorite']) {
                $favorite_games[] = $game;
            } else {
                $non_favorite_games[] = $game;
            }
        }
        $games = array_merge($favorite_games, $non_favorite_games);

        return $games;
    }
}
