<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;
    
    protected $fillable = ['name', 'base64'];

    public function exercise() {
        return $this->belongsTo(Exercise::class);
    }


}
