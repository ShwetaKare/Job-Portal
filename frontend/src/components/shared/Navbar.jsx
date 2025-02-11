import { LogOut, User2 } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Link, useNavigate } from 'react-router-dom'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast, Toaster } from 'sonner'
import axios from 'axios'
import { setUser } from '@/redux/authSlice'

const Navbar = () => {
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const logouthandle = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setUser(null))
                navigate("/")
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 mt-3'>
                <div>
                    <h1 className='text-4xl font-bold'>Job<span className='text-4xl font-bold text-violet-700'>Portal</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-semibold text-2xl items-center gap-5 '>
                        {
                            user && user.role === "recruiter" ? (
                                <>
                                    <li><Link to={"/admin/companies"}>Companies</Link></li>
                                    <li><Link to={"/admin/jobs"}>Jobs</Link></li>
                                    <li><Link to={"/admin/course"}>Courses</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to={"/"}>Home</Link></li>
                                    <li><Link to={"/jobs"}>Jobs</Link></li>
                                    <li><Link to={"/browse"}>Browse</Link></li>
                                    <li><Link to={"/courses"}>Courses</Link></li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-4'>
                                <Link to={"/login"}>
                                    <Button variant="outline" className="text-2xl p-7">Login</Button>
                                </Link>
                                <Link to={"/signup"}>
                                    <Button className="bg-violet-600 text-2xl p-7 hover:bg-violet-700" >SignUp</Button>
                                </Link>
                            </div>
                        ) : (

                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className='cursor-pointer h-20 w-20 mt-2'>
                                        <AvatarImage src={user?.profile?.profilephoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className='text-center'>
                                        <h1 className='text-xl font-semibold'>{user?.fullname}</h1>
                                        <p className='text-base text-muted-foreground '>{user?.bio}.</p>
                                    </div>
                                    <div className='flex flex-col mt-2 text-xl'>
                                        {
                                            user && user.role === "student" && (
                                        <div className='flex items-center justify-center'>
                                            <User2 />
                                            <Button variant='link'><Link to={"/profile"}>View Profile</Link></Button>
                                        </div>
                                            )
                                        }
                                        <div className='flex items-center text-center justify-center'>
                                            <LogOut />
                                            <Button onClick={logouthandle} variant='link'>Logout</Button>
                                        </div>
                                    </div>

                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>

            </div>
        </div>

    )
}

export default Navbar
