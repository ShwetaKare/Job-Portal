import { setAllAdminJobs, setallAppliedJobs } from '@/redux/jobSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAppliedJobs = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchallAppliedJobs= async() =>{
            try{
                const res = await axios.get("http://localhost:8000/api/v1/application/get" , 
                    {
                        withCredentials:true
                    }
                )
                if(res.data.success){
                    dispatch(setallAppliedJobs(res.data.application))
                }
            }catch(error){
                console.log(error)
            }
        }
        fetchallAppliedJobs()
    }, [])
    
}

export default useGetAppliedJobs
