<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = "users";

    public $timestamps = false;

    protected $fillable = ["name", "email", "created_at"];

    protected $casts = [
        "created_at" => "datetime",
    ];
}
