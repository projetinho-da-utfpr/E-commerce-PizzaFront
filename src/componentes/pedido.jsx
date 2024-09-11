import React, { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from '@emailjs/browser';
import { useUser } from '../context/usercontext';

function Pedido({ carrinho }) {
  const { userData } = useUser();
  const { register, handleSubmit, setValue, setFocus } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitOrder = async (orderData) => {
    console.log('Enviando pedido para a API:', orderData);
    const response = await fetch('http://localhost:8080/pedidos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      const data = await response.json();
      console.error('Resposta da API não foi ok:', data);
      throw new Error(data.message || 'Erro ao enviar o pedido');
    }

    console.log('Pedido enviado com sucesso para a API');
    return response.json();
  };

  const sendEmail = async (formData) => {
    console.log('Preparando para enviar e-mail');
    const templateParams = {
      from_name: "BELLO PIZZO",
      to_name: formData.nome,
      email: userData?.email,
      message: `Seu pedido foi confirmado, em caso de dúvidas entre em contato com o número: 99999-9999\n${carrinho.map((item) => {
        return `${item.name} ${item.medida} x ${item.quantity}: R$ ${item.preco * item.quantity}`;
      }).join('\n')}`
    };

    emailjs.send("service_xk8v6em", "template_5xre1x9", templateParams, "px3BoXBz8xqaLzaHT")
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (err) => {
        console.error('FAILED...', err);
      });

    alert('Pedido enviado com sucesso! Cheque seu e-mail para mais informações');
  };

  const medidasMap = {
  "Pequena": 1,
  "Média": 2,
  "Grande": 3,
  "Metro": 4
};

  const handleOrderSubmission = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      console.log('Iniciando submissão do pedido');
      if (!userData) {
        console.error('userData não está definido');
        throw new Error('Você precisa estar logado para fazer um pedido.');
      }
  
      const orderData = {
        cliente_id: userData.id,
        status: "pendente",
        endereco: formData.address,
        quantidade: carrinho.reduce((total, item) => total + item.quantity, 0),
        total: carrinho.reduce((total, item) => total + (item.preco * item.quantity), 0).toFixed(2),
        produtos: carrinho.map(item => Number(item.id)),
        medida: medidasMap[carrinho.map(item => item.medida)],
        sabores: carrinho.map(item => Number(item.id)),
      };

      console.log('Dados do pedido preparados:', orderData);

      await submitOrder(orderData);
      console.log('Pedido enviado com sucesso, enviando e-mail...');
      await sendEmail(formData);
      console.log('E-mail enviado com sucesso');
      
      alert('Pedido enviado com sucesso! Cheque seu e-mail para mais informações');
    } catch (error) {
      console.error('Erro detalhado:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    console.log('Verificando CEP:', cep);
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(res => res.json())
      .then(data => {
        console.log('Dados do CEP recebidos:', data);
        setValue('address', data.logradouro);
        setValue('neighborhood', data.bairro);
        setValue('city', data.localidade);
        setValue('uf', data.uf);
        setFocus('addressNumber');
      })
      .catch((err) => {
        console.error('Erro ao buscar CEP:', err);
        alert('CEP Inválido, por favor digite um CEP válido');
      });
  };

  return (
    <section id="order" className="order">
      <h1 className="heading">Peça Agora</h1>

      <form onSubmit={handleSubmit(handleOrderSubmission)}>
        <div className="display-orders">
          {carrinho.map((item) => (
            <h1 key={item.id}>{item.name} x {item.quantity}</h1>
          ))}
        </div>

        <div className="flex">
          <div className="inputBox">
            <span>Seu nome:</span>
            <input type="text" {...register("name")} className="box" required placeholder="Digite seu nome" maxLength="50" defaultValue={userData?.nome} />
          </div>
          <div className="inputBox">
            <span>Seu número de celular:</span>
            <input type="tel" {...register("number")} className="box" required placeholder="Digite seu número" defaultValue={userData?.telefone} />
          </div>
          <div className="inputBox">
            <span>Modo de pagamento:</span>
            <select {...register("method")} className="box">
              <option value="cash on delivery">Pagar na hora</option>
              <option value="credit card">Cartão de crédito</option>
              <option value="debit card">Cartão de débito</option>
              <option value="pix">Pix</option>
            </select>
          </div>
          <div className="inputBox">
            <span>Endereço:</span>
            <input type="text" {...register("address")} className="box" required placeholder="Digite o endereço" maxLength="100" defaultValue={userData?.endereco} />
          </div>
          <div className="inputBox">
            <span>E-mail:</span>
            <input type="email" {...register("email")} className="box" required placeholder="Digite seu e-mail" maxLength="50" defaultValue={userData?.email} />
          </div>
        </div>

        {error && <p className="error-message">{error}</p>}
        <input type="submit" value={loading ? "Enviando..." : "Pedir agora"} className="btn" name="order" disabled={loading} />
      </form>
    </section>
  );
}

export default Pedido;