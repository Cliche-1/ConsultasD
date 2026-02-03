<?php

namespace App\Http\Controllers;

use App\Models\Persona;
use App\Models\Departamento;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PersonaController extends Controller
{
    public function index()
    {
        $personas = Persona::with('departamento')->get();
        return Inertia::render('personas/index', [
            'personas' => $personas
        ]);
    }

    public function create()
    {
        $departamentos = Departamento::all();
        return Inertia::render('personas/create', [
            'departamentos' => $departamentos
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'dni' => 'required|string|digits:8|unique:personas',
            'nombres' => 'required|string|max:50',
            'apellidoPaterno' => 'required|string|max:50',
            'apellidoMaterno' => 'required|string|max:50',
            'distrito_id' => 'required|exists:departamentos,id',
        ]);

        Persona::create($validated);

        return redirect()->route('personas.index')->with('success', 'Persona creada correctamente.');
    }

    public function edit(Persona $persona)
    {
        $persona->load('departamento');
        $departamentos = Departamento::all();
        return Inertia::render('personas/edit', [
            'persona' => $persona,
            'departamentos' => $departamentos
        ]);
    }

    public function update(Request $request, Persona $persona)
    {
        $validated = $request->validate([
            'dni' => 'required|string|digits:8|unique:personas,dni,' . $persona->id,
            'nombres' => 'required|string|max:50',
            'apellidoPaterno' => 'required|string|max:50',
            'apellidoMaterno' => 'required|string|max:50',
            'distrito_id' => 'required|exists:departamentos,id',
        ]);

        $persona->update($validated);

        return redirect()->route('personas.index')->with('success', 'Persona actualizada correctamente.');
    }

    public function destroy(Persona $persona)
    {
        $persona->delete();
        return redirect()->route('personas.index')->with('success', 'Persona eliminada correctamente.');
    }

    public function search(Request $request)
    {
        $dni = $request->input('dni');
        $persona = null;

        if ($dni) {
            $request->validate([
                'dni' => 'digits:8',
            ]);
            $persona = Persona::with('departamento')->where('dni', $dni)->first();
        }

        return Inertia::render('personas/search', [
            'persona' => $persona,
            'filters' => $request->only(['dni'])
        ]);
    }
}
