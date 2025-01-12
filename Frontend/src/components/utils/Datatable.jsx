"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DataTable({ Data, titlesData,handleDelete,handleUpdate, handleOpen, handleClose, isOpen}) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const itemsPerPage = 10;

  // Filtrar los datos por cédula o nombre
  const filteredData = Data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleRegister = () => {
    // Lógica para abrir un modal o redirigir a la página de registro
    setModalOpen(true);
    alert("Abriendo el modal de registro...");
  };

  return (
    <Card className="w-full max-w-4xl mx-auto p-4">
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold">
          Tabla de Datos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex space-x-2">
            {/* <Button
              variant="primary"
              onClick={handleRegister}
              className="mb-4 sm:mb-0">
              Registrar
            </Button> */}
            <Input
              placeholder="Filtrar por cédula o nombre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="sm:max-w-xs mb-4 sm:mb-0"
            />
          </div>
        </div>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              {titlesData.map((title, index) => (
                <TableHead key={index} className="text-left">
                  {title}
                </TableHead>
              ))}
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.length > 0 ? (
              currentItems.map((row, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-100 transition-colors"
                >
                  {Object.values(row).map((value, i) => (
                    <TableCell key={i} className="px-4 py-2">
                      {value}
                    </TableCell>
                  ))}
                  <TableCell className="px-4 py-2 text-center space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => [handleUpdate(row.program_Id), handleOpen()]}
                      className="text-blue-500 hover:bg-blue-50"
                    >
                      Actualizar
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleDelete(row.program_Id)}
                      className="text-red-500 hover:bg-red-50"
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={titlesData.length + 1}
                  className="text-center text-gray-500"
                >
                  No se encontraron datos.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Paginación */}
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="mb-4 sm:mb-0"
          >
            Anterior
          </Button>
          <span className="text-gray-700">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Siguiente
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
