<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('fields', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('farm_id');
            $table->string('name');
            $table->decimal('size_hectares', 10, 2)->nullable();
            $table->string('crop_type')->nullable();
            $table->string('zone')->nullable();
            $table->enum('status', ['healthy', 'moderate', 'attention'])->default('healthy');
            $table->date('planting_date')->nullable();
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->timestamps();

            $table->foreign('farm_id')->references('id')->on('farms')->onDelete('cascade');
        });

        Schema::create('sensors', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('field_id')->nullable();
            $table->string('sensor_external_id')->unique();
            $table->string('type')->nullable();
            $table->enum('status', ['online', 'offline', 'maintenance'])->default('offline');
            $table->timestamp('last_reading_at')->nullable();
            $table->timestamps();

            $table->foreign('field_id')->references('id')->on('fields')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sensors');
        Schema::dropIfExists('fields');
    }
};
