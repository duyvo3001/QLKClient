import { useState, createContext } from 'react'

export const DataContext = createContext();
const SetData = ({ children }) => {
    const Setformdatafunc = (data) => {
        sessionStorage.setItem('dataForm', data);
    }
    return (
        <DataContext.Provider value={{Setformdatafunc }}>
            {children}
        </DataContext.Provider>
    );
}

export default SetData
