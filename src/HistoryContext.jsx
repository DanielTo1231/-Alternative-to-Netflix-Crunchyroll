import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./Auth";

const HistoryContext = createContext();

export const useHistory = () => useContext(HistoryContext);

export const HistoryProvider = ({ children }) => {
    const [history, setHistory] = useState([]);
    const { authToken } = useAuth();

    useEffect(() => {
        const fetchHistory = async () => {
            if (!authToken) return;

            try {
                const response = await fetch("https://tvshowdbapi.herokuapp.com/user/history", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${authToken}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch history");
                }

                const data = await response.json();
                setHistory(data);
            } catch (error) {
                console.error("Error fetching history:", error);
            }
        };

        fetchHistory();
    }, [authToken]);

    return (
        <HistoryContext.Provider value={{ history, setHistory }}>
            {children}
        </HistoryContext.Provider>
    );
};
