<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChatSession extends Model
{
    protected $fillable = [
        'id',
        'user_id',
        'title',
        'context',
        'is_active',
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    protected $casts = [
        'context' => 'array',
        'is_active' => 'boolean',
    ];
}
