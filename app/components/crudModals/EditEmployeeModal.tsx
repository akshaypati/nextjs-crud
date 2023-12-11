// EditEmployeeModal.tsx
import { IEmployees } from "@/app/interface/employees";
import { FormEventHandler, useEffect, useState } from "react";
import { editEmployee } from "@/server/api";
import { useRouter } from "next/navigation";
import Modal from "../modal/Modal";

interface EditEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: IEmployees;
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({
  isOpen,
  onClose,
  employee,
}) => {
  const router = useRouter();

  // State to manage form field values
  const [fnameToEdit, setFnameToEdit] = useState<string>(employee.firstName);
  const [lnameToEdit, setLnameToEdit] = useState<string>(employee.lastName);
  const [contactToEdit, setContactToEdit] = useState<string>(employee.contact);
  const [emailToEdit, setEmailToEdit] = useState<string>(employee.email);
  const [addressToEdit, setAddressToEdit] = useState<string>(employee.address);
  const [bloodGroupToEdit, setBloodGroupToEdit] = useState<string>(
    employee.bloodgroup
  );

  // State variables for validation
  const [isFirstNameValid, setIsFirstNameValid] = useState<boolean>(true);
  const [isLastNameValid, setIsLastNameValid] = useState<boolean>(true);
  const [isContactValid, setIsContactValid] = useState<boolean>(true);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isAddressValid, setIsAddressValid] = useState<boolean>(true);
  const [isBloodGroupValid, setIsBloodGroupValid] = useState<boolean>(true);

  useEffect(() => {
    // Update state when the employee prop changes
    setFnameToEdit(employee.firstName);
    setLnameToEdit(employee.lastName);
    setContactToEdit(employee.contact);
    setEmailToEdit(employee.email);
    setAddressToEdit(employee.address);
    setBloodGroupToEdit(employee.bloodgroup);
  }, [employee]);

  // (should not have numbers)
  const isValidName = (value: string) => /^[A-Za-z]+$/.test(value);

  // (should not have alphabets)
  const isValidContact = (value: string) => /^\d+$/.test(value);

  // (simple check for validity)
  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  // (should not be empty)
  const isValidField = (value: string) => value.trim() !== "";

  // Function to check overall form validity
  const isFormValid = () => {
    return (
      isFirstNameValid &&
      isLastNameValid &&
      isContactValid &&
      isEmailValid &&
      isAddressValid &&
      isBloodGroupValid
      
    );
  };

  //update form field value and validation state
  const updateFieldAndValidation = (
    field: string,
    value: string,
    validationFn: (val: string) => boolean,
    setValidationState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setValidationState(validationFn(value));
    switch (field) {
      case "firstName":
        setFnameToEdit(value);
        break;
      case "lastName":
        setLnameToEdit(value);
        break;
      case "contact":
        setContactToEdit(value);
        break;
      case "email":
        setEmailToEdit(value);
        break;
      case "address":
        setAddressToEdit(value);
        break;
      case "bloodgroup":
        setBloodGroupToEdit(value);
        break;
      default:
        break;
    }
  };

  // Function to handle field changes and perform validation
  const handleFieldChange = (
    field: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    switch (field) {
      case "firstName":
        updateFieldAndValidation(
          field,
          value,
          isValidName,
          setIsFirstNameValid
        );
        break;
      case "lastName":
        updateFieldAndValidation(field, value, isValidName, setIsLastNameValid);
        break;
      case "contact":
        updateFieldAndValidation(
          field,
          value,
          isValidContact,
          setIsContactValid
        );
        break;
      case "email":
        updateFieldAndValidation(field, value, isValidEmail, setIsEmailValid);
        break;
      case "address":
        updateFieldAndValidation(
          field,
          value,
          isValidField,
          setIsAddressValid
        );
        break;
      case "bloodgroup":
        updateFieldAndValidation(
          field,
          value,
          isValidField,
          setIsBloodGroupValid
        );
        break;
      default:
        break;
    }
  };

  const handleSubmitEditEmployee: FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();

    if (isFormValid()) {
      // Call the API to edit the employee
      await editEmployee({
        id: employee.id,
        firstName: fnameToEdit,
        lastName: lnameToEdit,
        contact: contactToEdit,
        email: emailToEdit,
        address: addressToEdit,
        bloodgroup: bloodGroupToEdit,
      });

      // Clear form fields
      setFnameToEdit("");
      setLnameToEdit("");
      setContactToEdit("");
      setEmailToEdit("");
      setAddressToEdit("");
      setBloodGroupToEdit("");

      // Close the modal and refresh the page
      onClose();
      router.refresh();
    } else {
      // Handle form not valid scenario (show error messages, etc.)
      console.error("Form is not valid. Please check the fields.");
    }
  };

  return (
    <Modal modalOpen={isOpen} setModalOpen={onClose}>
      <form onSubmit={handleSubmitEditEmployee}>
        <h3 className="font-bold text-lg">Edit Employee Details</h3>
        <table className="table w-full border-collapse border border-red-300">
          <tbody>
            <tr>
              <td className="border px-4 py-2 font-semibold">Id:</td>
              <td className="border px-4 py-2">{employee.id}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">First Name:</td>
              <td className="border px-4 py-2">
                <div className="input-group">
                  <label
                    htmlFor="firstName"
                    className="input-label sr-only"
                  >
                    First Name:
                  </label>
                  <input
                    id="firstName"
                    value={fnameToEdit}
                    onChange={(e) => handleFieldChange("firstName", e)}
                    type="text"
                    placeholder="Enter First Name"
                    className="input input-bordered"
                  />
                </div>
                {/* Validation message */}
                {isFirstNameValid ? null : (
                  <span className="text-red-500">Invalid first name</span>
                )}
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Last Name:</td>
              <td className="border px-4 py-2">
                <div className="input-group">
                  <label
                    htmlFor="lastName"
                    className="input-label sr-only"
                  >
                    Last Name:
                  </label>
                  <input
                    id="lastName"
                    value={lnameToEdit}
                    onChange={(e) => handleFieldChange("lastName", e)}
                    type="text"
                    placeholder="Enter Last Name"
                    className="input input-bordered"
                  />
                </div>
                {/* Validation message */}
                {isLastNameValid ? null : (
                  <span className="text-red-500">Invalid last name</span>
                )}
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Contact:</td>
              <td className="border px-4 py-2">
                <div className="input-group">
                  <label
                    htmlFor="contact"
                    className="input-label sr-only"
                  >
                    Contact:
                  </label>
                  <input
                    id="contact"
                    value={contactToEdit}
                    onChange={(e) => handleFieldChange("contact", e)}
                    type="text"
                    placeholder="Enter contact details"
                    className="input input-bordered"
                  />
                </div>
                {/* Validation message */}
                {isContactValid ? null : (
                  <span className="text-red-500">Invalid contact details</span>
                )}
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
                    value={emailToEdit}
                    onChange={(e) => handleFieldChange("email", e)}
                    type="text"
                    placeholder="Enter email"
                    className="input input-bordered"
                  />
                </div>
                {/* Validation message */}
                {isEmailValid ? null : (
                  <span className="text-red-500">Invalid email</span>
                )}
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Address:</td>
              <td className="border px-4 py-2">
                <div className="input-group">
                  <label
                    htmlFor="address"
                    className="input-label sr-only"
                  >
                    Address:
                  </label>
                  <input
                    id="address"
                    value={addressToEdit}
                    onChange={(e) => handleFieldChange("address", e)}
                    type="text"
                    placeholder="Enter address"
                    className="input input-bordered"
                  />
                </div>
                {/* Validation message */}
                {isAddressValid ? null : (
                  <span className="text-red-500">Invalid address</span>
                )}
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Blood Group:</td>
              <td className="border px-4 py-2">
                <div className="input-group">
                  <label
                    htmlFor="bloodGroup"
                    className="input-label sr-only"
                  >
                    Blood Group:
                  </label>
                  <input
                    id="bloodGroup"
                    value={bloodGroupToEdit}
                    onChange={(e) => handleFieldChange("bloodgroup", e)}
                    type="text"
                    placeholder="Enter blood group"
                    className="input input-bordered"
                  />
                </div>
                {/* Validation message */}
                {isBloodGroupValid ? null : (
                  <span className="text-red-500">Invalid blood group</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="modal-action">
          {/* Submit button with disabled attribute based on form validity */}
          <button
            type="submit"
            className="btn  btn-accent btn-outline hover:bg-red-300"
            disabled={!isFormValid()}
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditEmployeeModal;











// //EditEmployeeModal.tsx
// import { IEmployees } from "@/app/interface/employees";
// import { FormEventHandler, useEffect, useState } from "react";
// import { editEmployee } from "@/server/api";
// import { useRouter } from "next/navigation";
// import Modal from "../modal/Modal";

// interface EditEmployeeModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   employee: IEmployees;
// }

// const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({
//   isOpen,
//   onClose,
//   employee,
// }) => {
//   const router = useRouter();
//   const [fnameToEdit, setFnameToEdit] = useState<string>(employee.firstName);
//   const [lnameToEdit, setLnameToEdit] = useState<string>(employee.lastName);
//   const [contactToEdit, setContactToEdit] = useState<string>(employee.contact);
//   const [emailToEdit, setEmailToEdit] = useState<string>(employee.email);
//   const [addressToEdit, setAddressToEdit] = useState<string>(employee.address);
//   const [bloodGroupToEdit, setBloodGroupToEdit] = useState<string>(
//     employee.bloodgroup
//   );

//   useEffect(() => {
//     // Update state when the employee prop changes
//     setFnameToEdit(employee.firstName);
//     setLnameToEdit(employee.lastName);
//     setContactToEdit(employee.contact);
//     setEmailToEdit(employee.email);
//     setAddressToEdit(employee.address);
//     setBloodGroupToEdit(employee.bloodgroup);
//   }, [employee]);

//   const handleSubmitEditEmployee: FormEventHandler<HTMLFormElement> = async (
//     e
//   ) => {
//     e.preventDefault();
//     await editEmployee({
//       id: employee.id,
//       firstName: fnameToEdit,
//       lastName: lnameToEdit,
//       contact: contactToEdit,
//       email: emailToEdit,
//       address: addressToEdit,
//       bloodgroup: bloodGroupToEdit,
//     });
 
//     setFnameToEdit("");
//     setLnameToEdit("");
//     setContactToEdit("");
//     setEmailToEdit("");
//     setAddressToEdit("");
//     setBloodGroupToEdit("");
//      onClose();
//     router.refresh();
//   };

//   return (
//     <Modal modalOpen={isOpen} setModalOpen={onClose}>
//       <form onSubmit={handleSubmitEditEmployee}>
//         <h3 className="font-bold text-lg">Edit Employee Details</h3>
//         <table className="table w-full border-collapse border border-red-300">
//           <tbody>
//             <tr>
//               <td className="border px-4 py-2 font-semibold">Id:</td>
//               <td className="border px-4 py-2">{employee.id}</td>
//             </tr>
//             <tr>
//               <td className="border px-4 py-2 font-semibold">First Name:</td>
//               <td className="border px-4 py-2">
//                 <div className="input-group">
//                   <label htmlFor="firstName" className="input-label sr-only">
//                     First Name:
//                   </label>
//                   <input
//                     id="firstName"
//                     value={fnameToEdit}
//                     onChange={(e) => setFnameToEdit(e.target.value)}
//                     type="text"
//                     placeholder="Enter First Name"
//                     className="input input-bordered"
//                   />
//                 </div>
//               </td>
//             </tr>
//             <tr>
//               <td className="border px-4 py-2 font-semibold">Last Name:</td>
//               <td className="border px-4 py-2">
//                 <div className="input-group">
//                   <label htmlFor="lastName" className="input-label sr-only">
//                     Last Name:
//                   </label>
//                   <input
//                     id="lastName"
//                     value={lnameToEdit}
//                     onChange={(e) => setLnameToEdit(e.target.value)}
//                     type="text"
//                     placeholder="Enter Last Name"
//                     className="input input-bordered"
//                   />
//                 </div>
//               </td>
//             </tr>
//             <tr>
//               <td className="border px-4 py-2 font-semibold">Contact:</td>
//               <td className="border px-4 py-2">
//                 <div className="input-group">
//                   <label htmlFor="contact" className="input-label sr-only">
//                     Contact:
//                   </label>
//                   <input
//                     id="contact"
//                     value={contactToEdit}
//                     onChange={(e) => setContactToEdit(e.target.value)}
//                     type="text"
//                     placeholder="Enter contact details"
//                     className="input input-bordered"
//                   />
//                 </div>
//               </td>
//             </tr>
//             <tr>
//               <td className="border px-4 py-2 font-semibold">Email:</td>
//               <td className="border px-4 py-2">
//                 <div className="input-group">
//                   <label htmlFor="email" className="input-label sr-only">
//                     Email:
//                   </label>
//                   <input
//                     id="email"
//                     value={emailToEdit}
//                     onChange={(e) => setEmailToEdit(e.target.value)}
//                     type="text"
//                     placeholder="Enter email"
//                     className="input input-bordered"
//                   />
//                 </div>
//               </td>
//             </tr>
//             <tr>
//               <td className="border px-4 py-2 font-semibold">Address:</td>
//               <td className="border px-4 py-2">
//                 <div className="input-group">
//                   <label htmlFor="address" className="input-label sr-only">
//                     Address:
//                   </label>
//                   <input
//                     id="address"
//                     value={addressToEdit}
//                     onChange={(e) => setAddressToEdit(e.target.value)}
//                     type="text"
//                     placeholder="Enter address"
//                     className="input input-bordered"
//                   />
//                 </div>
//               </td>
//             </tr>
//             <tr>
//               <td className="border px-4 py-2 font-semibold">Blood Group:</td>
//               <td className="border px-4 py-2">
//                 <div className="input-group">
//                   <label htmlFor="bloodGroup" className="input-label sr-only">
//                     Blood Group:
//                   </label>
//                   <input
//                     id="bloodGroup"
//                     value={bloodGroupToEdit}
//                     onChange={(e) => setBloodGroupToEdit(e.target.value)}
//                     type="text"
//                     placeholder="Enter blood group"
//                     className="input input-bordered"
//                   />
//                 </div>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//         <div className="modal-action">
//           <button type="submit" className="btn  btn-accent btn-outline">
//             Submit
//           </button>
//         </div>
//       </form>
//     </Modal>
//   );
// };

// export default EditEmployeeModal;