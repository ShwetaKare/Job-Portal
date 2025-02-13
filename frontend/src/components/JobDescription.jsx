import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import { setsingleJob } from '@/redux/jobSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner';
import { useState } from 'react';

const JobDescription = () => {
    const { singleJob } = useSelector((store) => store.job)
    const { user } = useSelector((store) => store.auth)
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied)
    const params = useParams();
    const jobId = params.id
    const dispatch = useDispatch()

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/application/apply/${jobId}`, {
                withCredentials: true
            })
            console.log(res.data)
            if (res.data.success) {
                setIsApplied(true)  //update the local state
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setsingleJob(updatedSingleJob)) //helps for realtime update
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        const fetchsinglejob = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/job/get/${jobId}`,
                    {
                        withCredentials: true
                    }
                )
                if (res.data.success) {
                    dispatch(setsingleJob(res.data.job))
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)) //ensure the state is in sync with fresh data
                }

            } catch (error) {
                console.log(error)

            }
        }
        fetchsinglejob()
    }, [jobId, dispatch, user?._id])

    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                    <div className='mt-3 flex gap-3'>
                        <Badge className={'text-violet-700 font-semibold text-base'} variant={"ghost"} >{singleJob?.position} Positions</Badge>
                        <Badge className={'text-violet-700 font-semibold text-base'} variant={"ghost"} >{singleJob?.jobType}</Badge>
                        <Badge className={'text-violet-700 font-semibold text-base'} variant={"ghost"} >{singleJob?.salary} LPA</Badge>
                    </div>
                </div>
                <Button onClick={isApplied ? null : applyJobHandler} disabled={isApplied} className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-violet-600 hover:bg-violet-700'}`}>
                    {
                        isApplied ? "Already Applied" : "Apply Now"
                    }
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job description</h1>
            <div>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience} years</span></h1>
                <h1 className='font-bold my-1'>Total applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
            </div>
            <div>

            </div>
        </div>
    )
}

export default JobDescription
