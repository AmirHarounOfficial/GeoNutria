<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Wallet extends Model
{
    protected $table = 'credit_wallets';

    protected $fillable = [
        'id',
        'user_id',
        'balance',
        'total_earned',
        'total_spent',
        'last_reset_at',
        'next_reset_at',
    ];

    public $incrementing = false;
    protected $keyType = 'string';
}
