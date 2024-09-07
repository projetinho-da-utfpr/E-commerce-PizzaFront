import React, { useState, useEffect, useContext } from 'react';
import { PizzaContext } from '../context/pizzascontext';
import './pizza.css';
import { set } from 'react-hook-form';

const MonteSuaPizza = ({ modal, adicionarNoCarrinho, precoCarrinho, handleSizeClick }) => {
  const { pizzas } = useContext(PizzaContext);
  const [sabores, setSabores] = useState([]);
  const [nomeSabor, setNomeSabor] = useState([]);
  const [qtdSabores, setQtdSabores] = useState(1);
  const [saboresSelecionados, setSaboresSelecionados] = useState([]);
  const [extrasSelecionados, setExtrasSelecionados] = useState([]);
  const [extras, setExtras] = useState([]);
  const [quantidade, setQuantidade] = useState(1);
  const [tamanho, setTamanho] = useState('Pequena');
  const [preco, setPreco] = useState(60);
  const [precoExtra, setPrecoExtra] = useState(0);
  const [confirma, setConfirma] = useState(false);
  const [precoReal, setPrecoReal] = useState(0);

  const abreModal = () => {
    setConfirma(!confirma);
  }

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
    setTamanho(e.target.value);
    precoTamanho(e.target.value);
  };

  function precoTamanho(tamanho) {
    if (tamanho === "Pequena") {
      setPreco(60);
    }
    if (tamanho === "Médio") {
      setPreco(75);
    }
    if (tamanho === "Grande") {
      setPreco(85);
    }
  }

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
    const qtdeextras = extrasSelecionados.length;
    setPrecoExtra(qtdeextras * 5);
  };

  useEffect(() => {
    calcularPreco();
  }, [extrasSelecionados]);

  const pizza = {
    name: `Pizza de ${saboresSelecionados.filter(sabor => sabor).join(', ')}`,
    extras: extrasSelecionados.map(extra => extra.extra).join(', '),
  };

  const handleAddToCart = () => {
    adicionarNoCarrinho({ ...pizza, quantity: quantidade, image: '/images/monte-sua-pizza-card.png' });
    setQuantidade(1);
    modal();
  };
  precoCarrinho(precoReal);
  handleSizeClick(tamanho)


  const precoConfirmado = () => {
    setPrecoReal(preco + precoExtra);
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={modal} className="close">X</button>
        <h2>Monte sua pizza</h2>
        <form>
          <h3>Tamanho da pizza</h3>
          <select onChange={handleTamanhoChange}>
            <option value="Pequena">Pequena</option>
            <option value="Médio">Média</option>
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
              {nomeSabor.map(sabor => <option key={sabor}>{sabor}</option>)}
            </select>
          ))}

          {/* {saboresSelecionados.map((sabor, index) => <p key={index}>{sabor}</p>)} */}

          <h3>Extras:</h3>
          <div className="extras-container">
            {extras.map(extra => (
              <label key={extra.id}>

                <input
                  type="checkbox"
                  onChange={(e) => {
                    handleExtraChange(extra, e.target.checked);
                  }}
                  checked={extrasSelecionados.includes(extra)}
                  disabled={extrasSelecionados.length >= 3 && !extrasSelecionados.includes(extra)}
                />
                {extra.extra} R${extra.preco}
              </label>
            ))}
          </div>

          {extrasSelecionados.length >= 3 && <p>Adicione até 3 extras</p>}

        </form>

        <div className="quantidade-carrinho">

          <input type="number" value={quantidade} onChange={handleQuantidadeChange} min="1" />

          <button type="button" onClick={() => { abreModal(); precoConfirmado(); }}>Adicionar ao Carrinho</button>
        </div>
        <div className="preco-extras">
        <p>Preço quantidade: R$ {preco * quantidade}</p>
        <p>Preço Extras: R${precoExtra * quantidade}</p>
        </div>
        {confirma && (
        <div className="modal2">
          <div className="modal-content2">
            <h1>Confirmação de pedido</h1>
            <p>Nome: {quantidade} x {pizza.name} | {tamanho}</p>
            <p>Extras: {quantidade} x {pizza.extras}</p>
            <p>Preço Total: R$ {precoReal * quantidade} </p>
            <button onClick={() => {abreModal()}}>Cancelar</button>
            <button onClick={() => { handleAddToCart(); setPrecoReal(0); }}>Confirmar</button>
          </div>
        </div>
      )}

      </div>
    </div>
  );
};

export default MonteSuaPizza;