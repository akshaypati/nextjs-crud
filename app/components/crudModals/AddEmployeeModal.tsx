import React, { useState } from "react";
import { FormEventHandler } from "react";
import Modal from "../modal/Modal";

interface AddEmployeeModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newEmpValue: {
    id: string;
    firstName: string;
    lastName: string;
    contact: string;
    email: string;
    address: string;
    bloodgroup: string;
  };
  setNewEmpValue: React.Dispatch<
    React.SetStateAction<{
      id: string;
      firstName: string;
      lastName: string;
      contact: string;
      email: string;
      address: string;
      bloodgroup: string;
    }>
  >;
  handleSubmitNewEmployee: FormEventHandler<HTMLFormElement>;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  modalOpen,
  setModalOpen,
  newEmpValue,
  setNewEmpValue,
  handleSubmitNewEmployee,
}) => {
  const [isFirstNameValid, setIsFirstNameValid] = useState(true);
  const [isLastNameValid, setIsLastNameValid] = useState(true);
  const [isContactValid, setIsContactValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isAddressValid, setIsAddressValid] = useState(true);
  const [isBloodGroupValid, setIsBloodGroupValid] = useState(true);

  const isValidName = (value: string) => /^[A-Za-z]+$/.test(value);
  const isValidContact = (value: string) => /^\d+$/.test(value);
  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isValidField = (value: string) => value.trim() !== "";

  const isFormValid = () => {
    return (
      isValidField(newEmpValue.id) &&
      isValidName(newEmpValue.firstName) &&
      isValidName(newEmpValue.lastName) &&
      isValidContact(newEmpValue.contact) &&
      isValidEmail(newEmpValue.email) &&
      isValidField(newEmpValue.address) &&
      isValidField(newEmpValue.bloodgroup)
    );
  };

  const updateFieldAndValidation = (
    field: string,
    value: string,
    validationFunction: (value: string) => boolean,
    setValidationState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setNewEmpValue((prevValue) => ({
      ...prevValue,
      [field]: value,
    }));
    setValidationState(validationFunction(value));
  };

  const handleFieldChange = (
    field: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    updateFieldAndValidation(
      field,
      value,
      field === "firstName" || field === "lastName"
        ? isValidName
        : field === "contact"
        ? isValidContact
        : field === "email"
        ? isValidEmail
        : isValidField,
      field === "firstName"
        ? setIsFirstNameValid
        : field === "lastName"
        ? setIsLastNameValid
        : field === "contact"
        ? setIsContactValid
        : field === "email"
        ? setIsEmailValid
        : field === "address"
        ? setIsAddressValid
        : setIsBloodGroupValid
    );
  };

  return (
    <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <form onSubmit={handleSubmitNewEmployee}>
        <h3 className="font-bold text-lg">Add Employee</h3>
        <table className="table w-full border-collapse border border-red-300">
          <tbody>
            <tr>
              <td className="border px-4 py-2 font-semibold">ID:</td>
              <td className="border px-4 py-2">
                <input
                  id="id"
                  value={newEmpValue.id}
                  onChange={(e) =>
                    setNewEmpValue({ ...newEmpValue, id: e.target.value })
                  }
                  type="text"
                  placeholder="Enter ID"
                  className="input input-bordered w-full"
                />
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">First Name:</td>
              <td className="border px-4 py-2">
                <div className="input-group">
                  <label htmlFor="firstName" className="input-label sr-only">
                    First Name:
                  </label>
                  <input
                    id="firstName"
                    value={newEmpValue.firstName}
                    onChange={(e) => handleFieldChange("firstName", e)}
                    type="text"
                    placeholder="Enter First Name"
                    className={`input input-bordered w-full ${
                      isFirstNameValid ? "" : "border-red-500"
                    }`}
                  />
                  {!isFirstNameValid && (
                    <p className="text-red-500 text-sm">
                      Numbers are not allowed
                    </p>
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Last Name:</td>
              <td className="border px-4 py-2">
                <div className="input-group">
                  <label htmlFor="lastName" className="input-label sr-only">
                    Last Name:
                  </label>
                  <input
                    id="lastName"
                    value={newEmpValue.lastName}
                    onChange={(e) => handleFieldChange("lastName", e)}
                    type="text"
                    placeholder="Enter Last Name"
                    className={`input input-bordered w-full ${
                      isLastNameValid ? "" : "border-red-500"
                    }`}
                  />
                  {!isLastNameValid && (
                    <p className="text-red-500 text-sm">
                      Numbers are not allowed
                    </p>
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Contact:</td>
              <td className="border px-4 py-2">
                <div className="input-group">
                  <label htmlFor="contact" className="input-label sr-only">
                    Contact:
                  </label>
                  <input
                    id="contact"
                    value={newEmpValue.contact}
                    onChange={(e) => handleFieldChange("contact", e)}
                    type="text"
                    placeholder="Enter Contact Details"
                    className={`input input-bordered w-full ${
                      isContactValid ? "" : "border-red-500"
                    }`}
                  />
                  {!isContactValid && (
                    <p className="text-red-500 text-sm">
                      Only numbers are allowed
                    </p>
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Email:</td>
              <td className="border px-4 py-2">
                <div className="input-group">
                  <label htmlFor="email" className="input-label sr-only">
                    Email:
                  </label>
                  <input
                    id="email"
                    value={newEmpValue.email}
                    onChange={(e) => handleFieldChange("email", e)}
                    type="email"
                    placeholder="Enter Email"
                    className={`input input-bordered w-full ${
                      isEmailValid ? "" : "border-red-500"
                    }`}
                  />
                  {!isEmailValid && (
                    <p className="text-red-500 text-sm">
                      Enter a valid email address
                    </p>
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Address:</td>
              <td className="border px-4 py-2">
                <div className="input-group">
                  <label htmlFor="address" className="input-label sr-only">
                    Address:
                  </label>
                  <input
                    id="address"
                    value={newEmpValue.address}
                    onChange={(e) => handleFieldChange("address", e)}
                    type="text"
                    placeholder="Enter Address"
                    className={`input input-bordered w-full ${
                      isAddressValid ? "" : "border-red-500"
                    }`}
                  />
                  {!isAddressValid && (
                    <p className="text-red-500 text-sm">
                      This field cannot be empty
                    </p>
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Blood Group:</td>
              <td className="border px-4 py-2">
                <div className="input-group">
                  <label htmlFor="bloodGroup" className="input-label sr-only">
                    Blood Group:
                  </label>
                  <input
                    id="bloodGroup"
                    value={newEmpValue.bloodgroup}
                    onChange={(e) => handleFieldChange("bloodgroup", e)}
                    type="text"
                    placeholder="Enter Blood Group"
                    className={`input input-bordered w-full ${
                      isBloodGroupValid ? "" : "border-red-500"
                    }`}
                  />
                  {!isBloodGroupValid && (
                    <p className="text-red-500 text-sm">
                      This field cannot be empty
                    </p>
                  )}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="btn btn-outline ml-auto transition-colors duration-300 ease-in-out hover:bg-green-200 text-sm"
            style={{
              backgroundColor: isFormValid() ? "#E5E5E5" : "#F3F4F6",
              borderColor: "#E5E5E5",
              fontSize: "0.8rem",
            }}
            disabled={!isFormValid()}
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddEmployeeModal;

















// import React, { useState } from "react";
// import { FormEventHandler } from "react";
// import Modal from "../modal/Modal";

// interface AddEmployeeModalProps {
//   modalOpen: boolean;
//   setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   newEmpValue: {
//     id: string;
//     firstName: string;
//     lastName: string;
//     contact: string;
//     email: string;
//     address: string;
//     bloodgroup: string;
//   };
//   setNewEmpValue: React.Dispatch<
//     React.SetStateAction<{
//       id: string;
//       firstName: string;
//       lastName: string;
//       contact: string;
//       email: string;
//       address: string;
//       bloodgroup: string;
//     }>
//   >;
//   handleSubmitNewEmployee: FormEventHandler<HTMLFormElement>;
// }

// const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
//   modalOpen,
//   setModalOpen,
//   newEmpValue,
//   setNewEmpValue,
//   handleSubmitNewEmployee,
// }) => {
//   const [isFirstNameValid, setIsFirstNameValid] = useState(true);
//   const [isLastNameValid, setIsLastNameValid] = useState(true);
//   const [isContactValid, setIsContactValid] = useState(true);
//   const [isEmailValid, setIsEmailValid] = useState(true);
//   const [isAddressValid, setIsAddressValid] = useState(true);
//   const [isBloodGroupValid, setIsBloodGroupValid] = useState(true);

//   const isValidName = (value: string) => /^[A-Za-z]+$/.test(value);
//   const isValidContact = (value: string) => /^\d+$/.test(value);
//   const isValidEmail = (value: string) =>
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
//   const isValidField = (value: string) => value.trim() !== "";

//   const isFormValid = () => {
//     return (
//       isValidField(newEmpValue.id) &&
//       isValidName(newEmpValue.firstName) &&
//       isValidName(newEmpValue.lastName) &&
//       isValidContact(newEmpValue.contact) &&
//       isValidEmail(newEmpValue.email) &&
//       isValidField(newEmpValue.address) &&
//       isValidField(newEmpValue.bloodgroup)
//     );
//   };

//   const updateFieldAndValidation = (
//     field: string,
//     value: string,
//     validationFunction: (value: string) => boolean,
//     setValidationState: React.Dispatch<React.SetStateAction<boolean>>
//   ) => {
//     setNewEmpValue((prevValue) => ({
//       ...prevValue,
//       [field]: value,
//     }));
//     setValidationState(validationFunction(value));
//   };

//   const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     updateFieldAndValidation(
//       "firstName",
//       value,
//       isValidName,
//       setIsFirstNameValid
//     );
//   };

//   const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     updateFieldAndValidation(
//       "lastName",
//       value,
//       isValidName,
//       setIsLastNameValid
//     );
//   };

//   const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     updateFieldAndValidation(
//       "contact",
//       value,
//       isValidContact,
//       setIsContactValid
//     );
//   };

//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     updateFieldAndValidation("email", value, isValidEmail, setIsEmailValid);
//   };

//   const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     updateFieldAndValidation("address", value, isValidField, setIsAddressValid);
//   };

//   const handleBloodGroupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     updateFieldAndValidation(
//       "bloodgroup",
//       value,
//       isValidField,
//       setIsBloodGroupValid
//     );
//   };

//   return (
//     <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
//       <form onSubmit={handleSubmitNewEmployee}>
//         <h3 className="font-bold text-lg">Add Employee</h3>
//         <table className="table w-full border-collapse border border-red-300">
//           <tbody>
//             <tr>
//               <td className="w-1/6 font-semibold">ID:</td>
//               <td className="w-5/6">
//                 <input
//                   id="id"
//                   value={newEmpValue.id}
//                   onChange={(e) =>
//                     setNewEmpValue({ ...newEmpValue, id: e.target.value })
//                   }
//                   type="text"
//                   placeholder="Enter ID"
//                   className="input input-bordered w-full"
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td className="w-1/6 font-semibold">First Name:</td>
//               <td className="w-5/6">
//                 <input
//                   id="firstName"
//                   value={newEmpValue.firstName}
//                   onChange={handleFirstNameChange}
//                   type="text"
//                   placeholder="Enter First Name"
//                   className={`input input-bordered w-full ${
//                     isFirstNameValid ? "" : "border-red-500"
//                   }`}
//                 />
//                 {!isFirstNameValid && (
//                   <p className="text-red-500 text-sm">
//                     Numbers are not allowed
//                   </p>
//                 )}
//               </td>
//             </tr>
//             <tr>
//               <td className="w-1/6 font-semibold">Last Name:</td>
//               <td className="w-5/6">
//                 <input
//                   id="lastName"
//                   value={newEmpValue.lastName}
//                   onChange={handleLastNameChange}
//                   type="text"
//                   placeholder="Enter Last Name"
//                   className={`input input-bordered w-full ${
//                     isLastNameValid ? "" : "border-red-500"
//                   }`}
//                 />
//                 {!isLastNameValid && (
//                   <p className="text-red-500 text-sm">
//                     Numbers are not allowed
//                   </p>
//                 )}
//               </td>
//             </tr>
//             <tr>
//               <td className="w-1/6 font-semibold">Contact:</td>
//               <td className="w-5/6">
//                 <input
//                   id="contact"
//                   value={newEmpValue.contact}
//                   onChange={handleContactChange}
//                   type="text"
//                   placeholder="Enter Contact Details"
//                   className={`input input-bordered w-full ${
//                     isContactValid ? "" : "border-red-500"
//                   }`}
//                 />
//                 {!isContactValid && (
//                   <p className="text-red-500 text-sm">
//                     Only numbers are allowed
//                   </p>
//                 )}
//               </td>
//             </tr>
//             <tr>
//               <td className="w-1/6 font-semibold">Email:</td>
//               <td className="w-5/6">
//                 <input
//                   id="email"
//                   value={newEmpValue.email}
//                   onChange={handleEmailChange}
//                   type="email"
//                   placeholder="Enter Email"
//                   className={`input input-bordered w-full ${
//                     isEmailValid ? "" : "border-red-500"
//                   }`}
//                 />
//                 {!isEmailValid && (
//                   <p className="text-red-500 text-sm">
//                     Enter a valid email address
//                   </p>
//                 )}
//               </td>
//             </tr>
//             <tr>
//               <td className="w-1/6 font-semibold">Address:</td>
//               <td className="w-5/6">
//                 <input
//                   id="address"
//                   value={newEmpValue.address}
//                   onChange={handleAddressChange}
//                   type="text"
//                   placeholder="Enter Address"
//                   className={`input input-bordered w-full ${
//                     isAddressValid ? "" : "border-red-500"
//                   }`}
//                 />
//                 {!isAddressValid && (
//                   <p className="text-red-500 text-sm">
//                     This field cannot be empty
//                   </p>
//                 )}
//               </td>
//             </tr>
//             <tr>
//               <td className="w-1/6 font-semibold">Blood Group:</td>
//               <td className="w-5/6">
//                 <input
//                   id="bloodGroup"
//                   value={newEmpValue.bloodgroup}
//                   onChange={handleBloodGroupChange}
//                   type="text"
//                   placeholder="Enter Blood Group"
//                   className={`input input-bordered w-full ${
//                     isBloodGroupValid ? "" : "border-red-500"
//                   }`}
//                 />
//                 {!isBloodGroupValid && (
//                   <p className="text-red-500 text-sm">
//                     This field cannot be empty
//                   </p>
//                 )}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//         <div className="mt-6 flex justify-end">
//           <button
//             type="submit"
//             className="btn btn-outline ml-auto transition-colors duration-300 ease-in-out hover:bg-green-200 text-sm"
//             style={{
//               backgroundColor: isFormValid() ? "#E5E5E5" : "#F3F4F6",
//               borderColor: "#E5E5E5",
//               fontSize: "0.8rem",
//             }}
//             disabled={!isFormValid()}
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </Modal>
//   );
// };

// export default AddEmployeeModal;
