<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Usuario extends Model
{
    protected $table = 'usuarios';
    protected $fillable = ['usuarios'];

    public function departamentos(): HasMany
    {
        return $this->hasMany(Departamento::class, 'usuario_id');
    }
}
