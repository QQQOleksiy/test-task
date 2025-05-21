import {type FC, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {mealActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hooks.ts";
import type {IIngredient, IRecipeTypes} from "../../types";
import "./one_recipe.css"

const OneRecipePage: FC = () => {
    const location = useLocation()
    const mealId = new URLSearchParams(location.search).get('mealId')

    const dispatch = useAppDispatch();

    const meal: IRecipeTypes = useAppSelector(state => state.mealReducer.mealById);

    const navigate = useNavigate();

    useEffect(() => {
        if (mealId) {
            dispatch(mealActions.getById(mealId))
        }
    }, [dispatch, mealId])

    if (!meal) {
        return null;
    }

    return (
        <div className="one-recipe-page">
            <div className="recipe-header">
                {meal.strMealThumb && (
                    <img src={meal.strMealThumb} alt={meal.strMeal} className="recipe-image-main"/>
                )}
                <div className="recipe-title-meta">
                    <h1 className="recipe-name">{meal.strMeal}</h1>
                    <div className="recipe-meta-tags">
                        {meal.strCategory && <span style={{cursor: "pointer"}} className="recipe-tag category-tag" onClick={() => navigate(`/find_recipes?type=category&value=${meal.strCategory}`)}>Category: {meal.strCategory}</span>}
                        {meal.strArea && <span style={{cursor: "pointer"}} className="recipe-tag area-tag" onClick={() => navigate(`/find_recipes?type=country&value=${meal.strArea}`)}>Cuisine: {meal.strArea}</span>}
                        {meal.strTags && meal.strTags.split(',').map(tag => tag.trim()).filter(tag => tag).map(tag => (
                            <span key={tag} className="recipe-tag general-tag">{tag}</span>
                        ))}
                    </div>
                </div>
            </div>

            {meal.strYoutube && (
                <div className="recipe-youtube-link-container">
                    <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer" className="recipe-youtube-link">
                        Watch on YouTube
                    </a>
                </div>
            )}

            <div className="recipe-content-grid">
                {meal.ingredients && meal.ingredients.length > 0 && (
                    <div className="recipe-ingredients-section">
                        <h2 className="section-title">Ingredients</h2>
                        <ul className="ingredients-list">
                            {meal.ingredients.map((ingredient: IIngredient, index: number) => (
                                <li style={{ cursor: 'pointer' }} key={`${ingredient.name}-${index}`} className="ingredient-item" onClick={() => navigate(`/find_recipes?type=ingredient&value=${ingredient.name}`)}>
                                    <span className="ingredient-name">{ingredient.name}</span>
                                    {ingredient.measure && ingredient.measure.trim() && (
                                        <span className="ingredient-measure">{ingredient.measure}</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {meal.strInstructions && (
                    <div className="recipe-instructions-section">
                        <h2 className="section-title">Instructions</h2>
                        <div className="instructions-text">
                            {meal.strInstructions.split('\r\n').filter(paragraph => paragraph.trim() !== '').map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default OneRecipePage;