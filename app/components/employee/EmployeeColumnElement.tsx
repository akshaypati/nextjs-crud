import { IEmployees } from "@/app/interface/employees";
import Emp from "./EmployeeRowElement";

interface EmpDetailsProps {
  emps: IEmployees[];
}

const EmpDetails: React.FC<EmpDetailsProps> = ({ emps }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-1/3 md:w-full border-collapse border border-red-300">
        <thead className="sticky top-0 bg-red-200 h-14">
          <tr>
            <th className="py-2 px-4 border-b">Id</th>
            <th className="py-2 px-4 border-b">First Name</th>
            <th className="py-2 px-4 border-b">Last Name</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {emps.map((emp) => (
            <Emp key={emp.id} emp={emp} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmpDetails;


