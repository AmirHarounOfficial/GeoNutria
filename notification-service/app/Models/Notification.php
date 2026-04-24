<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $fillable = [
        'id',
        'user_id',
        'title',
        'body',
        'data',
        'read_at',
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    protected $casts = [
        'data' => 'array',
        'read_at' => 'datetime',
    ];
}
