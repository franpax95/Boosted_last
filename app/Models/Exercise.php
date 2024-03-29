<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'name', 'category_id', 'description', 'document_id'];
    protected $hidden = ['user_id', 'category_id', 'document_id'];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function category() {
        return $this->belongsTo(Category::class);
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
