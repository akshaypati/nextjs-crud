import { error } from "console";
import { IEmployees } from "../interface/employees";

const baseUrl = 'http://localhost:3001';

//! Get all Employees
export const getAllEmployees = async (): Promise<IEmployees[]> => {
    try {
        const res = await fetch(`${baseUrl}/empData?${Math.random()}`, { cache: "no-store" });
        if (!res.ok) {
            throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }
        const emps = await res.json();
        console.log(emps);
        return emps;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};


//!! Add New Employee
export const addEmployee = async (employee: IEmployees): Promise<IEmployees> => {
    try {
        const res = await fetch(`${baseUrl}/empData`, {
            method: 'POST', // Assuming you are creating a new resource, so use POST
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employee),
        });

        if (!res.ok) {
            throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }

        const addedEmployee = await res.json();
        console.log(addedEmployee);
        return addedEmployee;
    } catch (error) {
        console.error('Error adding employee:', error);
        throw error;
    }
};

//!Edit Employee
export const editEmployee = async (employee: IEmployees): Promise<IEmployees> => {
    try {
        const res = await fetch(`${baseUrl}/empData/${employee.id}`, {
            method: 'PUT', // Assuming you are creating a new resource, so use POST
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employee),
        });

        if (!res.ok) {
            throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }

        const updatedEmployee = await res.json();
        console.log(updatedEmployee);
        return updatedEmployee;
    } catch (error) {
        console.error('Error adding employee:', error);
        throw error;
    }
};


//!Delete Employee
export const deleteEmployee = async (id: string): Promise<void> => {
    try {
        const res = await fetch(`${baseUrl}/empData/${id}`, {
            method: 'DELETE', // Assuming you are creating a new resource, so use POST
        });
        if (!res.ok) {
            throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }
    } catch (error) {
        console.error('Error adding employee:', error);
        throw error;
    }
};


