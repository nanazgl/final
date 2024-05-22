export enum ActionType {
    SET_LANGUAGE = 'SET_LANGUAGE',
    SET_THEME = 'SET_THEME',
}

interface SetLanguageAction {
    type: ActionType.SET_LANGUAGE;
    payload: string;
}

interface SetThemeAction {
    type: ActionType.SET_THEME;
    payload: string;
}

export type Action = SetLanguageAction | SetThemeAction;

export const setLanguage = (language: string): SetLanguageAction => ({
    type: ActionType.SET_LANGUAGE,
    payload: language,
});

export const setTheme = (theme: string): SetThemeAction => ({
    type: ActionType.SET_THEME,
    payload: theme,
});
