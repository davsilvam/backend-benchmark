<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BenchmarkController extends Controller
{
    public function health()
    {
        return response()->json([
            "status" => "ok",
        ]);
    }

    public function compute(Request $request)
    {
        $n = (int) $request->query("n", 40);

        return response()->json([
            "result" => $this->fib($n),
        ]);
    }

    private function fib(int $n): int
    {
        if ($n <= 1) {
            return $n;
        }

        return $this->fib($n - 1) + $this->fib($n - 2);
    }

    public function users()
    {
        return response()->json(
            User::query()
                ->select(["id", "name", "email", "created_at"])
                ->orderBy("id")
                ->limit(1000)
                ->get(),
        );
    }

    public function usersRaw()
    {
        $users = DB::select(
            "SELECT id, name, email, created_at FROM users ORDER BY id LIMIT 1000",
        );

        return response()->json($users);
    }

    public function createUser(Request $request)
    {
        $user = User::create([
            "name" => $request->input("name"),
            "email" => $request->input("email"),
            "created_at" => now(),
        ]);

        return response()->json($user, 201);
    }
}
