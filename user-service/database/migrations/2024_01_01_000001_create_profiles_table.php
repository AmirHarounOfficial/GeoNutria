<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id')->unique();
            $table->string('full_name');
            $table->string('avatar_url', 500)->nullable();
            $table->string('phone', 20)->nullable();
            $table->string('location')->nullable();
            $table->enum('language', ['en', 'ar'])->default('en');
            $table->timestamps();
        });

        Schema::create('farms', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id');
            $table->string('name');
            $table->decimal('size_hectares', 10, 2)->nullable();
            $table->string('location')->nullable();
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->jsonb('crop_types')->nullable();
            $table->date('established_date')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('farms');
        Schema::dropIfExists('profiles');
    }
};
