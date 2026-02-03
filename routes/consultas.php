<?php

use App\Http\Controllers\PersonaController;
use Illuminate\Support\Facades\Route;

Route::get('/consultas/dni', [PersonaController::class, 'search'])->name('consultas.dni');
