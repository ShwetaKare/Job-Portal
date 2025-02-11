import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],  // Holds the list of all jobs
        allAdminJobs:[],
        singleJob: null,  // Holds a single job
        loading:false,
        searchJobByText:"",
        allAppliedJobs:[],
        searchedQuery:""

    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setsingleJob: (state, action) => {
            state.singleJob = action.payload;  // Update the `singleJob` instead of `allJobs`
        },
        setsearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;  
        },
        setallAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setsearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;  
        },
    }
});

export const { setAllJobs, setsingleJob , setAllAdminJobs,setsearchJobByText, setallAppliedJobs , setsearchedQuery } = jobSlice.actions;
export default jobSlice.reducer;
