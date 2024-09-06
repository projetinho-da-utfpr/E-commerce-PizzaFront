import React, { useState, useEffect, useContext } from 'react';
import { PizzaContext } from '../context/pizzascontext';
import './pizza.css';
import pizzaImage from '../../imagem/monte.jpg';

const MonteSuaPizza = ({ modal, handleAddToCart }) => {
    const { pizzas } = useContext(PizzaContext);
    const [sabores, setSabores] = useState([]);
    const [nomeSabor, setNomeSabor] = useState([]);
    const [qtdSabores, setQtdSabores] = useState(1);
    const [saboresSelecionados, setSaboresSelecionados] = useState([]);
    const [extrasSelecionados, setExtrasSelecionados] = useState([]);
    const [extras, setExtras] = useState([]); // Inicializado como array vazio
    const [quantidade, setQuantidade] = useState(1);
    const [tamanhoSelecionado, setTamanhoSelecionado] = useState('');


    const fetchExtras = async () => {
        const response = await fetch('http://localhost:8080/extras/1');
        const data = await response.json();
        setExtras(data);
    };

    const handleQtdSaboresChange = (e) => {
        setQtdSabores(parseInt(e.target.value));
    };

    const handleQuantidadeChange = (e) => {
        setQuantidade(parseInt(e.target.value));
    };

    const handleTamanhoChange = (e) => {
        setTamanhoSelecionado(e.target.value);
    };    

    useEffect(() => {
        fetchExtras();
    }, []);

    useEffect(() => {
        const sabores = pizzas.map(pizza => pizza.nome);
        setSabores(sabores);
    }, [pizzas]);

    useEffect(() => {
        const modifiedSabores = sabores.map(sabor => sabor.replace("Pizza de ", ""));
        setNomeSabor(modifiedSabores);
    }, [sabores]);

    const handleSaborChange = (index, value) => {
        const novosSaboresSelecionados = [...saboresSelecionados];
        novosSaboresSelecionados[index] = value;
        setSaboresSelecionados(novosSaboresSelecionados);
    };

    const handleExtraChange = (extra, isChecked) => {
        if (isChecked) {
            setExtrasSelecionados([...extrasSelecionados, extra]);
        } else {
            const novosExtras = extrasSelecionados.filter(item => item.id !== extra.id);
            setExtrasSelecionados(novosExtras);
        }
    };

    const calcularPreco = () => {
        const precoBase = 60; // Preço base da pizza
        const precoExtras = extrasSelecionados.reduce((total, extra) => total + extra.preco, 0);
        return precoBase + precoExtras;
    };

    const handleAdicionarAoCarrinho = () => {
        const pizza = {
            name: saboresSelecionados.join(', '),
            extras: extrasSelecionados.map(extra => extra.extra).join(', '),
            quantity: quantidade,
            preco: calcularPreco(), // Função para calcular o preço total
            tamanho: tamanhoSelecionado, // Agora usa o tamanho selecionado
            image: pizzaImage // Usa a imagem estática ou uma dinâmica se disponível
        };
        handleAddToCart(pizza);
        setQuantidade(1);
        modal();
    };

    return (
        <div className="modal-monte">
            <div className="modal-content-monte">
                <button onClick={modal} className="close">X</button>
                <h2>Monte sua pizza</h2>
                
                {/* Imagem da pizza */}
                <img src={pizzaImage} alt="Monte sua pizza" className="monte-pizza-img" />
                
                <form>
                    <h3>Tamanho da pizza</h3>
                        <select value={tamanhoSelecionado} onChange={handleTamanhoChange}>
                        <option value="">Selecione o tamanho</option>
                        <option value="Pequena">Pequena</option>
                        <option value="Média">Média</option>
                        <option value="Grande">Grande</option>
                    </select>
                    <h3>Quantidade de sabores</h3>
                    <select onChange={handleQtdSaboresChange}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>
                    <label>Escolha o sabor do recheio:</label>
                    {Array.from({ length: qtdSabores }).map((_, index) => (
                        <select key={index} onChange={(e) => handleSaborChange(index, e.target.value)}>
                            <option value="">Selecione o sabor</option>
                            {nomeSabor.map(sabor => <option key={sabor}>{sabor}</option>)}
                        </select>
                    ))}

                    {saboresSelecionados.map((sabor, index) => <p key={index}>{sabor}</p>)}

                    <h3>Extras:</h3>
                    <div className="extras-container">
                        {extras.map(extra => (
                            <label key={extra.id}>
                                <input
                                    type="checkbox"
                                    onChange={(e) => handleExtraChange(extra, e.target.checked)}
                                    checked={extrasSelecionados.includes(extra)}
                                    disabled={extrasSelecionados.length >= 3 && !extrasSelecionados.includes(extra)}
                                />
                                {extra.extra} R${extra.preco}
                            </label>
                        ))}
                    </div>

                    {extrasSelecionados.length >= 3 && <p>Você só pode escolher até 3 extras</p>}

                </form>

                <div className="quantidade-carrinho">
                    <input type="number" value={quantidade} onChange={handleQuantidadeChange} min="1" />

                    <button type="button-monte" onClick={handleAdicionarAoCarrinho}>Adicionar ao Carrinho</button>
                </div>

            </div>
        </div>
    );
};

export default MonteSuaPizza;
