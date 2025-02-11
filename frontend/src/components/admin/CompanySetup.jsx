import React, { useState , useEffect } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id)
    const [input, setinput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    })
    const {singleCompany} = useSelector(store => store.company)
    const [loading, setloading] = useState(false)
    // const { companyId } = params.id;
    const navigate = useNavigate()

    const changeEventHandler = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value })
    }
    const changeFileHandler = (e) => {
        const file = e.target.files?.[0]
        setinput({ ...input, file })
    }

    const submit = async (e) => {
        e.preventDefault()
        // console.log(input)
        const formdata = new FormData()
        formdata.append("name", input.name)
        formdata.append("description", input.description)
        formdata.append("website", input.website)
        formdata.append("location", input.location)
        if (input.file) {
            formdata.append("file", input.file)
        }
        try {
            setloading(true)
            const res = await axios.put(`http://localhost:8000/api/v1/company/update/${params.id}`, formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/admin/companies")

            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        setinput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    }, [singleCompany])


    return (
        <div>
            <Navbar />
            <div className='max-w-xl mx-auto my-10'>
                <form action="" onSubmit={submit}>
                    <div className='flex items-center gap-6 p-8'>
                        <Button onClick={() => navigate("/admin/companies")} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-2xl'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4 items-center'>
                        <div>
                            <Label className="text-xl">Company Name</Label>
                            <Input className="mt-3" type="text" name="name" value={input.name} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label className="text-xl">Description</Label>
                            <Input className="mt-3" type="text" name="description" value={input.description} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label className="text-xl">Website</Label>
                            <Input className="mt-3" type="text" name="website" value={input.website} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label className="text-xl">Location</Label>
                            <Input className="mt-3" type="text" name="location" value={input.location} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label className="text-xl">Logo</Label>
                            <Input className="mt-3" type="file" accept="image/*" onChange={changeFileHandler} />
                        </div>
                    </div>

                    {loading ? <Button type="submit" className="w-full mt-8"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait</Button> : <Button type="submit" className="w-full mt-8">Update</Button>}
                </form>
            </div>
        </div>
    )
}

export default CompanySetup
