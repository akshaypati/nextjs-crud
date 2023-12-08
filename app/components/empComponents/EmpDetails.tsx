import { IEmployees } from "@/interface/employees";
import Emp from "./Emp";


interface EmpDetailsProps {
    emps: IEmployees[]
}

const EmpDetails: React.FC<EmpDetailsProps> = ({ emps }) => {
    return <div className="overflow-x-auto">
        <table className="table">
            {/* head */}
            <thead>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {emps.map(((emp) => <Emp key={emp.id} emp={emp}  />))}
            </tbody>
        </table>
    </div>
}
export default EmpDetails;


