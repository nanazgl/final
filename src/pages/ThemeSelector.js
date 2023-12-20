import React from 'react';
import "./ThemeSelector.css"

const themes = ['emotions', 'weather', 'food', 'clothes', 'job'];

const ThemeSelector = ({ onThemeSelect }) => {
    return (
        <div className="theme-selector-container">
            <h2 className="theme-selector-title">Select a Theme:</h2>
            <ul className="theme-selector-list">
                {themes.map((theme) => (
                    <li
                        key={theme}
                        className="theme-selector-item"
                        onClick={() => onThemeSelect(theme)}
                    >
                        {theme}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ThemeSelector;
