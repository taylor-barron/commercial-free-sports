<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class WeekController extends Controller
{
    public function liveUpdate(Request $request)
    {
        $user = User::first();
        if ($user) {
            $user->name = $request->homeTeam;
            $user->save();
        }

        return response()->json(['message' => 'User updated!']);
    }
}
