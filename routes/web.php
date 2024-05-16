<?php

use App\Http\Controllers\Games\GameController;
use App\Http\Controllers\Articles\ArticleController;
use App\Http\Controllers\Weeks\WeekController;
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

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/next-week', [ WeekController::class, 'nextWeek' ])->name('next-week');
Route::get('/this-week', [ WeekController::class, 'thisWeek' ])->name('this-week');
Route::get('/all-weeks', [ WeekController::class, 'allWeeks' ])->name('all-weeks');
Route::get('/best-ofs', [ WeekController::class, 'bestOfs' ])->name('best-ofs');
Route::get('/weeks/{year}/{week}', [ WeekController::class, 'show' ])->name('week.show');

Route::get('/how-it-works', [ ArticleController::class, 'howItWorks' ])->name('how-it-works');

Route::middleware('auth')->group(function () {

    Route::post('/logout', function () {
        Auth::logout();

        request()->session()->invalidate();

        request()->session()->regenerateToken();

        return redirect('/');
    })->name('logout');
    Route::get('/profile', [ ProfileController::class, 'edit' ])->name('profile.edit');
    Route::patch('/profile', [ ProfileController::class, 'update' ])->name('profile.update');
    Route::delete('/profile', [ ProfileController::class, 'destroy' ])->name('profile.destroy');
});

require __DIR__.'/auth.php';
