<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id();
            $table->string('usuarios', 50);
            $table->timestamps();
        });

        Schema::create('departamentos', function (Blueprint $table) {
            $table->id();
            $table->string('departamento', 50);
            $table->string('provincia', 50);
            $table->string('distrito', 50);
            $table->integer('prioridad')->nullable();
            $table->foreignId('usuario_id')->constrained('usuarios');
            $table->timestamps();
        });

        Schema::create('personas', function (Blueprint $table) {
            $table->id();
            $table->string('dni', 8)->unique();
            $table->string('nombres', 50);
            $table->string('apellidoPaterno', 50);
            $table->string('apellidoMaterno', 50);
            $table->foreignId('distrito_id')->constrained('departamentos');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('personas');
        Schema::dropIfExists('departamentos');
        Schema::dropIfExists('usuarios');
    }
};
