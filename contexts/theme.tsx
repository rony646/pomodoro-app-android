import React, { createContext, useState } from 'react';

import Colors from '../constants/Colors';

interface ThemeData {
    color: string;
    setColor(color: string): void;
};

const ThemeContext = createContext({} as ThemeData);

export const ThemeContextProvider: React.FC = ({children}) => {

    const [color, setColor] = useState(Colors.themePrimaryColor);

    const setThemeColorHandler = (color: string) => {
        setColor(color);
    };

    return(
        <ThemeContext.Provider value={{color: color, setColor: setThemeColorHandler}}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;