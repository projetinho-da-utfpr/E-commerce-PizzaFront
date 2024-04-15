import React, { useEffect, useState } from "react";

export default function Usuario({ handleCloseModal }) {
  const [showLoginForm, setShowLoginForm] = useState(true);

  const [pizzas, setPizzas] = useState([]);

  const handleToggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  const handleCloseAccount = () => {
    handleCloseModal();
  };

  // EXEMPLO DE COMO PEGAR O BANCO DE DADOS
  // const handlePizzas = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5173/cardapio");
  //     setPizzas(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleRegister = () => {};

  const handleLogin = () => {};

  const isLoggedIn = false;

  return (
    <div className="user-account">
      <section>
        <div id="close-account" onClick={handleCloseAccount}>
          {isLoggedIn ? <p>Bem vindo @usuario</p> : null}
          <span>Fechar</span>
        </div>

        {isLoggedIn ? null : (
          <div className="user">
            {showLoginForm ? (
              <div className="flex">
                <form action="" method="post" onSubmit={handleLogin}>
                  <h3>Logar agora</h3>
                  <input
                    type="email"
                    name="email"
                    required
                    className="box"
                    placeholder="Digite seu email"
                    maxLength="50"
                  />
                  <input
                    type="password"
                    name="pass"
                    required
                    className="box"
                    placeholder="Digite sua senha"
                    maxLength="20"
                  />
                  <input
                    type="submit"
                    value="Logar agora"
                    name="login"
                    className="btn"
                  />
                </form>
                <button onClick={handleToggleForm}>
                  Não tem conta? Registre agora
                </button>
              </div>
            ) : (
              <div className="flex">
                <form action="" method="post" onSubmit={handleRegister}>
                  <h3>Registrar-se</h3>
                  <input
                    type="text"
                    name="name"
                    required
                    className="box"
                    placeholder="Digite seu nome"
                    maxLength="20"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    className="box"
                    placeholder="Digite seu emai"
                    maxLength="50"
                  />
                  <input
                    type="password"
                    name="pass"
                    required
                    className="box"
                    placeholder="Escolha sua senha"
                    maxLength="20"
                  />
                  <input
                    type="password"
                    name="cpass"
                    required
                    className="box"
                    placeholder="Confirme sua senha"
                    maxLength="20"
                  />
                  <input
                    type="submit"
                    value="Registre agora"
                    name="register"
                    className="btn"
                  />
                </form>
                <button onClick={handleToggleForm}>Fazer login</button>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
