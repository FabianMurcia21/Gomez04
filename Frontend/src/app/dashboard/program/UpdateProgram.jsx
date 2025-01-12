import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function UpdateForm({ programToUpdate, updateProgram }) {
  const [programName, setProgramName] = useState("");

  useEffect(() => {
    if (programToUpdate) {
      setProgramName(programToUpdate.programName || ""); // Carga el nombre del programa
    }
  }, [programToUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!programName.trim()) {
      alert("El nombre del programa no puede estar vacío.");
      return;
    }
    updateProgram(programName, programToUpdate.program_Id); // Llama a la función de actualización
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader>
        <h2 className="text-lg font-semibold text-center">
          {programToUpdate ? "Actualizar Programa" : "Guardar Programa"}
        </h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="programName"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre del Programa:
            </label>
            <Input
              id="programName"
              type="text"
              value={programName}
              onChange={(e) => setProgramName(e.target.value)}
              placeholder="Ingrese el nombre del programa"
              className="mt-1"
            />
          </div>
          <Button type="submit" className="w-full">
            {programToUpdate ? "Actualizar Programa" : "Guardar Programa"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
