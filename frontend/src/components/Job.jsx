import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
    const navigate = useNavigate()
    const daysAgoFunction = (mongodbTime) =>{
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date()
        const timeDiff = currentTime-createdAt
        return Math.floor(timeDiff/(1000*24*60*60))
    }
    return (
        <div className='p-5 shadow-xl rounded-md bg-white border border-gray-100 mt-5'>
            <div className='flex items-center justify-between'>
            <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) == 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago` } </p>
            <Button variant="outline" classname="rounded-full" size="icon" ><Bookmark /></Button>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <Button classname="p-6 " variant="outline" size="icon" >
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-semibold text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='mt-3 flex gap-3'>
            <Badge className={'text-violet-700 font-semibold text-base'} variant={"ghost"} >{job?.position} Positions</Badge>
                <Badge className={'text-violet-700 font-semibold text-base'} variant={"ghost"} >{job?.jobType}</Badge>
                <Badge className={'text-violet-700 font-semibold text-base'} variant={"ghost"} >{job?.salary} LPA</Badge>
            </div>
            <div className='flex gap-3 mt-3'>
                <Button onClick={()=>navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
                <Button className="bg-violet-700">Save for Later</Button>
            </div>
        </div>
    )
}

export default Job
