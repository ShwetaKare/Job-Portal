import React from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'
import { useState , useEffect} from 'react'



const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job)
    const [filterJobs, setfilterJobs] = useState(allJobs)

    useEffect(() => {
        if (searchedQuery) {
            const filteredjobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    // job.salary.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase()) 
            })
            setfilterJobs(filteredjobs)
        } else {
            setfilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery])

    return (
        <div className=''>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-4'>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0 ? <span>Job not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {filterJobs.map((item) =>
                                        <div key={item?._id} >
                                            <Job job={item} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Jobs
