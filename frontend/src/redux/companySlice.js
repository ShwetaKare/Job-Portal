import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: {
        companies: [],
        singleCompany: null,
        searchCompanyByText:"",
    },
    reducers: {
        //actions
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload;
        },
        setAllCompany: (state, action) => {
            state.companies = action.payload;
        },
        setsearchCompanyByText: (state, action) => {
            state.searchCompanyByText = action.payload;
        }
    }
})
export const { setSingleCompany, setAllCompany ,setsearchCompanyByText} = companySlice.actions
export default companySlice.reducer