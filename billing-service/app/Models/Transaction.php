<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $table = 'credit_transactions';

    protected $fillable = [
        'id',
        'wallet_id',
        'user_id',
        'type',
        'amount',
        'balance_after',
        'feature',
        'reference_id',
        'description',
    ];

    public $incrementing = false;
    protected $keyType = 'string';
}
