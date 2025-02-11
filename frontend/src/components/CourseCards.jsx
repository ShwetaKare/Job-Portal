import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const CourseCards = ({courses}) => {
    const navigate = useNavigate()
    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date()
        const timeDiff = currentTime - createdAt
        return Math.floor(timeDiff / (1000 * 24 * 60 * 60))
    }
    return (
        <div className='p-5 shadow-xl rounded-md bg-white border border-gray-100 mt-5'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{daysAgoFunction(courses?.createdAt) == 0 ? "Today" : `${daysAgoFunction(courses?.createdAt)} days ago`} </p>
                <Button variant="outline" classname="rounded-full" size="icon" ><Bookmark /></Button>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <Button classname="p-6 " variant="outline" size="icon" >
                    <Avatar>
                        <AvatarImage src={courses?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-semibold text-lg'>{courses?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{courses?.title}</h1>
                <p className='text-sm text-gray-600'>{courses?.description}</p>
            </div>
            <div className='mt-3 flex gap-3'>
                <Badge className={'text-violet-700 font-semibold text-base'} variant={"ghost"} >₹{courses?.price}</Badge>
                <Badge className={'text-violet-700 font-semibold text-sm'} variant={"ghost"} >{courses?.duration} weeks</Badge>
                <Badge className={'text-violet-700 font-medium text-sm'} variant={"ghost"} >{courses?.startDate.substring(0, 10)}</Badge>
                <Badge className={'text-violet-700 font-medium text-sm'} variant={"ghost"} >{courses?.endDate.substring(0, 10)} </Badge>
            </div>
            <div className='flex gap-3 mt-3'>
                <Button onClick={() => navigate(`/courses/${courses._id}/pay`)} variant="outline">Apply Now</Button>
                <Button className="bg-violet-700">Save for Later</Button>
            </div>
        </div>
    )
}

export default CourseCards
