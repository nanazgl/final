
import React from "react";

class Header extends React.Component {
    toggleMenu() {
        console.log("Toggle menu logic");
    }

    render() {
        return (
            <header>
                <a href="/">
                    <img src="/souls.png" className="logo zIndexTop" alt="logo" />
                </a>
                <div className="toggle" onClick={this.toggleMenu}></div>
                <ul className="navigation">
                    <li><a href="/">Главная</a></li>
                    <li><a href="/about">О нас</a></li>
                    <li><a href="/learn">Изучать</a></li>
                    <li><a href="/contact">Контакты</a></li>
                </ul>
            </header>
        );
    }
}

export default Header;
