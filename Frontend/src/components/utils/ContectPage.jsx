import { useState } from "react";
import DataTable from "./Datatable";
import ModalDialog from "./ModalDialog";

function ContecPage({
  TitlePage,
  Data,
  titlesData,
  FormComponent,
  handleDelete,
  handleUpdate,
  programToUpdate,
  updateProgram,
  FormUpdate,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleCloseForm = () => {
    setIsOpen(false);
  };
  return (
    <div className="mt-20">
      <h1 className="flex justify-center text-2xl">{TitlePage}</h1>
      <ModalDialog
        FormComponent={FormComponent}
        programToUpdate={programToUpdate}
        updateProgram={updateProgram}
        titlesData={titlesData} 
        handleOpen={handleOpen}
        handleClose={handleCloseForm}
        isOpen={isOpen}
      />
      <div>
        <DataTable
          Data={Data}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate} // Pasa la función de actualización
          titlesData={titlesData}
          handleOpen={handleOpen}
          handleClose={handleCloseForm}
          isOpen={isOpen}
        />
      </div>
    </div>
  );
}

export default ContecPage;


