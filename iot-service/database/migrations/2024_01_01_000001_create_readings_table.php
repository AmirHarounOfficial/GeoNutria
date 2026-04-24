<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // sensor_readings (hypertable)
        DB::statement("
            CREATE TABLE sensor_readings (
                time TIMESTAMPTZ NOT NULL,
                sensor_id UUID NOT NULL,
                field_id UUID NOT NULL,
                moisture DECIMAL(5,2),
                ambient_temp DECIMAL(5,2),
                soil_temp DECIMAL(5,2),
                humidity DECIMAL(5,2),
                light DECIMAL(10,2),
                ph DECIMAL(4,2),
                nitrogen DECIMAL(8,2),
                phosphorus DECIMAL(8,2),
                potassium DECIMAL(8,2),
                chlorophyll DECIMAL(8,2),
                ec DECIMAL(6,3)
            );
        ");

        // Convert to hypertable
        DB::statement("SELECT create_hypertable('sensor_readings', 'time');");

        Schema::create('sensor_thresholds', function (Blueprint $table) {
            $table->id();
            $table->uuid('field_id');
            $table->string('parameter');
            $table->decimal('min_value', 10, 2)->nullable();
            $table->decimal('max_value', 10, 2)->nullable();
            $table->boolean('alert_enabled')->default(true);
            $table->timestamps();
        });

        Schema::create('sensor_alerts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('sensor_id');
            $table->uuid('field_id');
            $table->string('parameter');
            $table->decimal('value', 10, 2);
            $table->enum('threshold_type', ['above_max', 'below_min']);
            $table->boolean('acknowledged')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sensor_alerts');
        Schema::dropIfExists('sensor_thresholds');
        DB::statement("DROP TABLE IF EXISTS sensor_readings;");
    }
};
