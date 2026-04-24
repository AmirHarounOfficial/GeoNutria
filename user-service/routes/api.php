<?php

use App\Http\Controllers\FarmController;
use App\Http\Controllers\FieldController;
use App\Http\Controllers\SensorCRUDController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/farms', [FarmController::class, 'index']);
Route::post('/farms', [FarmController::class, 'store']);
Route::get('/farms/{id}', [FarmController::class, 'show']);
Route::put('/farms/{id}', [FarmController::class, 'update']);
Route::delete('/farms/{id}', [FarmController::class, 'destroy']);

Route::get('/farms/{farmId}/fields', [FieldController::class, 'index']);
Route::post('/farms/{farmId}/fields', [FieldController::class, 'store']);
Route::get('/farms/{farmId}/fields/{id}', [FieldController::class, 'show']);
Route::put('/farms/{farmId}/fields/{id}', [FieldController::class, 'update']);
Route::delete('/farms/{farmId}/fields/{id}', [FieldController::class, 'destroy']);

Route::get('/fields/{fieldId}/sensors', [SensorCRUDController::class, 'index']);
Route::post('/fields/{fieldId}/sensors', [SensorCRUDController::class, 'store']);
Route::get('/fields/{fieldId}/sensors/{id}', [SensorCRUDController::class, 'show']);
Route::put('/fields/{fieldId}/sensors/{id}', [SensorCRUDController::class, 'update']);
Route::delete('/fields/{fieldId}/sensors/{id}', [SensorCRUDController::class, 'destroy']);

Route::get('/profiles/{userId}', [ProfileController::class, 'show']);
Route::put('/profiles/{userId}', [ProfileController::class, 'update']);
