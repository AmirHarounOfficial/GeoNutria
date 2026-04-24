<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('feature_costs', function (Blueprint $table) {
            $table->id();
            $table->string('feature_key')->unique();
            $table->integer('cost');
            $table->string('description')->nullable();
            $table->string('description_ar')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('feature_costs');
    }
};
