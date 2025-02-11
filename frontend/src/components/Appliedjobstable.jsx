import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const Appliedjobstable = () => {
    const {allAppliedJobs} = useSelector(store => store.job)
    return (
        <div>
            <Table>
                <TableCaption classname="text-center font-bold">List of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right ">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                      allAppliedJobs && allAppliedJobs.length <= 0 ? <span>You haven't applied for any job yet.</span> : allAppliedJobs.map((items, i) => (
                            <TableRow key={items._id}>
                                <TableCell>{items.createdAt.split("T")[0]}</TableCell>
                                <TableCell>{items.job.title}</TableCell>
                                <TableCell>{items.job?.company?.name}</TableCell>
                                <TableCell className="text-right"><Badge className={`${items?.status === "rejected" ? "bg-red-600" :items?.status === "pending" ? "bg-gray-700" :"bg-green-600" }`}>{items.status}</Badge></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default Appliedjobstable
