<?php

namespace App\Http\Controllers\Games;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Week;
use App\Models\Game;
use App\Models\TimeSlot;
use App\Models\Year;
use App\Http\Controllers\Controller;
use Carbon;


class PostWeekUpdateController extends Controller
{
    public function update(Request $request)
    {
        try {

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
                $game->save();
            }

            return 200;

        } catch (\Exception $e) {

            return 500;
        }
    }
}
