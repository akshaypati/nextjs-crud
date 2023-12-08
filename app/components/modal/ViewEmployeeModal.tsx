import { IEmployees } from "@/interface/employees";
import Modal from "../empComponents/Modal";

interface ViewEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: IEmployees;
}

const ViewEmployeeModal: React.FC<ViewEmployeeModalProps> = ({
  isOpen,
  onClose,
  employee,
}) => {
  return (
    <Modal modalOpen={isOpen} setModalOpen={onClose}>
      <h3 className="font-bold text-lg">Employee Details</h3>
      <table className="table-auto w-full mt-4">
        <tbody>
          <tr>
            <td className="border px-4 py-2 font-semibold">First Name:</td>
            <td className="border px-4 py-2">{employee.firstName}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Last Name:</td>
            <td className="border px-4 py-2">{employee.lastName}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Contact:</td>
            <td className="border px-4 py-2">{employee.contact}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Email:</td>
            <td className="border px-4 py-2">{employee.email}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Address:</td>
            <td className="border px-4 py-2">{employee.address}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">BloodGroup:</td>
            <td className="border px-4 py-2">{employee.bloodgroup}</td>
          </tr>
        </tbody>
      </table>
    </Modal>
  );
};

export default ViewEmployeeModal;
