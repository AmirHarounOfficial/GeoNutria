<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Field extends Model
{
    protected $fillable = [
        'id',
        'farm_id',
        'name',
        'size_hectares',
        'crop_type',
        'zone',
        'status',
        'planting_date',
        'latitude',
        'longitude',
    ];

    public $incrementing = false;
    protected $keyType = 'string';
}
