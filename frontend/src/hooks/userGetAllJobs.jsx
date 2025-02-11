import { setAllJobs } from '@/redux/jobSlice'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const userGetAllJobs = () => {
    const dispatch = useDispatch()
    const {searchedQuery} = useSelector(store=>store.job)
    useEffect(() => {
        const fetchalljobs= async() =>{
            try{
                const res = await axios.get(`http://localhost:8000/api/v1/job/get?keyword=${searchedQuery}` , 
                    {
                        withCredentials:true
                    }
                )
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs))
                }
                
            }catch(error){
                console.log(error)
            }
        }
   fetchalljobs()
    }, [])
    
}

export default userGetAllJobs
