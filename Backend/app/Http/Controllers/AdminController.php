<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AdminController extends Controller
{
    public function dashboard(): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'message' => 'Welcome to the Admin API Dashboard',
        ]);
    }
}
