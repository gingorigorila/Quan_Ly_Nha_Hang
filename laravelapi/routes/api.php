<?php
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\RestaurantController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function(){
   
    Route::post('logout', [AuthController::class, 'logout']);

});
Route::get('restaurants', [RestaurantController::class, 'index']);
Route::post('add-restaurant', [RestaurantController::class, 'store']);
Route::get('/edit-restaurant/{id}', [RestaurantController::class, 'edit']);
Route::put('update-restaurant/{id}',[RestaurantController::class, 'update']);
Route::delete('delete-restaurant/{id}', [RestaurantController::class, 'destroy']);

Route::post('store-restaurant',[RestaurantController::class,'store']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
