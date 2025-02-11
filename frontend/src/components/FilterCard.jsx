import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setsearchedQuery } from '@/redux/jobSlice'

const filterdata = [
    {
        filterType: "Location",
        array: ["Delhi", "Banglore", "Hyderabad", "Pune", "Mumbai","Gurgaon"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer",
            "Backend Developer",
            "Data Science",
            "Cyber Security",
            "Machine Learning",
            "Graphic Design",
            "Full Stack Developer",
            "Artificial Intelligence"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42k-1lac", "1lac-5lac"]
    }
]

const FilterCard = () => {
    const [selectedValue, setselectedValue] = useState("")
    const dispatch = useDispatch()
    const change = (value) => {
        setselectedValue(value)
    }

    useEffect(() => {
        dispatch(setsearchedQuery(selectedValue))
    }, [selectedValue])

    return (
        <div className='mt-5 w-full bg-white rounded-md p-3'>
            <h1 className='text-xl font-bold'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={change} >
                {
                    filterdata.map((items, i) => (
                        <div>
                            <h1 className='font-bold text-lg'>{items.filterType}</h1>
                            {
                                items.array.map((item, idx) => {
                                    const itemId = `id${i}-${idx}`
                                    return (
                                        <div className='mt-2 flex items-center space-x-2'>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard
