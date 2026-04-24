<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sensor extends Model
{
    protected $fillable = [
        'id',
        'field_id',
        'sensor_external_id',
        'type',
        'status',
        'last_reading_at',
    ];

    public $incrementing = false;
    protected $keyType = 'string';
}
