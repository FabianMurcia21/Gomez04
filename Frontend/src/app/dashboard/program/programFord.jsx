"use client";
import axiosInstance from "@/lib/axiosInstance";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; 
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";


const ProgramForm = () => {
  const [ProgramData, SetProgramData] = useState({
    program_Id: "",
    program_Name: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post("/api/Program/CreateProgram", ProgramData);
      if (response.status === 200) {
        alert("Programa creado con éxito");
        SetProgramData({ program_Id: "", program_Name: ""}); // Reinicia los campos
      }
    } catch (error) {
      alert("Hubo un error al crear el programa");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="max-w-md mx-auto shadow-md p-4">
      <CardHeader>
        <CardTitle>Registrar Programa</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="program_Id">ID del Programa</Label>
            <Input
              id="program_Id"
              type="number"
              value={ProgramData.program_Id}
              onChange={(e) => SetProgramData({ ...ProgramData, program_Id: e.target.value })}
              placeholder="Ej. 123"
            />
          </div>
          <div>
            <Label htmlFor="program_Name">Nombre del Programa</Label>
            <Input
              id="program_Name"
              type="text"
              value={ProgramData.program_Name}
              onChange={(e) => SetProgramData({ ...ProgramData, program_Name: e.target.value })}
              placeholder="Ej. Desarrollo de Software"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Registrar"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ProgramForm;
