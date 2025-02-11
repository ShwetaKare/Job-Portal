import { setallAdminCourses} from '@/redux/courseSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminCourses = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchallAdminCourses= async() =>{
            try{
                const res = await axios.get("http://localhost:8000/api/v1/course/getadmincourse" , 
                    {
                        withCredentials:true
                    }
                )
                if(res.data.success){
                    dispatch(setallAdminCourses(res.data.courses))
                }
                
            }catch(error){
                console.log(error)
            }
        }
        fetchallAdminCourses()
    }, [])
    
}

export default useGetAllAdminCourses
