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
            $table->foreignId('time_slot_id')->constrained();
        });
    
        Schema::table('time_slots', function (Blueprint $table) {
            $table->foreignId('week_id')->constrained();
        });
    
        Schema::table('weeks', function (Blueprint $table) {
            $table->foreignId('year_id')->constrained();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
