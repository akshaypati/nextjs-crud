// EditEmployeeModal.tsx
import { IEmployees } from "@/interface/employees";
import { FormEventHandler, useState } from "react";
import { editEmployee } from "@/server/api";
import { useRouter } from "next/navigation";
import Modal from "../empComponents/Modal";

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
  const [fnameToEdit, setFnameToEdit] = useState<string>(employee.firstName);
  const [lnameToEdit, setLnameToEdit] = useState<string>(employee.lastName);
  const [contactToEdit, setContactToEdit] = useState<string>(employee.contact);
  const [emailToEdit, setEmailToEdit] = useState<string>(employee.email);
  const [addressToEdit, setAddressToEdit] = useState<string>(employee.address);
  const [bloodGroupToEdit, setBloodGroupToEdit] = useState<string>(
    employee.bloodgroup
  );

  const handleSubmitEditEmployee: FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
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
    setContactToEdit("");
    setEmailToEdit("");
    setAddressToEdit("");
    setBloodGroupToEdit("");
    onClose();
    router.refresh();
  };

  return (
    <Modal modalOpen={isOpen} setModalOpen={onClose}>
      <form onSubmit={handleSubmitEditEmployee}>
        <h3 className="font-bold text-lg">Edit Employee Details</h3>
        <table className="table-auto w-full mt-4">
          <tbody>
            <tr>
              <td className="border px-4 py-2 font-semibold">Id:</td>
              <td className="border px-4 py-2">{employee.id}</td>
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
                    value={fnameToEdit}
                    onChange={(e) => setFnameToEdit(e.target.value)}
                    type="text"
                    placeholder="Enter First Name"
                    className="input input-bordered"
                  />
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
                    value={lnameToEdit}
                    onChange={(e) => setLnameToEdit(e.target.value)}
                    type="text"
                    placeholder="Enter Last Name"
                    className="input input-bordered"
                  />
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
                    value={contactToEdit}
                    onChange={(e) => setContactToEdit(e.target.value)}
                    type="text"
                    placeholder="Enter contact details"
                    className="input input-bordered"
                  />
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
                    value={emailToEdit}
                    onChange={(e) => setEmailToEdit(e.target.value)}
                    type="text"
                    placeholder="Enter email"
                    className="input input-bordered"
                  />
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
                    value={addressToEdit}
                    onChange={(e) => setAddressToEdit(e.target.value)}
                    type="text"
                    placeholder="Enter address"
                    className="input input-bordered"
                  />
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
                    value={bloodGroupToEdit}
                    onChange={(e) => setBloodGroupToEdit(e.target.value)}
                    type="text"
                    placeholder="Enter blood group"
                    className="input input-bordered"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="modal-action">
          <button type="submit" className="btn">
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditEmployeeModal;
