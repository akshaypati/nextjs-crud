import { deleteEmployee } from "@/server/api";
import { useRouter } from "next/navigation";
import Modal from "../empComponents/Modal";

interface DeleteEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  employeeId: string;
}

const DeleteEmployeeModal: React.FC<DeleteEmployeeModalProps> = ({
  isOpen,
  onClose,
  employeeId,
}) => {
  const router = useRouter();

  const handleDeleteEmployee = async () => {
    await deleteEmployee(employeeId);
    onClose();
    router.refresh();
  };

  return (
    <Modal modalOpen={isOpen} setModalOpen={onClose}>
      <h3 className="text-lg">Are you sure you want to delete the employee?</h3>
      <div className="modal-action">
        <button onClick={handleDeleteEmployee} className="btn">
          Yes
        </button>
      </div>
    </Modal>
  );
};

export default DeleteEmployeeModal;
