import React, { FC } from "react";
import s from "./Header.module.css";

const Header: FC = () => {
    return (
        <div className={s.title}>
            <h1>Your kittens</h1>
        </div>
    );
};

export default Header;
