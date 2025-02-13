import { setAllAdminJobs } from '@/redux/jobSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchallAdminJobs= async() =>{
            try{
                const res = await axios.get("http://localhost:8000/api/v1/job/getadminjobs" , 
                    {
                        withCredentials:true
                    }
                )
                if(res.data.success){
                    dispatch(setAllAdminJobs(res.data.jobs))
                }
                
            }catch(error){
                console.log(error)
            }
        }
        fetchallAdminJobs()
    }, [])
    
}

export default useGetAllAdminJobs
