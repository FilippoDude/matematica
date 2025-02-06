import React ,{createContext, useContext} from "react";

const LocalAppContext = createContext<undefined>(undefined); 
export const AppContextProvider = ({children} : {children : React.ReactNode}) => {
    return(
        <LocalAppContext.Provider value={undefined}>
            {children}
        </LocalAppContext.Provider>
    )
}

// Helper
export const appContext = () => {
    const context = useContext(LocalAppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }

    return context;
};

export default {AppContextProvider};