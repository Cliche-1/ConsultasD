<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Distrito extends Model
{
    protected $table = 'distritos';
    protected $fillable = ['nombre', 'provincia_id', 'codigo_ubigeo', 'prioridad', 'usuario_id'];

    public function provincia(): BelongsTo
    {
        return $this->belongsTo(Provincia::class, 'provincia_id');
    }

    public function usuario(): BelongsTo
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }

    public function personas(): HasMany
    {
        return $this->hasMany(Persona::class, 'distrito_id');
    }
}
