import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useSelector } from 'react-redux'

const CreateCourses = () => {
    const [input, setinput] = useState({
        title: "",
        description: "",
        price: "",
        duration: "",
        startDate: "",
        endDate: "",
        companyId: ""
    })
    const [loading, setloading] = useState(false)
    const { companies } = useSelector(store => store.company)
    const navigate = useNavigate()

    const change = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value })
    }

    const selectchange = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value)
        setinput({ ...input, companyId: selectedCompany._id })
    }

    const submit = async (e) => {
        e.preventDefault();
        try {
            setloading(true)
            const res = await axios.post("http://localhost:8000/api/v1/course/create", input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            if (res?.data?.success) {
                // dispatch(setSingleCompany(res.data.company))
                toast.success(res.data.message)
                // const companyId = res?.data?.company?._id
                navigate("/admin/course")
            }
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            setloading(false)
        }
    }
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={submit} className='p-8 max-w-4xl mx-auto rounded-md border border-gray-200 shadow-lg'>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <Label>Title</Label>
                            <Input type="text" name="title" value={input.title} onChange={change} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input type="text" name="description" value={input.description} onChange={change} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Price</Label>
                            <Input type="Number" name="price" value={input.price} onChange={change} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Duration</Label>
                            <Input type="Number" name="duration" value={input.duration} onChange={change} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Start Date</Label>
                            <Input type="Date" name="startDate" value={input.startDate} onChange={change} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>End Date</Label>
                            <Input type="Date" name="endDate" value={input.endDate} onChange={change} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>

                        {
                            companies && companies.length > 0 && (
                                <Select onValueChange={selectchange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={"Select a Company"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                companies.map((company) => {
                                                    return (
                                                        <SelectItem value={company?.name?.toLowerCase()} key={company._id}>
                                                            {company.name}
                                                        </SelectItem>
                                                    )
                                                })
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        }
                    </div>
                    {
                        loading ? <Button type="submit" className="w-full mt-8"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait</Button> : <Button type="submit" className="w-full mt-8">Post New Course</Button>
                    }
                    {
                        companies.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>*Please register a company first before posting any course</p>
                    }
                </form>
            </div>

        </div>
    )
}

export default CreateCourses
