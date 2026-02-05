<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Usuario extends Model
{
    protected $table = 'usuarios';
    protected $fillable = ['nombre_usuario', 'email', 'activo'];

    public function distritos(): HasMany
    {
        return $this->hasMany(Distrito::class, 'usuario_id');
    }
}
