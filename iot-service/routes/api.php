<?php

use App\Http\Controllers\SensorController;
use Illuminate\Support\Facades\Route;

Route::post('/ingest', [SensorController::class, 'ingest']);
Route::get('/history/{fieldId}', [SensorController::class, 'getHistory']);
