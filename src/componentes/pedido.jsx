import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import emailjs from '@emailjs/browser';

function Pedido({ carrinho }) {

  const nameRef = useRef(null);
  const emailRef = useRef(null);



  function sendEmail(e) {
    e.preventDefault();

    const templateParams = {
      from_name: "BELLO PIZZO",
      to_name: nameRef.current.value,
      email: emailRef.current.value,
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
  }
  const { register, setValue, setFocus } = useForm();

  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    console.log(cep);
    fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json()).then(data => {
      console.log(data);
      setValue('address', data.logradouro);
      setValue('neighborhood', data.bairro);
      setValue('city', data.localidade);
      setValue('uf', data.uf);
      setFocus('addressNumber');
    })
      .catch((err) => {
        alert('CEP Inválido, por favor digite um CEP válido');
      });

  }
  return (
    <section id="order" className="order">
      <h1 className="heading">Peça Agora</h1>

      <form onSubmit={sendEmail} >
        <div className="display-orders">
          {carrinho.map((item) => (
            <h1>{item.name} x {item.quantity}</h1>
          ))}
        </div>

        <div className="flex">
          <div className="inputBox">
            <span>Seu nome:</span>
            <input
              type="text"
              name="name"
              className="box"
              required
              placeholder="Digite seu nome"
              maxLength="50"
              ref={nameRef}
            />
          </div>
          <div className="inputBox">
            <span>Seu número de celular:</span>
            <input
              type="number"
              name="number"
              className="box"
              required
              placeholder="Digite seu número"
              min="0"
            />
          </div>
          <div className="inputBox">
            <span>Modo de pagamento:</span>
            <select name="method" className="box">
              <option value="cash on delivery">Pagar na hora</option>
              <option value="credit card">Cartão de crédito</option>
              <option value="paytm">Cartão de débito</option>
              <option value="paypal">Pix</option>

            </select>
          </div>
          <div className="inputBox">
            <span>Nome do bairro:</span>
            <input
              type="text"
              name="flat"
              className="box"
              required
              placeholder="Digite o nome do bairro"
              maxLength="50"
              {...register("neighborhood")}
            />
          </div>
          <div className="inputBox">
            <span>Nome da rua:</span>
            <input
              type="text"
              name="street"
              className="box"
              required
              placeholder="Digite o nome da rua"
              maxLength="50"
              {...register("address")}
            />
          </div>
          <div className="inputBox">
            <span>CEP:</span>
            <input
              type="number"
              name="pin_code"
              className="box"
              required
              placeholder="Digite o CEP"
              {...register("cep")} onBlur={checkCEP}
            />
          </div>
          <div className="inputBox">
            <span>Número:</span>
            <input
              type="number"
              name="addressNumber"
              className="box"
              required
              placeholder="Digite o número"
              min="0"
            />
          </div>
          <div className="inputBox">
            <span>E-mail:</span>
            <input
              type="email"
              name="email"
              className="box"
              required
              placeholder="Digite seu e-mail"
              maxLength="50"
              ref={emailRef}
            />
          </div>
        </div>

        <input type="submit" value="Pedir agora" className="btn" name="order" />
      </form>
    </section>
  );
}

export default Pedido;
