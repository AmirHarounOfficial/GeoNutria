<?php

use App\Http\Controllers\ChatController;
use Illuminate\Support\Facades\Route;

Route::post('/chat/sessions', [ChatController::class, 'start']);
Route::post('/chat/sessions/{id}/messages', [ChatController::class, 'message']);
