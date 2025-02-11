import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
    name : "course",
    initialState:{
        courses:[],
        allcourses: [],
        allAdminCourses:[],
        singleCourse: null,
        searchCourseByText:"",
    },

reducers: {
    //actions
    setcourses:(state , action) =>{
        state.courses= action.payload;
    },
    setsingleCourse: (state, action) => {
        state.singleCourse = action.payload;
    },
    setallAdminCourses:(state, action) =>{
        state.allAdminCourses=action.payload;
    },
    setallCourses: (state, action) => {
        state.allcourses = action.payload;
    },
    setsearchCourseByText: (state, action) => {
        state.searchCourseByText = action.payload;
    }
}
})
export const { setallCourses, setsingleCourse ,setsearchCourseByText ,setallAdminCourses , setcourses} = courseSlice.actions
export default courseSlice.reducer
