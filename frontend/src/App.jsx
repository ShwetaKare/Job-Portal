import { useState } from 'react'
import Navbar from './components/shared/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import AdminJobs from './components/admin/AdminJobs'
import CreateCompany from './components/admin/CreateCompany'
import CompanySetup from './components/admin/CompanySetup'
import CreateJob from './components/admin/CreateJob'
import Applicants from './components/admin/Applicants'
import Protectedroute from './components/admin/Protectedroute'
import CreateCourses from './components/admin/CreateCourses'
import Courses from './components/Courses'
import AdminCourses from './components/admin/AdminCourses'
import Payment from './components/Payment'
import AdminCourseUpdate from './components/admin/AdminCourseUpdate'
import AdminCourseApplicants from './components/admin/AdminCourseApplicants'
const approuter = createBrowserRouter([
  {
  path:'/',
  element:<Home/>
},
  {
  path:'/login',
  element:<Login/>
},
  {
  path:'/signup',
  element:<Signup/>
},
  {
  path:'/jobs',
  element:<Jobs/>
},
  {
  path:'/browse',
  element:<Browse/>
},
  {
  path:'/courses',
  element:<Courses/>
},
  {
  path:'/courses/:id/pay',
  element:<Payment/>
},
  {
  path:'/profile',
  element:<Profile/>
},
  {
  path:'/description/:id',
  element:<JobDescription/>
},

//admin jobs
{
  path:"/admin/companies",
  element:<Protectedroute><Companies/></Protectedroute>
},
{
  path:"/admin/jobs",
  element:<Protectedroute><AdminJobs/></Protectedroute>
},
{
  path:"/admin/course",
  element:<Protectedroute><AdminCourses/></Protectedroute>
},
{
  path:"/admin/companies/create",
  element:<Protectedroute><CreateCompany/></Protectedroute>
},
{
  path:"/admin/companies/:id",
  element:<Protectedroute><CompanySetup/></Protectedroute>
},
{
  path:"/admin/jobs/create",
  element:<Protectedroute><CreateJob/></Protectedroute>
},
{
  path:"/admin/jobs/:id/applicants",
  element:<Protectedroute><Applicants/></Protectedroute>
},
{
  path:"/admin/course/create",
  element:<Protectedroute><CreateCourses/></Protectedroute>
},
{
  path:"/admin/course/:id",
  element:<Protectedroute><AdminCourseUpdate/></Protectedroute>
},
{
  path:"/admin/course/:id/applicants",
  element:<Protectedroute><AdminCourseApplicants/></Protectedroute>
},

])
function App() {

  return (
    <>
    <RouterProvider router={approuter}/>
    </>
  )
}

export default App
