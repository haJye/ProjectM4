import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <h1 className="header__title">
        <Link className="link" to="/">
          MustSee by haJy
        </Link>
      </h1>
    </header>
  );
}

export default Header;
