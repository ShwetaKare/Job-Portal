import { setallCourses } from '@/redux/courseSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const userGetAllCourses = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchallcourses= async() =>{
            try{
                const res = await axios.get("http://localhost:8000/api/v1/course/getcourses", 
                    
                    {
                        withCredentials:true
                    }
                )
                
                if(res.data.success){
                    dispatch(setallCourses(res.data.courses))
                }
                
            }catch(error){
                console.log(error)
            }
        }
        fetchallcourses()
    }, [])
    
}

export default userGetAllCourses
