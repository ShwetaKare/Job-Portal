import React from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompanyTable from './CompanyTable'
import { useNavigate } from 'react-router-dom'
import userGetAllCompanies from '@/hooks/userGetAllCompanies'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setsearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
  userGetAllCompanies()
  const [input, setinput] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setsearchCompanyByText(input))
  }, [input])
  return (
    <div>
      <Navbar />
      <div className=' max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between'>
          <Input className="w-fit" placeholder="Filter by name" onChange={(e) => setinput(e.target.value)} />
          <Button onClick={() => navigate("/admin/companies/create")}>New Company</Button>
        </div>
        <CompanyTable />

      </div>
    </div>
  )
}

export default Companies
