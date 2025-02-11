import React from 'react'
import Navbar from './shared/Navbar'
import Hero from './Hero'
import Category from './Category'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import userGetAllJobs from '@/hooks/userGetAllJobs'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Home = () => {
    userGetAllJobs()
    const {user} = useSelector(store=>store.auth)
    const navigate = useNavigate()
    useEffect(() => {
        if(user?.role === 'recruiter'){
            navigate("/admin/companies")
        }
    }, [])
    
    return (
        <div>
            <Navbar />
            <Hero />
            <Category />
            <LatestJobs />
            <Footer />
        </div>
    )
}

export default Home
