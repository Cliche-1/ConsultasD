<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Departamento extends Model
{
    protected $table = 'departamentos';
    protected $fillable = ['departamento', 'provincia', 'distrito', 'prioridad', 'usuario_id'];

    public function usuario(): BelongsTo
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }

    public function personas(): HasMany
    {
        return $this->hasMany(Persona::class, 'distrito_id');
    }
}
