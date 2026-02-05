<?php

namespace Database\Seeders;

use App\Models\Usuario;
use App\Models\Departamento;
use App\Models\Provincia;
use App\Models\Distrito;
use Illuminate\Database\Seeder;

class AppSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $usuario = Usuario::create(['nombre_usuario' => 'Admin']);

        // Departamento: Tacna
        $dptoTacna = Departamento::create(['nombre' => 'Tacna']);
        
        // Provincia: Tacna
        $provTacna = Provincia::create(['nombre' => 'Tacna', 'departamento_id' => $dptoTacna->id]);
        Distrito::create(['nombre' => 'Tacna', 'provincia_id' => $provTacna->id, 'usuario_id' => $usuario->id]);
        Distrito::create(['nombre' => 'Alto de la Alianza', 'provincia_id' => $provTacna->id, 'usuario_id' => $usuario->id]);
        Distrito::create(['nombre' => 'Ciudad Nueva', 'provincia_id' => $provTacna->id, 'usuario_id' => $usuario->id]);
        Distrito::create(['nombre' => 'Pocollay', 'provincia_id' => $provTacna->id, 'usuario_id' => $usuario->id]);
        Distrito::create(['nombre' => 'Gregorio Albarracín', 'provincia_id' => $provTacna->id, 'usuario_id' => $usuario->id]);
        
        // Provincia: Tarata
        $provTarata = Provincia::create(['nombre' => 'Tarata', 'departamento_id' => $dptoTacna->id]);
        Distrito::create(['nombre' => 'Tarata', 'provincia_id' => $provTarata->id, 'usuario_id' => $usuario->id]);
        Distrito::create(['nombre' => 'Ticaco', 'provincia_id' => $provTarata->id, 'usuario_id' => $usuario->id]);
        
        // Provincia: Jorge Basadre
        $provBasadre = Provincia::create(['nombre' => 'Jorge Basadre', 'departamento_id' => $dptoTacna->id]);
        Distrito::create(['nombre' => 'Locumba', 'provincia_id' => $provBasadre->id, 'usuario_id' => $usuario->id]);
        Distrito::create(['nombre' => 'Ite', 'provincia_id' => $provBasadre->id, 'usuario_id' => $usuario->id]);

        // Provincia: Candarave
        $provCandarave = Provincia::create(['nombre' => 'Candarave', 'departamento_id' => $dptoTacna->id]);
        Distrito::create(['nombre' => 'Candarave', 'provincia_id' => $provCandarave->id, 'usuario_id' => $usuario->id]);
        Distrito::create(['nombre' => 'Cairani', 'provincia_id' => $provCandarave->id, 'usuario_id' => $usuario->id]);
    }
}
