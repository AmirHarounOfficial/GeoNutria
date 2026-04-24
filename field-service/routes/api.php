<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::get('/dashboard/kpis', [DashboardController::class, 'getKPIs']);
Route::get('/dashboard/health-trend', [DashboardController::class, 'getHealthTrend']);
