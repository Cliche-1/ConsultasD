<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Persona extends Model
{
    protected $table = 'personas';
    protected $fillable = ['dni', 'nombres', 'apellidoPaterno', 'apellidoMaterno', 'distrito_id'];

    public function departamento(): BelongsTo
    {
        return $this->belongsTo(Departamento::class, 'distrito_id');
    }
}
