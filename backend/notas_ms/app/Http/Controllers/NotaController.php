<?php

namespace App\Http\Controllers;

use App\Models\Nota;
use Illuminate\Http\Request;

class NotaController extends Controller
{
    public function index()
    {
        $notas = Nota::all();
        return response()->json($notas);
    }

    public function store(Request $request)
    {
        $request->validate([
            'actividad' => 'required|string|max:100',
            'nota' => 'required|numeric|min:0|max:5',
            'codEstudiante' => 'required|exists:estudiantes,cod',
        ]);

        $nota = Nota::create($request->all());
        return response()->json($nota, 201);
    }

    public function update(Request $request, $id)
    {
        $nota = Nota::find($id);

        if (!$nota) {
            return response()->json(['error' => 'Nota no encontrada'], 404);
        }

        $request->validate([
            'actividad' => 'string|max:100',
            'nota' => 'numeric|min:0|max:5',
        ]);

        $nota->update($request->all());
        return response()->json($nota);
    }

    public function destroy($id)
    {
        $nota = Nota::find($id);

        if (!$nota) {
            return response()->json(['error' => 'Nota no encontrada'], 404);
        }

        $nota->delete();
        return response()->json(['message' => 'Nota eliminada con éxito']);
    }
}