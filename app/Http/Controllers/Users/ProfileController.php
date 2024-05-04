<?php

namespace App\Http\Controllers\Users;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Controllers\Controller;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $profile = $request->user()->profile;
        
        $profile_info = [

            'score_score' => $profile->score_score !== null ? $profile->score_score : env('SCORE_SCORE_WEIGHT') * 100,
            'importance_score' => $profile->importance_score !== null ? $profile->importance_score : env('IMPORTANCE_SCORE_WEIGHT') * 100,
            'explosiveness_score' => $profile->explosiveness_score !== null ? $profile->explosiveness_score : env('EXPLOSIVENESS_SCORE_WEIGHT') * 100,
            'talent_score' => $profile->talent_score !== null ? $profile->talent_score : env('TALENT_SCORE_WEIGHT') * 100,
            'penalty_score' => $profile->penalty_score !== null ? $profile->penalty_score : env('PENALTY_SCORE_WEIGHT') * 100,
            'favorite_teams' => $profile->favorite_teams !== null ? $profile->favorite_teams : '',
        ];
        
        $teams = [];

        return Inertia::render('Profile/Edit', [

            'profile' => $profile_info,
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    // public function editFavoriteTeams(Request $request): Response
    // {
    //     $profile = $request->user()->profile;
    //     $favorite_teams = $profile->favorite_teams;

    //     return Inertia::render('Profile/EditFavoriteTeams', [

    //         'favorite_teams' => $favorite_teams,
    //         'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
    //         'status' => session('status'),
    //     ]);
    // }

    public function updateFavoriteTeams(Request $request): RedirectResponse
    {
        $profile = $request->user()->profile;
        $profile->favorite_teams = $request->favorite_teams;
        $profile->save();

        return back();
    }

    /**
     * Update the user's profile sliders.
     */
    public function updateSliders(Request $request): RedirectResponse
    {
        $profile = $request->user()->profile;
        $profile->score_score = $request->score_score;
        $profile->importance_score = $request->importance_score;
        $profile->explosiveness_score = $request->explosiveness_score;
        $profile->talent_score = $request->talent_score;
        $profile->penalty_score = $request->penalty_score;
        $profile->save();

        return back();
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
