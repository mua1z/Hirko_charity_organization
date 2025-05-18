<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Events\Verified;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use Spatie\Permission\Models\Role;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Password::defaults()],
            'role' => 'required|in:Admin,Staff,Donetar',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $validated = $validator->validated();
        Role::firstOrCreate(['name' => $validated['role'], 'guard_name' => 'api']);
        $user->assignRole($validated['role']);

        event(new Registered($user));

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
            'redirect_to' => $this->getDashboardRoute($validated['role'])
        ]);
    }

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid login details'
            ], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
            'redirect_to' => $this->getDashboardRoute($user->getRoleNames()->first())
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function user(Request $request)
    {
        return response()->json($request->user()->load('roles'));
    }

    public function verifyEmail(Request $request, $id, $hash)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found.'], 404);
        }

        if (!hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
            return response()->json(['message' => 'Invalid verification link.'], 403);
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Email already verified.',
                'redirect_to' => $this->getDashboardRoute($user->getRoleNames()->first())
            ], 200);
        }

        $user->markEmailAsVerified();

        return response()->json([
            'message' => 'Email successfully verified.',
            'redirect_to' => $this->getDashboardRoute($user->getRoleNames()->first())
        ]);
    }

    public function resendVerificationEmail(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Email already verified.',
                'redirect_to' => $this->getDashboardRoute($user->getRoleNames()->first())
            ], 200);
        }

        $user->sendEmailVerificationNotification();

        return response()->json(['message' => 'Verification email resent.']);
    }

    /**
     * Get the dashboard route based on user role
     */
    protected function getDashboardRoute($role)
    {
        // Convert role to lowercase for case-insensitive comparison
        $role = strtolower($role);

        switch ($role) {
            case 'admin':
                return '/dashboard';
            case 'staff':
                return '/dashboard';
            case 'donetar':
                return '/dashboard';
            default:
                return '/';
        }
    }
}
