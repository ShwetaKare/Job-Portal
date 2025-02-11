import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import Appliedjobstable from './Appliedjobstable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const isresume = true
const Profile = () => {
  useGetAppliedJobs()
  const [open, setopen] = useState(false)
  const { user } = useSelector(store => store.auth)


  return (
    <div>
      <Navbar />
      <div className=' max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 mt-10 p-8'>
        <div className='flex justify-between items-center'>
          <div className='flex gap-4 items-center'>
            <Avatar className='cursor-pointer h-20 w-20 mt-2'>
              <AvatarImage src={user?.profile?.profilephoto} alt="@shadcn" />
            </Avatar>
            <div>
              <h1 className='font-semibold text-xl'>{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={() => setopen(true)} className="text-right bg-white  text-black h-10 hover:text-white" vairant="outline"><Pen /></Button>
        </div>
        <div className='my-5'>
          <div className='flex gap-3 my-2'>
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className='flex gap-3 my-2'>
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
          <div>
            <h1 className='font-semibold text-xl'>{user?.skills}</h1>
            <div className='flex items-center gap-2 mt-2'>
              {
                user?.profile?.skills.length != 0 ? user?.profile?.skills.map((items, i) => <Badge key={i} className={"gap-3"} >{items}</Badge>) : <span>No skills</span>
              }
            </div>
          </div>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label className="text-md font-bold">Resume</Label>
            {
              isresume ? <a target='blank' className='text-blue-500 w-full hover:underline cursor:pointer' href={user?.profile?.resume}>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
            }
          </div>
        </div>
      </div>
      <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
        <h1 className='font-bold text-center text-xl my-2'>Applied Jobs</h1>
        <Appliedjobstable />
      </div>
      <UpdateProfileDialog open={open} setopen={setopen} />
    </div>
  )
}

export default Profile
