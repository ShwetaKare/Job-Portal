import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setsearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const [Query, setQuery] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const searchJobHandler = () => {
    dispatch(setsearchedQuery(Query))
    navigate("/browse")
  }
  return (
    <div className='text-center'>
      <div className='flex flex-col gap-5 mt-10'>
        <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-violet-600 font-medium'>Your Very Own Job Hunt Website</span>
        <h1 className='text-5xl font-bold'>Search, Apply & <br />Get Your <span className='text-violet-600'>Dream Jobs</span></h1>
        <p className='max-w-5xl mx-auto'>Explore top job listings tailored to your career goals. With a seamless application process,
          expert career resources, and exclusive opportunities, our job portal connects you with the best
          employers in the industry.<br/><span className='font-bold'>Begin your journey toward professional success now!</span> 
        </p>
        <div className='flex w-[40%] shadow-lg border border-gray-200 items-center rounded-full pl-3 mx-auto gap-4 '>
          <input type="text" placeholder='Find Jobs Here' onChange={(e) => setQuery(e.target.value)} className='outline-none border-none w-full' />
          <Button onClick={searchJobHandler} className="rounded-r-full bg-violet-600">
            <Search className='h-5 w-5' />
          </Button>
        </div>
      </div>

    </div>
  )
}

export default Hero
