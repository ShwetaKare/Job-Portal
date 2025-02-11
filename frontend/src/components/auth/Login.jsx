import React, { useState , useEffect } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setloading, setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
const Login = () => {
    const {user} = useSelector(store=>store.auth)
    const [input, setinput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const { loading } = useSelector((store) => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const change = (e) => {
        const { name, value } = e.target;
        setinput((prev) => ({ ...prev, [name]: value }));
    };

    const submit = async (e) => {
        e.preventDefault();

        if (!input.email || !input.password || !input.role) {
            toast.error("Please fill out all fields");
            return;
        }

        try {
            dispatch(setloading(true));
            const res = await axios.post("http://localhost:8000/api/v1/user/login", input, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            if (res.data.success) {
            
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || "Something went wrong!";
            toast.error(errorMessage);
        } finally {
            dispatch(setloading(false));
        }
    };

    useEffect(() => {
        if(user){
            navigate("/")
        }
    }, [])
    
    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center mx-auto max-w-7xl mt-12">
                <form onSubmit={submit} className="w-1/2 border border-gray-200 rounded-lg p-4 my-10">
                    <h1 className="font-bold text-4xl mb-5 text-center">Login</h1>
                    <div className="my-2">
                        <Label>Email</Label>
                        <Input type="email" placeholder="Enter email" value={input.email} name="email" onChange={change} />
                    </div>
                    <div className="my-2">
                        <Label>Password</Label>
                        <Input type="password" placeholder="Enter password" value={input.password} name="password" onChange={change} />
                    </div>
                    <div className="flex items-center gap-4 my-4">
                        <div className="flex items-center space-x-2">
                            <Input type="radio" id="student" name="role" value="student" checked={input.role === "student"} onChange={change} />
                            <Label htmlFor="student">Student</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Input type="radio" id="recruiter" name="role" value="recruiter" checked={input.role === "recruiter"} onChange={change} />
                            <Label htmlFor="recruiter">Recruiter</Label>
                        </div>
                    </div>
                    <Button type="submit" className="w-full my-4 text-xl p-5" disabled={loading}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" >Please Wait</Loader2> : "Login"}
                    </Button>
                    <div className="text-lg text-center">
                        <span>
                            Don't have an account? <Link to="/signup" className="hover:text-blue-600 hover:underline">SignUp</Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
