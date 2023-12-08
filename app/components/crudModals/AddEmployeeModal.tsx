import React from "react";
import { FaPlus } from "react-icons/fa";
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
  return (
    <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <form onSubmit={handleSubmitNewEmployee}>
        <h3 className="font-bold text-lg">Add New Employee</h3>
        <table className="table-auto w-full mt-4">
          <tbody>
            <tr>
              <td className="border px-4 py-2 font-semibold">ID:</td>
              <td className="border px-4 py-2">
                <div className="input-group">
                  <label htmlFor="id" className="input-label sr-only">
                    ID:
                  </label>
                  <input
                    id="id"
                    value={newEmpValue.id}
                    onChange={(e) =>
                      setNewEmpValue({ ...newEmpValue, id: e.target.value })
                    }
                    type="text"
                    placeholder="Enter ID"
                    className="input input-bordered"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">First Name:</td>
              <td className="border px-4 py-2 ">
                <div className="input-group">
                  <label htmlFor="firstName" className="input-label sr-only">
                    First Name:
                  </label>
                  <input
                    id="firstName"
                    value={newEmpValue.firstName}
                    onChange={(e) =>
                      setNewEmpValue({
                        ...newEmpValue,
                        firstName: e.target.value,
                      })
                    }
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
                    value={newEmpValue.lastName}
                    onChange={(e) =>
                      setNewEmpValue({
                        ...newEmpValue,
                        lastName: e.target.value,
                      })
                    }
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
                    value={newEmpValue.contact}
                    onChange={(e) =>
                      setNewEmpValue({
                        ...newEmpValue,
                        contact: e.target.value,
                      })
                    }
                    type="text"
                    placeholder="Enter Contact Details"
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
                    value={newEmpValue.email}
                    onChange={(e) =>
                      setNewEmpValue({
                        ...newEmpValue,
                        email: e.target.value,
                      })
                    }
                    type="email"
                    placeholder="Enter Email"
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
                    value={newEmpValue.address}
                    onChange={(e) =>
                      setNewEmpValue({
                        ...newEmpValue,
                        address: e.target.value,
                      })
                    }
                    type="text"
                    placeholder="Enter Address"
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
                    Group:
                  </label>
                  <input
                    id="bloodGroup"
                    value={newEmpValue.bloodgroup}
                    onChange={(e) =>
                      setNewEmpValue({
                        ...newEmpValue,
                        bloodgroup: e.target.value,
                      })
                    }
                    type="text"
                    placeholder="Enter Blood Group"
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

export default AddEmployeeModal;
