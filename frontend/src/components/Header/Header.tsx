import {Link} from "react-router-dom";
import type {FC} from "react";
import "./header.css"

const Header: FC = () => {

    return (
        <div className="header">
            <Link to={{ pathname: '/main_page' }}>Home</Link>
        </div>
    );
};

export default Header;