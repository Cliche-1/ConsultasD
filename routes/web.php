<?php

use App\Http\Controllers\PersonaController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('consultas.dni');
});

Route::resource('personas', PersonaController::class);
