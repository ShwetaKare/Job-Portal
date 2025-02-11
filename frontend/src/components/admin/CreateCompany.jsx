import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CreateCompany = () => {
    const navigate = useNavigate()
    const [companyName, setcompanyName] = useState("")
    const dispatch = useDispatch()
    const registerNewCompany = async () => {
        try {
            const res = await axios.post("http://localhost:8000/api/v1/company/register", {companyName},{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            })
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company))
                toast.success(res.data.message)
                const companyId = res?.data?.company?._id
                navigate(`/admin/companies/${companyId}`)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl mt-2'>Your Company Name</h1>
                </div>

                <Label className="text-xl">Company Name</Label>
                <Input placeholder="Enter your company name" className="my-2" type="text" onChange={(e) => setcompanyName(e.target.value)} />
                <div className=' flex items-center gap-3 my-10'>
                    <Button variant="outline" onClick={() => navigate("/admin/companies")} >Cancel</Button>
                    <Button onClick={registerNewCompany}>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CreateCompany
