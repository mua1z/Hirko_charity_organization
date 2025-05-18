<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SocialAuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\DonetarController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [PasswordResetController::class, 'sendResetLink']);
Route::post('/reset-password', [PasswordResetController::class, 'reset']);

 Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Google OAuth routes
Route::get('/auth/google', [SocialAuthController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [SocialAuthController::class, 'handleGoogleCallback']);

// Email verification
Route::get('/email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])
    ->middleware(['signed'])->name('verification.verify');
Route::post('/email/verification-notification', [AuthController::class, 'resendVerificationEmail'])
    ->middleware(['auth:sanctum']);

// Protected routes
Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);


    // Profile management
    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'show']);
        Route::put('/', [ProfileController::class, 'update']);
        Route::put('/password', [ProfileController::class, 'updatePassword']);
    });



// Admin-specific API routes
Route::middleware(['role:admin'])->group(function () {
   Route::get('/dashboard', [AdminController::class, 'dashboard']);
    // Add more admin routes here
});

// Staff-specific API routes
Route::middleware([ 'role:staff'])->group(function () {
    Route::get('/dashboard', [StaffController::class, 'dashboard']);
    // Add more staff routes here
});

// Donetar-specific API routes
Route::middleware([ 'role:donetar'])->group(function () {
    Route::get('/dashboard', [DonetarController::class, 'dashboard']);
    // Add more donetar routes here

});
});

