import React from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AdminCourseTable from './AdminCourseTable'
import useGetAllAdminCourses from '@/hooks/useGetAllAdminCourses'
import { setsearchCourseByText } from '@/redux/courseSlice'
const AdminCourses = () => {
    useGetAllAdminCourses()
    const [input, setinput] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    useEffect(() => {
      dispatch(setsearchCourseByText(input))
    }, [input])
    return (
      <div>
        <Navbar />
        <div className=' max-w-6xl mx-auto my-10'>
          <div className='flex items-center justify-between'>
            <Input className="w-fit" placeholder="Filter by name, role" onChange={(e) => setinput(e.target.value)} />
            <Button onClick={() => navigate("/admin/course/create")}>New Course</Button>
          </div>
          <AdminCourseTable />
  
        </div>
      </div>
    )
  }

export default AdminCourses
