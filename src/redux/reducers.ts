import { Action, ActionType } from './actions';

interface RootState {
    selectedLanguage: string;
    selectedTheme: string;
}

const initialState: RootState = {
    selectedLanguage: '',
    selectedTheme: '',
};

const rootReducer = (state = initialState, action: Action): RootState => {
    switch (action.type) {
        case ActionType.SET_LANGUAGE:
            return { ...state, selectedLanguage: action.payload };
        case ActionType.SET_THEME:
            return { ...state, selectedTheme: action.payload };
        default:
            return state;
    }
};

export default rootReducer;
