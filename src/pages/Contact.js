import React from 'react';
import Header from "../components/Header";
import styles from './ContactUsForm.module.css';
import { useLocation } from "react-router-dom";

const ContactUsForm = () => {
    const location = useLocation();

    return (
        <section className={styles.section}>
            {location.pathname === '/contact' && <Header />}
            <div className={styles.container}>
                <h2>Свяжитесь с нами здесь</h2>
                <div className={styles.row100}>
                    <div className={styles.col}>
                        <div className={styles.inputBox}>
                            <input type="text" name="" required="required" />
                            <span className={styles.text}>Имя</span>
                            <span className={styles.line}></span>
                        </div>
                    </div>
                    <div className={styles.col}>
                        <div className={styles.inputBox}>
                            <input type="text" name="" required="required" />
                            <span className={styles.text}>Фамилия</span>
                            <span className={styles.line}></span>
                        </div>
                    </div>
                </div>
                <div className={styles.row100}>
                    <div className={styles.col}>
                        <div className={styles.inputBox}>
                            <input type="text" name="" required="required" />
                            <span className={styles.text}>Почта</span>
                            <span className={styles.line}></span>
                        </div>
                    </div>
                    <div className={styles.col}>
                        <div className={styles.inputBox}>
                            <input type="text" name="" required="required" />
                            <span className={styles.text}>Телефон</span>
                            <span className={styles.line}></span>
                        </div>
                    </div>
                </div>
                <div className={styles.row100}>
                    <div className={styles.col}>
                        <div className={`${styles.inputBox} ${styles.textarea}`}>
                            <textarea required="required"></textarea>
                            <span className={styles.text}>Напишите сюда</span>
                            <span className={styles.line}></span>
                        </div>
                    </div>
                </div>
                <div className={styles.row100}>
                    <div className={styles.col}>
                        <input type="submit" value="Send" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUsForm;
