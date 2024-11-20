<?php

namespace App\Http\Controllers;

use App\Models\Estudiante;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EstudianteController extends Controller
{
    // Mostrar todos los estudiantes
    public function index()
    {
        $estudiantes = Estudiante::all();
        $data = ["data" => $estudiantes];
        return response()->json($data, 200);
    }

    // Crear un nuevo estudiante
    public function store(Request $request)
    {
        return response()->json([
            'message' => 'Estudiante creado',
            'data' => $request->all()
        ]);
    }

    public function update(Request $request, $id)
    {
        return response()->json([
            'message' => "Estudiante con ID {$id} actualizado",
            'data' => $request->all()
        ]);
    }

    public function destroy($id)
    {
        return response()->json([
            'message' => "Estudiante con ID {$id} eliminado"
        ]);
    }
}