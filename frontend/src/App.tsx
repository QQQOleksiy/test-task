import './App.css'
import {Routes, Route, Navigate} from "react-router-dom";
import RecipesPage from "./pages/RecipesPage/RecipesPage.tsx";
import OneRecipePage from "./pages/OneRecipePage/OneRecipePage.tsx";
import Layout from "./pages/Layout/Layout.tsx";


function App() {

    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Layout/>}>
                    <Route index element={<Navigate to={'/main_page'}/>}/>
                    <Route path="/main_page" element={<RecipesPage/>}/>
                    <Route path="/meal_by_id" element={<OneRecipePage />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App
