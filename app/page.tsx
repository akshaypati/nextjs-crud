import EmpDetails from './components/appcomponents/EmpDetails'
import AddEmployee from './components/appcomponents/AddEmployee'
import { getAllEmployees } from '@/server/api'

export default async function Home() {
  const emps = await getAllEmployees();
  console.log(emps);
  return (
 <main className='max-w-4xl mx-auto mt-4'>
  <div className='text-center my-5 flex flex-col gap-4'>
    <h1 className='text-2xl fornt-bold'>Crud App</h1>
    <AddEmployee/>
    <EmpDetails emps={emps}/>
  </div>
 </main>
  )
}
