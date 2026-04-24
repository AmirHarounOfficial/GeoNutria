<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ai_jobs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id');
            $table->uuid('field_id')->nullable();
            $table->string('type');
            $table->enum('status', ['pending', 'processing', 'completed', 'failed'])->default('pending');
            $table->jsonb('input_data')->nullable();
            $table->string('input_image_url', 500)->nullable();
            $table->jsonb('result')->nullable();
            $table->integer('credits_charged')->default(0);
            $table->text('error_message')->nullable();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ai_jobs');
    }
};
