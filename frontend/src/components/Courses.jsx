import React from 'react'
import Navbar from './shared/Navbar'
import CourseCards from './CourseCards'
import { useDispatch, useSelector } from 'react-redux'
// import { setsearchedQuery } from '@/redux/courseSlice'
import { useEffect } from 'react'
import userGetAllCourses from '@/hooks/userGetAllCourses'

const Courses = () => {
    userGetAllCourses()
    const {allcourses} = useSelector(store=>store.course)
    const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(setsearchedQuery(""))
    // }, [])
    
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        allcourses.map((courses) => {
                            return (
                                <CourseCards key={courses._id} courses={courses} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Courses
