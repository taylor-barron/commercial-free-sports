<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('games', function (Blueprint $table) {

            $table->integer('quarter')->default(1);
            $table->dateTime('start_time')->nullable();
            $table->string('home_color')->nullable();
            $table->string('away_color')->nullable();
            $table->string('home_team')->nullable();
            $table->string('away_team')->nullable();
            $table->integer('score_score')->nullable();
            $table->integer('importance_score')->nullable();
            $table->integer('explosiveness_score')->nullable();
            $table->integer('talent_score')->nullable();
            $table->integer('penalty_score')->nullable();
        });

        Schema::table('time_slots', function (Blueprint $table) {
        });

        Schema::table('weeks', function (Blueprint $table) {
        });

        Schema::table('years', function (Blueprint $table) {
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('games', function (Blueprint $table) {
            $table->dropColumn([
                'quarter', 
                'start_time', 
                'home_color', 
                'away_color', 
                'home_team', 
                'away_team', 
                'score_score', 
                'importance_score', 
                'explosiveness_score', 
                'talent_score', 
                'penalty_score'
            ]);
        });
    }
};
