<?php

namespace App\Http\Controllers\Articles;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\User;

class ArticleController extends Controller
{
    public function howItWorks()
    {
        return Inertia::render('Articles/HowItWorks', [
            'user' => User::all()->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'edit_url' => route('profile.edit', $user),
                ];
            }),
            'title' => 'Commercial Free Football',
            'create_url' => route('users.create'),
        ]);
    }
}
