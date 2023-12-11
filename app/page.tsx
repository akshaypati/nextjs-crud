import EmpDetails from './components/employee/EmployeeColumnElement'
import AddEmployee from './components/employee/AddEmployee'
import { getAllEmployees } from '@/server/api'
import Header from './components/otherComponents/Header';
import Footer from './components/otherComponents/Footer';

export default async function Home() {
  const emps = await getAllEmployees();
  console.log(emps);
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1 max-w-4xl mx-auto w-4/5 mt-4'>
        <div className='text-center my-5 flex flex-col gap-4 h-[500px] overflow-auto'>
          {/*'overflow-auto' to enable a scrollbar when content overflows */}
          <h1 className='text-2xl font-bold'>Crud App</h1>
          <AddEmployee />
          <EmpDetails emps={emps} />
        </div>
      </main>
      <Footer />
    </div>
  )
}






// import EmpDetails from './components/employee/EmployeeColumnElement'
// import AddEmployee from './components/employee/AddEmployee'
// import { getAllEmployees } from '@/server/api'
// import Header from './components/otherComponents/Header';
// import Footer from './components/otherComponents/Footer';

// export default async function Home() {
//   const emps = await getAllEmployees();
//   console.log(emps);
//   return (
//     <div className='flex flex-col min-h-screen'>
//       <Header />
//       <main className='flex-1 max-w-4xl mx-auto w-4/5 mt-4'>
//         <div className='text-center my-5 flex flex-col gap-4'>
//           <h1 className='text-2xl font-bold'>Crud App</h1>
//           <AddEmployee />
//           <EmpDetails emps={emps} />
//         </div>
//       </main>
//       <Footer />
//     </div>
//   )
// }