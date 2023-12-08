// "use client"
// import React, { FormEventHandler, useState } from 'react';
// import { FaPlus } from 'react-icons/fa';
// import Modal from './Modal';
// import { addEmployee } from '@/server/api';
// import { useRouter } from 'next/router';
// import { v4 as uuidv4 } from 'uuid';

// interface AddEmployeeProps {
//   onEmployeeAdded: () => void;
// }

// const AddEmployeeForm: React.FC<AddEmployeeProps> = ({ onEmployeeAdded }) => {
//   const router = useRouter();
//   const [modalOpen, setModalOpen] = useState<boolean>(false);
//   const [newEmpValue, setNewEmpValue] = useState<{
//     id: string;
//     firstName: string;
//     lastName: string;
//     contact: string;
//     email: string;
//     address: string;
//     bloodgroup: string;
//   }>({
//     id: uuidv4(),
//     firstName: '',
//     lastName: '',
//     contact: '',
//     email: '',
//     address: '',
//     bloodgroup: '',
//   });

//   const handleSubmitNewEmployee: FormEventHandler<HTMLFormElement> = async (e) => {
//     e.preventDefault();
//     await addEmployee({
//       id: newEmpValue.id,
//       firstName: newEmpValue.firstName,
//       lastName: newEmpValue.lastName,
//       contact: newEmpValue.contact,
//       email: newEmpValue.email,
//       address: newEmpValue.address,
//       bloodgroup: newEmpValue.bloodgroup,
//     });
//     setNewEmpValue({
//       id: '',
//       firstName: '',
//       lastName: '',
//       contact: '',
//       email: '',
//       address: '',
//       bloodgroup: '',
//     });
//     setModalOpen(false);
//     onEmployeeAdded();
//   };

//   return (
//     <div>
//       <button onClick={() => setModalOpen(true)} className="btn btn-primary float-right">
//         Add Emp<FaPlus className="ml-1" size={15} />
//       </button>
//       <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
//       <form onSubmit={handleSubmitNewEmployee}>
//     <h3 className='font-bold text-lg'>Add New Employee</h3>
//     <table className="table-auto w-full mt-4">
//       <tbody>
//         <tr>
//           <td className="border px-4 py-2 font-semibold">ID:</td>
//           <td className="border px-4 py-2">
//             <div className='input-group'>
//               <label htmlFor='id' className='input-label sr-only'>
//                 ID:
//               </label>
//               <input
//                 id='id'
//                 value={newEmpValue.id}
//                 onChange={(e) => setNewEmpValue({ ...newEmpValue, id: e.target.value })}
//                 type='text'
//                 placeholder='Enter ID'
//                 className='input input-bordered'
//               />
//             </div>
//           </td>
//         </tr>
//         <tr>
//           <td className="border px-4 py-2 font-semibold">First Name:</td>
//           <td className="border px-4 py-2 ">
//             <div className='input-group'>
//               <label htmlFor='firstName' className='input-label sr-only'>
//                 First Name:
//               </label>
//               <input
//                 id='firstName'
//                 value={newEmpValue.firstName}
//                 onChange={(e) => setNewEmpValue({ ...newEmpValue, firstName: e.target.value })}
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
//                 value={newEmpValue.lastName}
//                 onChange={(e) => setNewEmpValue({ ...newEmpValue, lastName: e.target.value })}
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
//                 value={newEmpValue.contact}
//                 onChange={(e) => setNewEmpValue({ ...newEmpValue, contact: e.target.value })}
//                 type='text'
//                 placeholder='Enter Contact Details'
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
//                 value={newEmpValue.bloodgroup}
//                 onChange={(e) => setNewEmpValue({ ...newEmpValue, bloodgroup: e.target.value })}
//                 type='text'
//                 placeholder='Enter Blood Group'
//                 className='input input-bordered'
//               />
//             </div>
//           </td>
//         </tr>
//         {/* Add more details as needed */}
//       </tbody>
//     </table>
//     <div className='modal-action'>
//       <button type='submit' className="btn">
//         Submit
//       </button>
//     </div>
//   </form>
//       </Modal>
//     </div>
//   );
// };

// export default AddEmployeeForm;