import { createContext, useState, useEffect } from "react";

export const PizzaContext = createContext();

export const PizzaContextProvider = (props) => {
    const [pizzas, setPizzas] = useState([]);

    const fetchTodasPizzas = async () => {
        try {
            const response = await fetch(`http://localhost:8080/produtos`);
            const data = await response.json();
            if (data.mensagem === "sucesso" && Array.isArray(data.produtos)) {
                setPizzas(data.produtos);
            } else {
                console.error("Resposta inesperada da API", data);
            }
        } catch (error) {
            console.error("Deu merda", error);
        }
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
