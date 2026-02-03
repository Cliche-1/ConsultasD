<?php

namespace Database\Seeders;

use App\Models\Usuario;
use App\Models\Departamento;
use Illuminate\Database\Seeder;

class AppSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $usuario = Usuario::create(['usuarios' => 'Admin']);

        // Lima
        Departamento::create([
            'departamento' => 'Lima',
            'provincia' => 'Lima',
            'distrito' => 'Miraflores',
            'prioridad' => 1,
            'usuario_id' => $usuario->id
        ]);
        Departamento::create([
            'departamento' => 'Lima',
            'provincia' => 'Lima',
            'distrito' => 'San Isidro',
            'prioridad' => 1,
            'usuario_id' => $usuario->id
        ]);
        Departamento::create([
            'departamento' => 'Lima',
            'provincia' => 'Cañete',
            'distrito' => 'San Vicente',
            'prioridad' => 2,
            'usuario_id' => $usuario->id
        ]);

        // Arequipa
        Departamento::create([
            'departamento' => 'Arequipa',
            'provincia' => 'Arequipa',
            'distrito' => 'Yanahuara',
            'prioridad' => 1,
            'usuario_id' => $usuario->id
        ]);
        Departamento::create([
            'departamento' => 'Arequipa',
            'provincia' => 'Caylloma',
            'distrito' => 'Chivay',
            'prioridad' => 2,
            'usuario_id' => $usuario->id
        ]);
    }
}
