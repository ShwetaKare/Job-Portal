import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setsearchedQuery } from '@/redux/jobSlice'

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Cyber Security",
    "Machine Learning",
    "Graphic Design",
    "FullStack Developer",
    "Artificial Intelligence"
]

const Category = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const searchJobHandler = (query) =>{
        dispatch(setsearchedQuery(query))
        navigate("/browse")
      }
    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-20 flex justify-center items-center">
                <CarouselContent>
                    {category.map((item, i) => (
                        <CarouselItem key={i} className="flex justify-center items-center md:basis-1/2 lg:basis-1/3">
                            <Button onClick={()=>searchJobHandler(item)} variant="outline" className="rounded-full" >{item}</Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default Category
