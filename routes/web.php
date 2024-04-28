<?php

use App\Http\Controllers\Games\GameController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Users\ProfileController;
use App\Http\Controllers\Users\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::middleware('auth')->controller(UserController::class)->group(function () {
    Route::get('/testroute', 'testroute');
});

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/current-week', [GameController::class, 'currentWeek'])->name('current-week');

Route::middleware('auth')->group(function () {

    Route::post('/logout', function () {
        Auth::logout();

        request()->session()->invalidate();

        request()->session()->regenerateToken();

        return redirect('/');
    })->name('logout');
    Route::post('/create-user', [UserController::class, 'create'])->name('users.create');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
