import { createContext, useState, useEffect } from "react";

export const PizzaContext = createContext();

export const PizzaContextProvider = (props) => {
    const [pizzas, setPizzas] = useState([]);

    const fetchTodasPizzas = async () => {  
        fetch(`http://localhost:8000/pizzas/`)
            .then(response => response.json())
            .then(response => setPizzas(response))
            .catch(error => console.error("Deu merda", error));
    };

    useEffect(() => {
        fetchTodasPizzas();
    }, []);

    const contextValue = {
        pizzas,
    };

    return (
        <PizzaContext.Provider value={contextValue}>
            {props.children}
        </PizzaContext.Provider>
    );
};

export default PizzaContextProvider;