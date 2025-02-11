import React from 'react';
import { TableCaption, TableHead, TableHeader, TableRow, Table, TableBody, TableCell } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';

const shortlistingstatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector(store => store.application);
  const statusHandler = async (status , id) =>{
    try{
      const res = await axios.post(`http://localhost:8000/api/v1/application/status/${id}/update` , {status},{
        withCredentials:true
      })
      if(res.data.success){
        toast.success(res.data.message)
      }
    }catch(error){
      toast.error(error.response.data.message)
    }
  }

  return (
    <div>
      <Table>
        <TableCaption className="text-center">List of recently applied users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            applicants?.applications?.map((item) => (
              <tr key={item._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {
                    item?.applicant?.profile?.resume ? <a className='text-blue-600 cursor-pointer' href={item?.applicant?.profile?.resume}>
                      {item?.applicant?.profile?.resumeOriginalName}</a> : <span>NA</span>
                  }
                </TableCell>
                <TableCell>{item?.applicant?.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 cursor-pointer">
                      {
                        shortlistingstatus.map((status, i) => (
                          <div onClick={()=>statusHandler(status , item?._id)} key={i}>
                            <span>{status}</span>
                          </div>
                        ))
                      }
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
