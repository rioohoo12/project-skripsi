<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    private function ensureJsonInput(Request $request): void
    {
        $contentType = $request->header('Content-Type', '');
        $isJson = str_starts_with($contentType, 'application/json');
        if ($isJson && $request->getContent()) {
            $data = json_decode($request->getContent(), true);
            if (is_array($data)) {
                $request->merge($data);
            }
        }
    }

    public function register(Request $request)
    {
        $this->ensureJsonInput($request);

        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
            'jenis_kelamin' => 'required|in:laki-laki,perempuan',
        ], [
            'nama.required' => 'Nama lengkap wajib diisi.',
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.unique' => 'Email ini sudah terdaftar. Silakan login dengan email ini.',
            'password.required' => 'Password wajib diisi.',
            'password.min' => 'Password minimal 6 karakter.',
            'password.confirmed' => 'Konfirmasi password tidak sama.',
            'jenis_kelamin.required' => 'Pilih jenis kelamin.',
            'jenis_kelamin.in' => 'Jenis kelamin harus Laki-laki atau Perempuan.',
        ]);

        $user = User::create([
            'name' => $validated['nama'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'siswa',
            'jenis_kelamin' => $validated['jenis_kelamin'],
        ]);

        $token = $user->createToken('slapur-register')->plainTextToken;

        return response()->json([
            'message' => 'Akun berhasil dibuat dan tersimpan di server. Silakan login.',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'jenis_kelamin' => $user->jenis_kelamin,
            ],
            'token' => $token,
            'token_type' => 'Bearer',
        ], 201);
    }

    public function login(Request $request)
    {
        $this->ensureJsonInput($request);

        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)
            ->first(['id', 'name', 'email', 'password', 'role', 'jenis_kelamin']);

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Email atau password salah. Belum punya akun? Silakan daftar dulu.'],
            ]);
        }

        $role = $user->role ?? 'siswa';
        if ($role !== 'siswa') {
            throw ValidationException::withMessages([
                'email' => ['Akun ini bukan akun siswa.'],
            ]);
        }

        $token = $user->createToken('slapur-login')->plainTextToken;

        return response()->json([
            'message' => 'Login berhasil',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'jenis_kelamin' => $user->jenis_kelamin,
            ],
            'token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logout berhasil']);
    }
}
