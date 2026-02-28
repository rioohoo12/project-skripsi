<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes - SLAPUR (Siswa)
|--------------------------------------------------------------------------
*/

Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('login-guru', [AuthController::class, 'loginGuru']);
    Route::post('login-staff', [AuthController::class, 'loginStaff']);
    Route::post('register-guru', [AuthController::class, 'registerGuru']);
    Route::post('forgot-password-guru', [AuthController::class, 'forgotPasswordGuru']);
    Route::post('reset-password-guru', [AuthController::class, 'resetPasswordGuru']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('auth/logout', [AuthController::class, 'logout']);
});
