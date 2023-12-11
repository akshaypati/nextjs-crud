"use client";
import { FaPlus } from "react-icons/fa";
import Modal from "../modal/Modal";
import { FormEventHandler, useState } from "react";
import { addEmployee } from "@/server/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import AddEmployeeModal from "../crudModals/AddEmployeeModal";

const AddEmployee = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newEmpValue, setNewEmpValue] = useState<{
    id: string;
    firstName: string;
    lastName: string;
    contact: string;
    email: string;
    address: string;
    bloodgroup: string;
  }>({
    id: uuidv4(),
    firstName: "",
    lastName: "",
    contact: "",
    email: "",
    address: "",
    bloodgroup: "",
  });

  const handleSubmitNewEmployee: FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    await addEmployee({
      id: newEmpValue.id,
      firstName: newEmpValue.firstName,
      lastName: newEmpValue.lastName,
      contact: newEmpValue.contact,
      email: newEmpValue.email,
      address: newEmpValue.address,
      bloodgroup: newEmpValue.bloodgroup,
    });
    setNewEmpValue({
      id: "",
      firstName: "",
      lastName: "",
      contact: "",
      email: "",
      address: "",
      bloodgroup: "",
    });
    setModalOpen(false);
    router.refresh();
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-accent btn-outline float-right hover:bg-red-300"
      >
        Add Employee
        <FaPlus className="ml-1" size={15} />
      </button>
      <AddEmployeeModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        newEmpValue={newEmpValue}
        setNewEmpValue={setNewEmpValue}
        handleSubmitNewEmployee={handleSubmitNewEmployee}
      />
    </div>
   
  );
};

export default AddEmployee;









