<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class UserController extends Controller
{
    //
    public function welcome()
    {
        // $name = $request->input('name');
        // $email = $request->input('email');
        // $phone = $request->input('phone');

        // return view('Users/welcome', ['name' => $name, 'email' => $email, 'phone' => $phone]);
        return Inertia::render('Users/Welcome', [
            // 'user' => User::all()->map(function ($user) {
            //     return [
            //         'id' => $user->id,
            //         'name' => $user->name,
            //         'email' => $user->email,
            //         'edit_url' => route('users.edit', $user),
            //     ];
            // }),
            // 'user' => [
            //     'id' => 1,
            //     'name' => 'test',
            // ],
            'user' => null,
            'title' => 'Commercial Free Football'
            // 'create_url' => route('users.create'),
        ]);
    }
}
