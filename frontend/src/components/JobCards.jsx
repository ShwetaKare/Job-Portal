import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const JobCards = ({job}) => {
    const navigate = useNavigate()
    return (
        <div  onClick={()=>navigate(`/description/${job._id}`)} className='rounded-md p-5 bg-white border border-gray-300 shadow-xl cursor-pointer'>
            <div>
                <h1 className='text-2xl font-semibold'>{job?.company?.name}</h1>
                <p className='text-xl text-gray-500'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className=' text-sm'>{job?.description}</p>
            </div>
            <div className=' flex items-center gap-2 mt-4'>
                <Badge className={'text-violet-700 font-bold text-lg'} variant={"ghost"} >{job?.position} Positions</Badge>
                <Badge className={'text-violet-700 font-bold text-lg'} variant={"ghost"} >{job?.jobType} </Badge>
                <Badge className={'text-violet-700 font-bold text-lg'} variant={"ghost"} >{job?.salary} </Badge>
            </div>

        </div>
    )
}

export default JobCards
