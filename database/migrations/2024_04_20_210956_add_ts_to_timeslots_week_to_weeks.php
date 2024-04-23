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
        // Schema::table('weeks', function (Blueprint $table) {
        //     $table->string('week')->after('id');
        // });

        Schema::table('time_slots', function (Blueprint $table) {
            $table->string('timeslot')->after('id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Schema::table('weeks', function (Blueprint $table) {
        //     $table->dropColumn('week');
        // });

        Schema::table('time_slots', function (Blueprint $table) {
            $table->dropColumn('timeslot');
        });
    }
};
