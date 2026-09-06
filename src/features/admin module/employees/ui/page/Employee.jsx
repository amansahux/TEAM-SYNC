import React from 'react'
import { useEmployees } from '../../hooks/useEmployee';
const Employee = () => {
  const {data, isPending, error} = useEmployees();
  console.log("data----->" , data)
  console.log("pending ----->" , isPending)
  console.log("error ----->" , error)
  return (
    <div>
      Employee Page
    </div>
  )
}

export default Employee
