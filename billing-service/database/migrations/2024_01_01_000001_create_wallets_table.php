<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('credit_wallets', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id')->unique();
            $table->integer('balance')->default(0);
            $table->integer('total_earned')->default(0);
            $table->integer('total_spent')->default(0);
            $table->timestamp('last_reset_at')->nullable();
            $table->timestamp('next_reset_at')->nullable();
            $table->timestamps();
        });

        Schema::create('credit_transactions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('wallet_id');
            $table->uuid('user_id');
            $table->enum('type', ['deduction', 'addition', 'refund', 'reset', 'purchase']);
            $table->integer('amount');
            $table->integer('balance_after');
            $table->string('feature')->nullable(); // leaf_scan, soil_scan, etc.
            $table->uuid('reference_id')->nullable(); // job_id
            $table->string('description')->nullable();
            $table->timestamps();

            $table->foreign('wallet_id')->references('id')->on('credit_wallets')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('credit_transactions');
        Schema::dropIfExists('credit_wallets');
    }
};
