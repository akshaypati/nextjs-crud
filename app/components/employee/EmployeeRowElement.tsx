"use client";
import { IEmployees } from "@/app/interface/employees";
import { MdEditDocument } from "react-icons/md";
import { BsTrashFill } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { FormEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteEmployee, editEmployee } from "@/server/api";
import DeleteEmployeeModal from "../crudModals/DeleteEmployeeModal";
import ViewEmployeeModal from "../crudModals/ViewEmployeeModal";
import EditEmployeeModal from "../crudModals/EditEmployeeModal";

interface EmpProps {
  emp: IEmployees;
}

const Emp: React.FC<EmpProps> = ({ emp }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [fnameToEdit, setFnameToEdit] = useState<string>(emp.firstName);
  const [lnameToEdit, setLnameToEdit] = useState<string>(emp.lastName);
  const [contactToEdit, setContactToEdit] = useState<string>(emp.contact);
  const [emailToEdit, setEmailToEdit] = useState<string>(emp.email);
  const [addressToEdit, setAddressToEdit] = useState<string>(emp.address);
  const [bloodGroupToEdit, setBloodGroupToEdit] = useState<string>(
    emp.bloodgroup
  );
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [openModalView, setOpenModalView] = useState<boolean>(false);

  //initial state values when the component mounts or when 'emp' changes
  useEffect(() => {
    setFnameToEdit(emp.firstName);
    setLnameToEdit(emp.lastName);
    setContactToEdit(emp.contact);
    setEmailToEdit(emp.email);
    setAddressToEdit(emp.address);
    setBloodGroupToEdit(emp.bloodgroup);
  }, [emp]);

  const handleSubmitEditEmployee: FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    await editEmployee({
      id: emp.id,
      firstName: fnameToEdit,
      lastName: lnameToEdit,
      contact: contactToEdit,
      email: emailToEdit,
      address: addressToEdit,
      bloodgroup: bloodGroupToEdit,
    });
    setFnameToEdit("");
    setLnameToEdit("");
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteEmployee = async (id: string) => {
    await deleteEmployee(id);
    setOpenModalDelete(false);
    router.refresh();
  };

  const handleViewEmployee = () => {
    setOpenModalView(true);
  };

  return (
    <tr key={emp.id}>
      <td>{emp.id}</td>
      <td>{emp.firstName}</td>
      <td>{emp.lastName}</td>
      <td className="flex gap-5">
        <MdEditDocument
          onClick={() => setOpenModalEdit(true)}
          cursor="pointer"
          className="text-blue-500"
          size={20}
        />
        {/* Edit Modal */}
        <EditEmployeeModal
          isOpen={openModalEdit}
          onClose={() => setOpenModalEdit(false)}
          employee={emp}
        />
        <BsTrashFill
          onClick={() => setOpenModalDelete(true)}
          cursor="pointer"
          className="text-red-500"
          size={20}
        />
        {/* Delete Modal */}
        <DeleteEmployeeModal
          isOpen={openModalDelete}
          onClose={() => setOpenModalDelete(false)}
          employeeId={emp.id}
        />
        <FaEye
          onClick={() => setOpenModalView(true)}
          cursor="pointer"
          className="text-blue-500"
          size={20}
        />
        {/* View Modal */}
        <ViewEmployeeModal
          isOpen={openModalView}
          onClose={() => setOpenModalView(false)}
          employee={emp}
        />
      </td>
    </tr>
  );
};

export default Emp;
