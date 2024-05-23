<?php

use App\Http\Controllers\Games\GameController;
use App\Http\Controllers\Articles\ArticleController;
use App\Http\Controllers\Weeks\WeekController;
use App\Http\Controllers\Comments\CommentController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Users\ProfileController;
use App\Http\Controllers\Users\UserController;
use App\Http\Controllers\BestOfs\BestOfsController;
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

/**
 * Game routes
 */
Route::get('/weeks/{year}/{week}', [ WeekController::class, 'show' ])->name('week.show');
Route::get('/next-week', [ WeekController::class, 'nextWeek' ])->name('next-week');
Route::get('/this-week', [ WeekController::class, 'thisWeek' ])->name('this-week');

/**
 * Week routes
 */
Route::get('/all-weeks', [ WeekController::class, 'allWeeks' ])->name('all-weeks');

/**
 * Best Of routes
 */
Route::get('/bestOfs', [ BestOfsController::class, 'allBestOfs' ])->name('best-ofs');
Route::get('/bestOfs/{year}/{week?}', [ BestOfsController::class, 'show' ])->name('best-of.show');

/**
 * Comment routes
 */
Route::get('/comments/{game_id}', [ CommentController::class, 'get' ])->name('comments.get');
Route::middleware('auth')->post('/comments/{game_id}', [ CommentController::class, 'create' ])->name('comments.create');
Route::middleware('auth')->delete('/comments/{comment_id}', [ CommentController::class, 'destroy' ])->name('comments.destroy');
Route::middleware('auth')->post('/comments/{comment_id}/like', [ CommentController::class, 'like' ])->name('comments.like');
Route::middleware('auth')->post('/comments/{comment_id}/dislike', [ CommentController::class, 'dislike' ])->name('comments.dislike');

/**
 * Article routes
 */
Route::get('/how-it-works', [ ArticleController::class, 'howItWorks' ])->name('how-it-works');

/**
 * User routes
 */
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
