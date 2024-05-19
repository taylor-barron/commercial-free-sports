<?php

namespace App\Http\Controllers\Comments;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function get($game_id)
    {
        $user = Auth::user();

        $commentsObjects = Comment::where('game_id', $game_id)->get();
        $comments = [];
        foreach ($commentsObjects as $comment) {
            $comments[] = [

                'id' => $comment->id,
                'username' => $comment->user->name,
                'comment' => $comment->comment,
                'timestamp' => $comment->created_at->format('Y-m-d'),
                'upvotes' => $comment->likes()->count(),
                'user_upvoted' => $user ? $comment->likes->contains($user->id): false,
                'downvotes' => $comment->dislikes()->count(),
                'user_downvoted' => $user ? $comment->dislikes->contains($user->id): false,
            ];
        }

        return $comments;
    }

    public function create(Request $request, $game_id)
    {
        try {
            $user = Auth::user();
    
            $comment = new Comment();
            $comment->user_id = $user->id;
            $comment->game_id = $game_id;
            $comment->comment = $request->comment;
    
            $comment->save();
            $comment->likes()->attach($user->id);
    
        } catch(\Exception $e) {
            return [
                'response' => 500,
                'error' => $e->getMessage()
            ];
        }
    
        return [
            'response' => 200
        ];
    }

    public function like(Request $request, $comment_id)
    {
        try {
            $user = Auth::user();
            $comment = Comment::where('id', $comment_id)->first();

            if ($comment->likes->contains($user->id)) {
                $comment->likes()->detach($user->id);
            } else {

                $comment->likes()->attach($user->id);
                if ($comment->dislikes->contains($user->id)) {
                    $comment->dislikes()->detach($user->id);
                }
            }

        } catch(\Exception $e) {
            return [
                'response' => 500,
                'error' => $e->getMessage()
            ];
        }

        return [
            'response' => 200
        ];
    }

    public function dislike(Request $request, $comment_id)
    {
        try {
            $user = Auth::user();
            $comment = Comment::where('id', $comment_id)->first();
    
            if ($comment->dislikes->contains($user->id)) {
                $comment->dislikes()->detach($user->id);
            } else {

                $comment->dislikes()->attach($user->id);
                if ($comment->likes->contains($user->id)) {
                    $comment->likes()->detach($user->id);
                }
            }
    
        } catch(\Exception $e) {
            return [
                'response' => 500,
                'error' => $e->getMessage()
            ];
        }
    
        return [
            'response' => 200
        ];
    }
}