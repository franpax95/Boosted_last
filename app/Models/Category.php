<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    
    protected $fillable = ['user_id', 'document_id', 'name'];
    protected $hidden = ['user_id', 'document_id'];

    public function exercises() {
        return $this->hasMany(Exercise::class, 'category_id');
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function image() {
        return $this->hasOne(Document::class, 'id', 'document_id');
    }

    // this is the recommended way for declaring event handlers
    public static function boot() {
        parent::boot();

        self::deleting(function($category) { // before delete() method call this
            $category->image()->delete();
        });
    }
}
