import type {FC} from "react";
import {Outlet, useNavigate} from "react-router-dom";

const Layout: FC = () => {

    const navigate = useNavigate()
    return (
        <>
            <Outlet/>
            <button onClick={() => navigate('/')}>Go to home</button>
            <button onClick={() => navigate('/meal_by_id')}>Go to meal by id</button>
        </>
    );
};

export default Layout;