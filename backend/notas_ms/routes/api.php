<?php

use App\Http\Controllers\NotaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('api')->group(function () {
    Route::get('/notas', [NotaController::class, 'index']);
    Route::post('/notas', [NotaController::class, 'store']);
    Route::put('/notas/{id}', [NotaController::class, 'update']);
    Route::delete('/notas/{id}', [NotaController::class, 'destroy']);
});