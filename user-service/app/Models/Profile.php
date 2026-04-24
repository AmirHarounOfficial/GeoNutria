<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'id',
        'user_id',
        'full_name',
        'avatar_url',
        'phone',
        'location',
        'language',
    ];

    public $incrementing = false;
    protected $keyType = 'string';
}
