<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    
    protected $fillable = ['user_id', 'name'];
    protected $hidden = ['user_id'];

    public function exercises() {
        return $this->hasMany(Exercise::class, 'id');
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
