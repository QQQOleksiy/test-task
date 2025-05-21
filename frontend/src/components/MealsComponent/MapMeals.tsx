import {type FC} from 'react';
import type {IRecipeTypes} from "../../types";
import './map_meals.css';
import {useNavigate} from "react-router-dom";

interface IProps{
    meal: IRecipeTypes
}

const MapMeals: FC<IProps> = ({meal}) => {

    const navigate = useNavigate();

    return (
        <div className="meal-card" >
            {meal.strMealThumb &&<img src={meal.strMealThumb} alt={meal.strMeal} className="meal-card-image" onClick={() => navigate(`/meal_by_id?mealId=${meal.idMeal}`)} />}
            <div className="meal-card-content">
                <h3 className="meal-card-name" onClick={() => navigate(`/meal_by_id?mealId=${meal.idMeal}`)}>{meal.strMeal}</h3>
                <div className="meal-card-meta">
                    <span className="meal-card-category" onClick={() => navigate(`/find_recipes?type=category&value=${meal.strCategory}`)}>{meal.strCategory}</span>
                    <span className="meal-card-area" onClick={() => navigate(`/find_recipes?type=country&value=${meal.strArea}`)}>{meal.strArea}</span>
                </div>
            </div>
        </div>
    );
};

export default MapMeals;