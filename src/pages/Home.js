import React from "react";
import "./Home.css";
import Header from "../components/Header";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentImage: "/img1.png",
            currentColor: "#d0e3ff",
        };
    }

    imgSlider(image, color) {
        this.imageExists(image)
            .then(() => {
                console.log("Image slider logic:", image);
                this.setState({
                    currentImage: image,
                    currentColor: color,
                });
                this.changeCircleColor(color);
            })
            .catch(() => {
                console.error("Failed to load image:", image);
            });
    }

    imageExists(image) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = image;
            img.onload = () => {
                console.log("Image loaded successfully:", image);
                resolve();
            };
            img.onerror = () => {
                console.error("Failed to load image:", image);
                reject();
            };
        });
    }

    changeCircleColor(color) {
        console.log("Changing circle color to:", color);
        const circle = document.querySelector('.circle');
        if (circle) {
            circle.style.backgroundColor = color;
        }
    }

    render() {
        return (
            <>
                <section>
                    <div className="circle"></div>
                    <Header />
                    <div className="content">
                        <div className="textBox">
                            <h2>Открой<br />для своей души<span> новый язык</span></h2>
                            <p>Это увлекательная и инновационная платформа для изучения английского языка. Мы объединяем традиционные методы обучения с современными технологиями, чтобы создать уникальный опыт, способствующий вашему языковому развитию.</p>
                            <a href="/about">Подробнее</a>
                        </div>
                        <div className="imgBox">
                            <img src={this.state.currentImage} className="language" alt="language" />
                        </div>
                    </div>
                    <ul className="thumb zIndexTop">
                        <li><img src="/thumb1.png" onClick={() => { this.imgSlider('/img1.png', '#d0e3ff'); }} alt="Thumb 1" /></li>
                        <li><img src="/thumb2.png" onClick={() => { this.imgSlider('/img2.png', '#f8a4be'); }} alt="Thumb 2" /></li>
                        <li><img src="/thumb3.png" onClick={() => { this.imgSlider('/img3.png', '#c99dee'); }} alt="Thumb 3" /></li>
                    </ul>
                </section>
            </>
        );
    }
}

export default Home;
