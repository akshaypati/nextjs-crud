import React, { FormEventHandler, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { deleteEmployee, editEmployee } from '@/server/api';
import { MdEditDocument } from 'react-icons/md';
import { BsTrashFill } from 'react-icons/bs';
import { FaEye } from 'react-icons/fa';
import { IEmployees } from '@/interface/employees';
import EditEmployeeModal from './EditEmployeeModal';
import DeleteEmployeeModal from './DeleteEmployeeModal';
import ViewEmployeeModal from './ViewEmployeeModal';

interface EmployeeProps {
  employee: IEmployees;
  onEmployeeUpdated: () => void;
}

const Employee: React.FC<EmployeeProps> = ({ employee, onEmployeeUpdated }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [fnameToEdit, setFnameToEdit] = useState<string>(employee.firstName);
  const [lnameToEdit, setLnameToEdit] = useState<string>(employee.lastName);
  const [contactToEdit, setContactToEdit] = useState<string>(employee.contact);
  const [emailToEdit, setEmailToEdit] = useState<string>(employee.email);
  const [addressToEdit, setAddressToEdit] = useState<string>(employee.address);
  const [bloodGroupToEdit, setBloodGroupToEdit] = useState<string>(employee.bloodgroup);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [openModalView, setOpenModalView] = useState<boolean>(false);

  useEffect(() => {
    setFnameToEdit(employee.firstName);
    setLnameToEdit(employee.lastName);
    setContactToEdit(employee.contact);
    setEmailToEdit(employee.email);
    setAddressToEdit(employee.address);
    setBloodGroupToEdit(employee.bloodgroup);
  }, [employee]);

  const handleSubmitEditEmployee: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editEmployee({
      id: employee.id,
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
    onEmployeeUpdated();
  };

  const handleDeleteEmployee = async (id: string) => {
    await deleteEmployee(id);
    setOpenModalDelete(false);
    onEmployeeUpdated();
  };

  const handleViewEmployee = () => {
    setOpenModalView(true);
  };

  return (
    <tr key={employee.id}>
      <td>{employee.id}</td>
      <td>{employee.firstName}</td>
      <td>{employee.lastName}</td>
      <td className="flex gap-5">
        <MdEditDocument
          onClick={() => setOpenModalEdit(true)}
          cursor="pointer"
          className="text-blue-500"
          size={20}
        />
        <BsTrashFill
          onClick={() => setOpenModalDelete(true)}
          cursor="pointer"
          className="text-red-500"
          size={20}
        />
        <FaEye
          onClick={handleViewEmployee}
          cursor="pointer"
          className="text-blue-500"
          size={20}
        />
        {/* Modals */}
        <EditEmployeeModal
          isOpen={openModalEdit}
          onClose={() => setOpenModalEdit(false)}
          employee={employee}
          onEmployeeUpdated={onEmployeeUpdated}
        />
        <DeleteEmployeeModal
          isOpen={openModalDelete}
          onClose={() => setOpenModalDelete(false)}
          employeeId={employee.id}
          onEmployeeUpdated={onEmployeeUpdated}
        />
        <ViewEmployeeModal
          isOpen={openModalView}
          onClose={() => setOpenModalView(false)}
          employee={employee}
        />
      </td>
    </tr>
  );
};

export default Employee;
