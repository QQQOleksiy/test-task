import type {FC} from "react";
import {Outlet} from "react-router-dom";
import Loader from "../../components/Loader/Loader.tsx";
import {useAppSelector} from "../../hooks/redux.hooks.ts";
import Header from "../../components/Header/Header.tsx";

const Layout: FC = () => {

    const loader = useAppSelector(state => state.mealReducer.loader)

    return (
        <>
            <Header/>
            <Outlet/>
            {loader && <Loader/>}
        </>
    );
};

export default Layout;