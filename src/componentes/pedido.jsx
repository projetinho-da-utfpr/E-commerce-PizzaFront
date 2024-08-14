import React from "react";
import { useForm } from "react-hook-form";

function Pedido({ carrinho }) {

  const { register, handleSubmit, setValue, setFocus } = useForm();

  const onSubmit = (e) => {
    console.log(e);
  }
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

      <form onSubmit={handleSubmit(onSubmit)} >
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
              maxLength="20"
            />
          </div>
          <div className="inputBox">
            <span>Seu número:</span>
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
        </div>

        <input type="submit" value="Pedir agora" className="btn" name="order" />
      </form>
    </section>
  );
}

export default Pedido;
