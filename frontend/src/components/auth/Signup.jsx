import React from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useState , useEffect } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import { Loader2 } from 'lucide-react'
import { setloading } from '@/redux/authSlice'
const Signup = () => {
    const [input, setinput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    })
    const { loading  , user} = useSelector((store) => store.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const change = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value })
    }

    const changefile = (e) => {
        setinput({ ...input, file: e.target.files?.[0] })
    }

    const submit = async (e) => {
        e.preventDefault()

        const formdata = new FormData()
        formdata.append("fullname", input.fullname)
        formdata.append("email", input.email)
        formdata.append("phoneNumber", input.phoneNumber)
        formdata.append("password", input.password)
        formdata.append("role", input.role)
        if (input.file) {
            formdata.append("file", input.file)
        }
        try {
            dispatch(setloading(true));
            const res = await axios.post("http://localhost:8000/api/v1/user/register", formdata, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            })
            if (res.data.success) {
                navigate("/login")
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally {
            dispatch(setloading(false));
        }
    }
    useEffect(() => {
        if(user){
            navigate("/")
        }
    }, [])
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center mx-auto max-w-7xl mt-12'>
                <form onSubmit={submit} className='w-1/2 border border-gray-200 rounded-lg p-4 my-10'>
                    <h1 className='font-bold text-4xl mb-5 text-center'>Sign Up</h1>
                    <div className='my-2'>
                        <Label>Full name</Label>
                        <Input type="text" placeholder='Enter full name' value={input.fullname} name="fullname" onChange={change} />
                    </div>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input type="email" placeholder='Enter email' value={input.email} name="email" onChange={change} />
                    </div>
                    <div className='my-2'>
                        <Label>PhoneNumber</Label>
                        <Input type="text" placeholder='Enter phone' value={input.phoneNumber} name="phoneNumber" onChange={change} />
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input type="text" placeholder='Enter password' value={input.password} name="password" onChange={change} />
                    </div>
                    <div className=' flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-4">
                            <div className=" flex items-center space-x-2">
                                <Input type="radio" name="role" value="student" className="cursor-pointer" checked={input.role === "student"} onChange={change} />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className=" flex items-center space-x-2">
                                <Input type="radio" name="role" value="recruiter" className="cursor-pointer" checked={input.role === "recruiter"} onChange={change} />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className='flex items-center gap-4'>
                            <Label>Profile</Label>
                            <Input accept="image/*" type="file" className="cursor-pointer" onChange={changefile} />
                        </div>
                    </div>
                    {
                        loading ? <Button><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> : <Button type="submit" className=" w-full my-4 text-xl p-5 ">SignUp</Button>
                    }

                    <div className="text-lg text-center">
                        <span className=''>Already have an account? <Link to={"/login"} className='hover:text-blue-600 hover:underline'>Login</Link></span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
