<?php

use App\Http\Controllers\AIJobController;
use App\Http\Controllers\InternalAIController;
use Illuminate\Support\Facades\Route;

Route::post('/jobs/submit', [AIJobController::class, 'submit']);
Route::get('/jobs/{id}', [AIJobController::class, 'status']);

// Internal AI Worker routes
Route::put('/internal/jobs/{id}/result', [InternalAIController::class, 'updateResult']);
