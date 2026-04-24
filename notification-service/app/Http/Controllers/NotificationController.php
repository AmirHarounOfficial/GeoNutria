<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;
use Laravel\Lumen\Routing\Controller as BaseController;

class NotificationController extends BaseController
{
    public function index(Request $request)
    {
        $userId = $request->input('user_id');
        $notifications = Notification::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json($notifications);
    }

    public function markAsRead($id)
    {
        $notification = Notification::find($id);
        if ($notification) {
            $notification->update(['read_at' => now()]);
        }
        return response()->json(['status' => 'success']);
    }

    public function unreadCount(Request $request)
    {
        $userId = $request->input('user_id');
        $count = Notification::where('user_id', $userId)
            ->whereNull('read_at')
            ->count();
        
        return response()->json(['unread_count' => $count]);
    }
}
