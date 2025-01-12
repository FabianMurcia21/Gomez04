import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

function ModalDialog({ 
    TitlePage, 
    FormComponent, 
    programToUpdate, 
    updateProgram, 
    handleAddProgram 
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false); // Define si es "Agregar" o "Actualizar"

    // Abrir modal para "Agregar"
    const handleOpenAdd = () => {
        setIsUpdating(false); // Modo agregar
        setIsOpen(true);
    };

    // Abrir modal para "Actualizar"
    const handleOpenUpdate = () => {
        setIsUpdating(true); // Modo actualizar
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            {/* Botón para abrir el formulario de agregar */}
            <Button 
                onClick={handleOpenAdd} 
                className="bg-blue-500 ms-72 mb-3 text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 rounded-lg px-4 py-2 shadow-md"
            >
                Agregar {TitlePage}
            </Button>

            {/* Botón para abrir el formulario de actualizar */}
            {programToUpdate && (
                <Button 
                    variant="outline" 
                    onClick={handleOpenUpdate} 
                    className="bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-4 focus:ring-gray-200 rounded-lg px-4 py-2 shadow-md ml-2"
                >
                    Actualizar {TitlePage}
                </Button>
            )}

            {/* Modal que reutiliza el mismo FormComponent */}
            <Dialog open={isOpen} onOpenChange={handleClose}>
                <DialogContent 
                    className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto"
                >
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-center text-gray-900">
                            {isUpdating ? "Actualizar" : "Agregar"} {TitlePage}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                        {isUpdating ? (
                            <FormComponent 
                                programToUpdate={programToUpdate} 
                                updateProgram={updateProgram} 
                            />
                        ) : (
                            <FormComponent 
                                handleAddProgram={handleAddProgram} 
                            />
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default ModalDialog;
