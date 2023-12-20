import React from "react";
import {Link} from "react-router-dom";
import './About.css';
import { IonIcon } from '@ionic/react';
import { hammerOutline, alarmOutline, bookOutline } from 'ionicons/icons';


class About extends React.Component {
    render(){
        return(

            <div className="tabs">
                <input id="web" type="radio" name="slider" defaultChecked />
                <input id="graphics" type="radio" name="slider" />
                <input id="photography" type="radio" name="slider" />
                <div className="buttons">
                    <label htmlFor="web"></label>
                    <label htmlFor="graphics"></label>
                    <label htmlFor="photography"></label>
                </div>
                    <div className="content">
                    <div className="box web">
                        <div className="contentBx">
                            <IonIcon icon={hammerOutline} />
                            <h2>Улучшайте навыки владения языком</h2>
                            <p>Повышайте свою языковую компетенцию через увлекательные упражнения, флэшкартами</p>
                            <Link to="/learn"><button>Подробнее</button></Link>
                        </div>
                    </div>
                    <div className="box graphics">
                        <div className="contentBx">
                            <IonIcon icon={alarmOutline} />
                            <h2>Самообразование</h2>
                            <p>Самостоятельно изучай язык и достигай высокого уровня владения</p>
                            <Link to="/learn"><button>Подробнее</button></Link>
                        </div>
                    </div>
                    <div className="box photography">
                        <div className="contentBx">
                            <IonIcon icon={bookOutline} />
                            <h2>Открывайте новые возможности</h2>
                            <p>Отправляйтесь в путешествие, чтобы открывать новые двери возможностей, изучая английский язык.</p>
                            <Link to="/learn"><button>Подробнее</button></Link>
                        </div>
                    </div>
                    </div>
            </div>
    )
    }
}

export default About;