import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { useState } from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import axios from 'axios'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setopen }) => {
    const [loading, setloading] = useState(false)
    const { user } = useSelector((store) => store.auth)
    const [input, setinput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map(skill => skill) || "",
        file: user?.profile?.resume || null,
    });
    

    const dispatch = useDispatch()

    const change = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value })
    }

    const filehandler = (e) =>{
        const file = e.target.files?.[0]
        setinput({...input , file})
    }

    const submit = async (e) =>{
        e.preventDefault();
        
        const formdata = new FormData();
        formdata.append("fullname", input.fullname)
        formdata.append("email", input.email)
        formdata.append("phoneNumber", input.phoneNumber)
        formdata.append("bio", input.bio)
        formdata.append("skills", input.skills)
        if (input.file) {
            formdata.append("file", input.file)
        }
        try{
            setloading(true)
            const res = await axios.post("http://localhost:8000/api/v1/user/profile/update" , formdata ,{
                headers:{
                    "Content-Type":'multipart/form-data'
                },
                withCredentials:true
            })
            if(res.data.success){
                dispatch(setUser(res.data.user))
                toast.success(res.data.message)
            }
        }catch(error){
            console.log(error)
            toast.error(error.response.data.message)
        }finally{
            setloading(false)
        }
        setopen(false)
        console.log(input)
    }


    return (
        <div>
            <Dialog open={open} >
                <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setopen(false)} >
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submit}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="name" className='text-right'>Name</Label>
                                <Input className="col-span-3" name="fullname"  id="name" value={input.fullname} onChange={change} />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="email" className='text-right'>Email</Label>
                                <Input className="col-span-3" name="email"  id="email" value={input.email} onChange={change} />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="number" className='text-right'>Number</Label>
                                <Input className="col-span-3" name="phoneNumber"  id="number" value={input.phoneNumber} onChange={change} />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="bio" className='text-right'>Bio</Label>
                                <Input className="col-span-3" name="bio" id="bio" value={input.bio} onChange={change} />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="skills" className='text-right'>Skills</Label>
                                <Input className="col-span-3" name="skills" id="skills" value={input.skills} onChange={change} />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="file" className='text-right'>Resume</Label>
                                <Input className="col-span-3" name="file" id="file" type="file" accept="application/pdf" onChange={filehandler} />
                            </div>
                        </div>
                    <DialogFooter>
                        {
                            loading ? <Button><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> : <Button type="submit" className=" w-full my-4 text-xl p-5 ">Update</Button>
                        }
                    </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog
