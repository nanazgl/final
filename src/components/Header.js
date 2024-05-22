import React from "react";
import './Header.css'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: window.location.pathname.substring(1)
        };
    }

    componentDidMount() {
        this.highlightCurrentPage();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.currentPage !== this.state.currentPage) {
            this.highlightCurrentPage();
        }
    }

    highlightCurrentPage() {
        const { currentPage } = this.state;
        const navigationLinks = document.querySelectorAll(".navigation a");
        navigationLinks.forEach(link => {
            if (link.getAttribute("href").substring(1) === currentPage) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    toggleMenu() {
        console.log("Toggle menu logic");
    }

    render() {
        const { currentPage } = this.state;

        return (
            <header className="header">
                <a href="/">
                    <img src="/souls.png" className="logo zIndexTop" alt="logo"/>
                </a>
                <div className="toggle" onClick={this.toggleMenu}></div>
                <ul className="navigation">
                    <li><a href="/" className={currentPage === '' ? 'active' : ''}>Главная</a></li>
                    <li><a href="/about" className={currentPage === 'about' ? 'active' : ''}>О нас</a></li>
                    <li><a href="/learn" className={currentPage === 'learn' ? 'active' : ''}>Изучать</a></li>
                    <li><a href="/contact" className={currentPage === 'contact' ? 'active' : ''}>Поддержка</a></li>

                </ul>
            </header>
        );
    }
}

export default Header;
