<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Farm extends Model
{
    protected $fillable = [
        'id',
        'user_id',
        'name',
        'size_hectares',
        'location',
        'latitude',
        'longitude',
        'crop_types',
        'established_date',
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    protected $casts = [
        'crop_types' => 'array',
        'established_date' => 'date',
    ];
}
