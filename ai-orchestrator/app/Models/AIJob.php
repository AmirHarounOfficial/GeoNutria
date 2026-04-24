<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AIJob extends Model
{
    protected $table = 'ai_jobs';

    protected $fillable = [
        'id',
        'user_id',
        'field_id',
        'type',
        'status',
        'input_data',
        'input_image_url',
        'result',
        'credits_charged',
        'error_message',
        'started_at',
        'completed_at',
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    protected $casts = [
        'input_data' => 'array',
        'result' => 'array',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
    ];
}
