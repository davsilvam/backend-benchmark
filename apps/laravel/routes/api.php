<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BenchmarkController;

Route::get("/health", [BenchmarkController::class, "health"]);
Route::get("/compute", [BenchmarkController::class, "compute"]);
Route::get("/users", [BenchmarkController::class, "users"]);
Route::get("/users/raw", [BenchmarkController::class, "usersRaw"]);
Route::post("/users", [BenchmarkController::class, "createUser"]);
