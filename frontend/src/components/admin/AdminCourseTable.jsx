import React , {useState , useEffect} from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminCourseTable = () => {
    const { allAdminCourses , searchCourseByText} = useSelector(store=>store.course)
    const [filterJobs, setfilterJobs] = useState(allAdminCourses)
    const navigate = useNavigate()
    useEffect(() => {
        const filteredCourses =  allAdminCourses.length >=0 && allAdminCourses.filter((course) =>{
            if(!searchCourseByText){
                return true
            }
            return course?.title?.toLowerCase().includes(searchCourseByText.toLowerCase()) || course?.company?.name?.toLowerCase().includes(searchCourseByText.toLowerCase())
        })
        setfilterJobs(filteredCourses)        
    }, [allAdminCourses,searchCourseByText])
  
    return (
        <div className='mt-5'>
            <Table>
                <TableCaption>
                    List of your recent posted courses
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Course Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs?.map((course) => (
                            <tr >
                                <TableCell>{course?.company?.name}</TableCell>
                                <TableCell>{course?.title}</TableCell>
                                <TableCell>{course.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={()=>navigate(`/admin/course/${course._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                            <div onClick={()=>navigate(`/admin/course/${course._id}/applicants`)} className='flex items-center gap-2 w-fit mt-2 cursor-pointer'>
                                                <Eye className='w-4' />
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}


export default AdminCourseTable
