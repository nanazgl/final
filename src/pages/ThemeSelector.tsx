import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ThemeSelector.css';

interface ThemeSelectorProps {
    themes: any[];
    onThemeSelect: (selectedTheme: string) => void;
    language: string;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ themes, onThemeSelect, language }) => {
    const [fetchedThemes, setFetchedThemes] = useState<any[]>([]); // Declare setThemes function

    useEffect(() => {
        fetchThemes(language);
    }, [language]);

    const fetchThemes = async (language: string) => {
        try {
            const response = await axios.get(`http://localhost:3002/themes/${language}`);
            setFetchedThemes(response.data);
        } catch (error) {
            console.error('Error fetching themes', error);
        }
    };

    return (
        <div className="theme-selector-container">
            <h2 className="theme-selector-title">Select a Theme:</h2>
            <ul className="theme-selector-list">
                {fetchedThemes.map((theme) => (
                    <li
                        key={theme.id}
                        className="theme-selector-item"
                        onClick={() => onThemeSelect(theme.name)}
                    >
                        {theme.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ThemeSelector;
