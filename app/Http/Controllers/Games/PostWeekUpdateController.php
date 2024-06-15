<?php

namespace App\Http\Controllers\Games;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Week;
use App\Models\Game;
use App\Models\TimeSlot;
use App\Models\Year;
use App\Models\Team;
use App\Http\Controllers\Controller;
use Carbon;


class PostWeekUpdateController extends Controller
{
    public function update(Request $request)
    {
        try {

            // need to make sure that bowl games that go over to the new year stay in the correct year

            $request_year = $request->year;
            $year = Year::where('year', $request_year)->first();
            if (!$year) {

                $year = new Year();
                $year->year = $request->year;
                $year->save();
            }

            $request_week = $request->week;
            $week = $year->weeks()->where('week', $request_week)->first();
            if (!$week) {

                $week = new Week();
                $week->week = $request->week;
                $week->year_id = $year->id;
                $week->save();
            }

            $date = Carbon\Carbon::createFromDate($request->year, $request->month, $request->day);
            $time_slot = $week->timeSlots()
            ->where('timeslot', $request->timeSlot)
            ->whereDate('date', $date->toDateString())
            ->first();
            if (!$time_slot) {

                $time_slot = new TimeSlot();
                $time_slot->timeslot = $request->timeSlot;
                $time_slot->date = $date;
                $time_slot->week_id = $week->id;
                $time_slot->save();
            }

            $game = $time_slot->games()
                ->where('home_team', $request->homeTeam)
                ->where('away_team', $request->awayTeam)
                ->first();
            if (!$game) {

                $game = new Game();

                $hours = floor($request->startTime);
                $minutes = ($request->startTime - $hours) * 60;

                $game->start_time = Carbon\Carbon::today()
                    ->setTimezone('EST')
                    ->setTime($hours, $minutes)
                    ->toDateTimeString();

                $game->home_team = $request->homeTeam;
                $game->home_color = $request->homeColor;
                $game->away_team = $request->awayTeam;
                $game->away_color = $request->awayColor;
                $game->time_slot_id = $time_slot->id;
                $game->quarter = $request->quarter;
                $game->score_score = $request->scoreScore;
                $game->importance_score = $request->importanceScore;
                $game->explosiveness_score = $request->explosivenessScore;
                $game->talent_score = $request->talentScore;
                $game->penalty_score = $request->penaltyScore;
            }

            $home_team = Team::where('name', $request->homeTeam)->first();
            if (!$home_team) {

                $home_team = new Team();
                $home_team->name = $request->homeTeam ? $request->homeTeam : 'Division 2 Team';
                $home_team->color = $request->homeColor ? $request->homeColor : '#010101';
                $home_team->save();
            }

            $away_team = Team::where('name', $request->awayTeam)->first();
            if (!$away_team) {

                $away_team = new Team();
                $away_team->name = $request->awayTeam ? $request->awayTeam : 'Division 2 Team';
                $away_team->color = $request->awayColor ? $request->awayColor : '#010101';
                $away_team->save();
            }

            $game->save();

            return [
                
                'code' => 200,
                'game_id' => $game->id,
                'time_slot_id' => $time_slot->id,
                'week_id' => $week->id,
                'year_id' => $year->id
            ];

        } catch (\Exception $e) {

            return [
                
                'code' => 500,
                'error' => $e->getMessage()
            ];
        }
    }
}
