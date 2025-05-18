<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class StaffController extends Controller
{
    public function dashboard(): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'message' => 'Welcome to the Staff API Dashboard',
        ]);
    }
}
