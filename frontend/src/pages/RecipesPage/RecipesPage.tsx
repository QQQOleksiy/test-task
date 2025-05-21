import {type FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hooks.ts";
import {mealActions} from "../../redux";
import MapMeals from "../../components/MealsComponent/MapMeals.tsx";
import type {IRecipeTypes} from "../../types";
import './recipes_page.css';

const RecipesPage: FC = () => {
    const dispatch = useAppDispatch();

    const allMeals = useAppSelector(state => state.mealReducer.allMeals);

    useEffect(() => {
        // @ts-ignore
        dispatch(mealActions.getAll())
    }, [dispatch])

    return (
        <div className="recipes-page-container">
            <h1 className="recipes-page-title">All Recipes</h1>
            <div className="recipes-list">
                {
                     allMeals.length !== 0 && allMeals.map((meal: IRecipeTypes) => <MapMeals key={meal.idMeal} meal={meal}/>)
                }
            </div>
        </div>
    );
};

export default RecipesPage;