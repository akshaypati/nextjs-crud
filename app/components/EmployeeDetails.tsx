"use client"
import React from 'react';
import Employee from './Employee';
import { IEmployees } from '@/interface/employees';

interface EmployeeDetailsProps {
  employees: IEmployees[];
  onEmployeeUpdated: () => void;
}

const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({ employees, onEmployeeUpdated }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <Employee key={employee.id} employee={employee} onEmployeeUpdated={onEmployeeUpdated} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeDetails;

