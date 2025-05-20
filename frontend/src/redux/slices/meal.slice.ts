import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit";
import type {IRecipeSummary, IRecipeTypes} from "../../types";
import mealService from "../../services/mealService.ts";
import type {AxiosError} from "axios";


interface IState {
    allMeals: IRecipeTypes[];
    mealById: IRecipeTypes | null;
    filterMeals: IRecipeSummary[];
    loader: boolean;
}

const initialState: IState = {
    allMeals: [],
    mealById: null,
    filterMeals: [],
    loader: false
}

const slice = createSlice({
    name: 'mealSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.allMeals = action.payload;
            })
            .addCase(getById.fulfilled, (state, action) => {
                state.mealById = action.payload;
            })
            .addCase(getFilteredMeals.fulfilled, (state, action) => {
                state.filterMeals = action.payload;
            })
            .addMatcher(isPending, (state) => {
                state.loader = true;
            })
            .addMatcher(isFulfilled, (state) => {
                state.loader = false;
            })
            .addMatcher(isRejected, (state) => {
                state.loader = false;
            })
})


const getAll = createAsyncThunk<IRecipeTypes[], string>(
    'mealSlice/getAll',
    // @ts-ignore
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await mealService.getAll()
            return data;

        } catch (e) {
            const err = e as AxiosError
            // @ts-ignore
            return rejectWithValue(err.response.data)
        }
    }
)

const getById = createAsyncThunk<IRecipeTypes, string>(
    'mealSlice/getById',
    // @ts-ignore
    async (id: string, {rejectWithValue}) => {
        try {
            const {data} = await mealService.getById(id)
            return data;

        } catch (e) {
            const err = e as AxiosError
            // @ts-ignore
            return rejectWithValue(err.response.data)
        }
    }
)

const getFilteredMeals = createAsyncThunk<IRecipeSummary[], string>(
    'mealSlice/getFilteredMeals',
    // @ts-ignore
    async ({filterType, value } , {rejectWithValue}) => {
        try {
            const {data} = await mealService.getFiltered(filterType, value)
            return data;

        } catch (e) {
            const err = e as AxiosError
            // @ts-ignore
            return rejectWithValue(err.response.data)
        }
    }
)


const {actions, reducer: mealReducer} = slice

const mealActions = {
    ...actions,
    getAll,
    getById,
    getFilteredMeals
}

export {
    mealActions,
    mealReducer
}