import {type FC, useEffect} from 'react';
import {useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hooks.ts";
import {mealActions} from "../../redux";
import type {IRecipeTypes} from "../../types";
import MapMeals from "../../components/MealsComponent/MapMeals.tsx";
import './filtered_page.css';

const FilteredPage: FC = () => {
    const location = useLocation()
    const filterType = new URLSearchParams(location.search).get('type')
    const value = new URLSearchParams(location.search).get('value')

    const meals = useAppSelector(state => state.mealReducer.filterMeals)

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (filterType && value) {
            // @ts-ignore
            dispatch(mealActions.getFilteredMeals({filterType, value}))
        }
    }, [filterType, value, dispatch])
    

    return (
        <div className="recipes-page-container">
            <h1 className="recipes-page-title">{value} Recipes</h1>
            <div className="recipes-list">
                {
                    meals.length !== 0 && meals.map((meal: IRecipeTypes) => <MapMeals key={meal.idMeal} meal={meal}/>)
                }
            </div>
        </div>
    );
};

export default FilteredPage;