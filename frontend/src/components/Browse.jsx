import React from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { setsearchedQuery } from '@/redux/jobSlice'
import { useEffect } from 'react'
import userGetAllJobs from '@/hooks/userGetAllJobs'


const Browse = () => {
    userGetAllJobs()
    const {allJobs} = useSelector(store=>store.job)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setsearchedQuery(""))
    }, [])
    
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='text-center my-10 font-bold text-xl'>Search Results ({allJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        allJobs.map((job) => {
                            return (
                                <Job key={job._id} job={job} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse
