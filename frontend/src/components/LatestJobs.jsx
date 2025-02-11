import React from 'react'
import JobCards from './JobCards'
import { useSelector } from 'react-redux'
import store from '@/redux/store'


const LastestJobs = () => {

  const {allJobs} = useSelector(store=>store.job)


  return (
    <div className='max-w-7xl mx-auto my-20'>
      <h1 className='text-4xl font-bold text-center'>Latest Job Openings</h1>
      <div className='grid grid-cols-3 gap-4 my-5'>
        {
          allJobs.length<= 0 ? <span>No Jobs Available</span> : allJobs.slice(0,6).map((item) => <JobCards key={item._id} job={item}/>)
        }
      </div>

    </div>
  )
}

export default LastestJobs
