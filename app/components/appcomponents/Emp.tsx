"use client";
import { IEmployees } from "@/interface/employees";
import { MdEditDocument } from "react-icons/md";
import { BsTrashFill } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { FormEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteEmployee, editEmployee } from "@/server/api";
import DeleteEmployeeModal from "../modal/DeleteEmployeeModal";
import ViewEmployeeModal from "../modal/ViewEmployeeModal";
import EditEmployeeModal from "../modal/EditEmployeeModalContent";

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

  // Set initial state values when the component mounts or when 'emp' changes
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

// "use client";
// import { IEmployees } from "@/interface/employees";
// import { MdEditDocument } from "react-icons/md";
// import { BsTrashFill } from "react-icons/bs";
// import { FaEye } from "react-icons/fa";
// import { FormEventHandler, useEffect, useState } from "react";
// import Modal from "./Modal";
// import { useRouter } from "next/navigation";
// import { deleteEmployee, editEmployee } from "@/api";

// interface EmpProps {
//   emp: IEmployees;
// }

// const Emp: React.FC<EmpProps> = ({ emp }) => {
//   const router = useRouter();
//   const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
//   const [fnameToEdit, setFnameToEdit] = useState<string>(emp.firstName);
//   const [lnameToEdit, setLnameToEdit] = useState<string>(emp.lastName);
//   const [contactToEdit, setContactToEdit] = useState<string>(emp.contact);
//   const [emailToEdit, setEmailToEdit] = useState<string>(emp.email);
//   const [addressToEdit, setAddressToEdit] = useState<string>(emp.address);
//   const [bloodGroupToEdit, setBloodGroupToEdit] = useState<string>(emp.bloodgroup);
//   const [openModalDelete,setOpenModalDelete] =useState<boolean>(false);
//   const [openModalView, setOpenModalView] = useState<boolean>(false);

//   // Set initial state values when the component mounts or when 'emp' changes
//   useEffect(() => {
//     setFnameToEdit(emp.firstName);
//     setLnameToEdit(emp.lastName);
//     setContactToEdit(emp.contact);
//     setEmailToEdit(emp.email);
//     setAddressToEdit(emp.address);
//     setBloodGroupToEdit(emp.bloodgroup);
//   }, [emp]);

//   const handleSubmitEditEmployee: FormEventHandler<HTMLFormElement> = async (e) => {
//     e.preventDefault();
//     await editEmployee({
//         id: emp.id,
//         firstName:fnameToEdit,
//         lastName:lnameToEdit,
//         contact:contactToEdit,
//         email:emailToEdit,
//         address:addressToEdit,
//         bloodgroup:bloodGroupToEdit
//     })
//     setFnameToEdit('');
//     setLnameToEdit('');
//     setOpenModalEdit(false);
//     router.refresh();
//   };

//   const handleDeleteEmployee = async (id:string)=>{
//     await deleteEmployee(id);
//     setOpenModalDelete(false);
//     router.refresh();
//   }

//   const handleViewEmployee = () => {
//     setOpenModalView(true);
//   };

//   return (
//     <tr key={emp.id}>
//       <td>{emp.id}</td>
//       <td>{emp.firstName}</td>
//       <td>{emp.lastName}</td>
//       <td className='flex gap-5'>
//         <MdEditDocument onClick={() => setOpenModalEdit(true)} cursor='pointer' className='text-blue-500' size={20} />
//            {/* Edit Modal */}

