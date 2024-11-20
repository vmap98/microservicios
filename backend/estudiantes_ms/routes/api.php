<?php


use App\Http\Controllers\EstudianteController;
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

// Estudiantes
Route::controller(EstudianteController::class)->group(function(){
    Route::get("app/estudiantes", "index");
    Route::post('app/estudiante', 'store');
    Route::put('app/estudiantes/{id}', 'update');
    Route::delete('app/estudiantes/{id}', 'destroy');
});

