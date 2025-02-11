import { setAllCompany } from '@/redux/companySlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const userGetAllCompanies = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchallcompany= async() =>{
            try{
                const res = await axios.get("http://localhost:8000/api/v1/company/get", 
                    
                    {
                        withCredentials:true
                    }
                )
                
                if(res.data.success){
                    dispatch(setAllCompany(res.data.companies))
                }
                
            }catch(error){
                console.log(error)
            }
        }
        fetchallcompany()
    }, [])
    
}

export default userGetAllCompanies