//            <Modal modalOpen={openModalEdit} setModalOpen={() => setOpenModalEdit(false)}>
//   <form onSubmit={handleSubmitEditEmployee}>
//     <h3 className='font-bold text-lg'>Edit Employee Details</h3>
//     <table className="table-auto w-full mt-4">
//       <tbody>
//         <tr>
//           <td className="border px-4 py-2 font-semibold">Id:</td>
//           <td className="border px-4 py-2">{emp.id}</td>
//         </tr>
//         <tr>
//           <td className="border px-4 py-2 font-semibold">First Name:</td>
//           <td className="border px-4 py-2">
//             <div className='input-group'>
//               <label htmlFor='firstName' className='input-label sr-only'>
//                 First Name:
//               </label>
//               <input
//                 id='firstName'
//                 value={fnameToEdit}
//                 onChange={(e) => setFnameToEdit(e.target.value)}
//                 type='text'
//                 placeholder='Enter First Name'
//                 className='input input-bordered'
//               />
//             </div>
//           </td>
//         </tr>
//         <tr>
//           <td className="border px-4 py-2 font-semibold">Last Name:</td>
//           <td className="border px-4 py-2">
//             <div className='input-group'>
//               <label htmlFor='lastName' className='input-label sr-only'>
//                 Last Name:
//               </label>
//               <input
//                 id='lastName'
//                 value={lnameToEdit}
//                 onChange={(e) => setLnameToEdit(e.target.value)}
//                 type='text'
//                 placeholder='Enter Last Name'
//                 className='input input-bordered'
//               />
//             </div>
//           </td>
//         </tr>
//         <tr>
//           <td className="border px-4 py-2 font-semibold">Contact:</td>
//           <td className="border px-4 py-2">
//             <div className='input-group'>
//               <label htmlFor='contact' className='input-label sr-only'>
//                 Contact:
//               </label>
//               <input
//                 id='contact'
//                 value={contactToEdit}
//                 onChange={(e) => setContactToEdit(e.target.value)}
//                 type='text'
//                 placeholder='Enter contact details'
//                 className='input input-bordered'
//               />
//             </div>
//           </td>
//         </tr>
//         <tr>
//           <td className="border px-4 py-2 font-semibold">Address:</td>
//           <td className="border px-4 py-2">
//             <div className='input-group'>
//               <label htmlFor='address' className='input-label sr-only'>
//                 Address:
//               </label>
//               <input
//                 id='address'
//                 value={addressToEdit}
//                 onChange={(e) => setAddressToEdit(e.target.value)}
//                 type='text'
//                 placeholder='Enter address'
//                 className='input input-bordered'
//               />
//             </div>
//           </td>
//         </tr>
//         <tr>
//           <td className="border px-4 py-2 font-semibold">Blood Group:</td>
//           <td className="border px-4 py-2">
//             <div className='input-group'>
//               <label htmlFor='bloodGroup' className='input-label sr-only'>
//                 Blood Group:
//               </label>
//               <input
//                 id='bloodGroup'
//                 value={bloodGroupToEdit}
//                 onChange={(e) => setBloodGroupToEdit(e.target.value)}
//                 type='text'
//                 placeholder='Enter blood group'
//                 className='input input-bordered'
//               />
//             </div>
//           </td>
//         </tr>
//       </tbody>
//     </table>
//     <div className='modal-action'>
//       <button type='submit' className="btn">
//         Submit
//       </button>
//     </div>
//   </form>
// </Modal>

//         <BsTrashFill onClick={()=> setOpenModalDelete(true)} cursor='pointer' className='text-red-500' size={20} />
//            {/* Delete Modal */}
//         <Modal modalOpen={openModalDelete} setModalOpen={() => setOpenModalDelete(false)}>
//          <h3 className="text-lg">Are you sure you want to delte employee ?</h3>
//          <div className='modal-action'>
//         <button
//         onClick={()=> handleDeleteEmployee(emp.id)}
//         className='btn'
//         >Yes</button>
//          </div>
//         </Modal>
//         <FaEye onClick={()=>setOpenModalView(true)} cursor='pointer' className='text-blue-500' size={20} />
//           {/* View Modal */}
//       <Modal modalOpen={openModalView} setModalOpen={() => setOpenModalView(false)}>
//         <h3 className='font-bold text-lg'>Employee Details</h3>
//         <table className="table-auto w-full mt-4">
//           <tbody>
//             <tr>
//               <td className="border px-4 py-2 font-semibold">First Name:</td>
//               <td className="border px-4 py-2">{emp.firstName}</td>
//             </tr>
//             <tr>
//               <td className="border px-4 py-2 font-semibold">Last Name:</td>
//               <td className="border px-4 py-2">{emp.lastName}</td>
//             </tr>
//             <tr>
//               <td className="border px-4 py-2 font-semibold">Contact:</td>
//               <td className="border px-4 py-2">{emp.contact}</td>
//             </tr>
//             <tr>
//               <td className="border px-4 py-2 font-semibold">Address:</td>
//               <td className="border px-4 py-2">{emp.address}</td>
//             </tr>
//             <tr>
//               <td className="border px-4 py-2 font-semibold">BloodGroup:</td>
//               <td className="border px-4 py-2">{emp.bloodgroup}</td>
//             </tr>
//           </tbody>
//         </table>
//       </Modal>

//       </td>
//     </tr>
//   );
// };

// export default Emp;
