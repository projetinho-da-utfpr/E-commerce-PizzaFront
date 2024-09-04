import React, { useState, useEffect } from "react";

export default function Usuario({ handleCloseModal }) {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [formData, setFormData] = useState({ email: "", pass: "", nome: "", cpf: "", telefone: "", endereco: "", password_confirmation: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [activeSection, setActiveSection] = useState('user');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const handleToggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  const handleCloseAccount = () => {
    handleCloseModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
  
    for (let key in formData) {
      if (formData[key] === "") {
        alert(`O campo ${key} é obrigatório.`);
        return;
      }
    }
  
    if (formData.pass !== formData.password_confirmation) {
      alert("As senhas não coincidem.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8080/clienteNovo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          cpf: formData.cpf,
          telefone: formData.telefone,
          endereco: formData.endereco,
          password: formData.pass,
          password_confirmation: formData.password_confirmation,
          ativo: 1,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Registro bem-sucedido! Por favor, faça login.");
        setShowLoginForm(true);
      } else {
        alert(`Erro ao registrar: ${data.message || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao se conectar ao servidor.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/clienteLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.pass,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoggedIn(true);
        setUserData(data.cliente);
        localStorage.setItem('user', JSON.stringify(data.cliente));
        alert(`Login bem-sucedido! Bem-vindo, ${data.cliente.nome}.`);
      } else {
        alert(`Erro ao fazer login: ${data.message || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao se conectar ao servidor.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    localStorage.removeItem('user');
  };

  const fetchUserInfo = async () => {
    if (!userData) return;
    try {
      const response = await fetch(`http://localhost:8080/buscarCliente/${userData.id}`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Erro ao buscar informações do usuário:", error);
    }
  };

  const fetchOrderHistory = async () => {
    if (!userData) return;
    try {
      const response = await fetch(`http://localhost:8080/pedidosCliente/${userData.id}`);
      const data = await response.json();
      // Handle the order history data here
      console.log(data);
    } catch (error) {
      console.error("Erro ao buscar histórico de pedidos:", error);
    }
  };

  const renderUserMenu = () => (
    <div className="user-menu">
      <h3>Bem-vindo, {userData?.nome}</h3>
      <button onClick={() => setActiveSection('user')}>Usuário</button>
      <button onClick={() => setActiveSection('settings')}>Configurações</button>
      <button onClick={() => { setActiveSection('orders'); fetchOrderHistory(); }}>Histórico de Pedidos</button>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'user':
        return (
          <div className="user-info">
            <h4>Informações do Usuário</h4>
            <p><strong>Nome:</strong> {userData?.nome}</p>
            <p><strong>Email:</strong> {userData?.email}</p>
            <p><strong>Telefone:</strong> {userData?.telefone}</p>
            <p><strong>Endereço:</strong> {userData?.endereco}</p>
          </div>
        );
      case 'settings':
        return (
          <div className="user-settings">
            <h4>Configurações</h4>
            <form onSubmit={handleUpdateUserInfo}>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                placeholder="Nome"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleInputChange}
                placeholder="CPF"
                required
              />
              <input
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleInputChange}
                placeholder="Telefone"
                required
              />
              <input
                type="text"
                name="endereco"
                value={formData.endereco}
                onChange={handleInputChange}
                placeholder="Endereço"
                required
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Nova senha (opcional)"
              />
              <input
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleInputChange}
                placeholder="Confirme a nova senha"
              />
              <button type="submit">Atualizar Informações</button>
            </form>
          </div>
        );
      case 'orders':
        return (
          <div className="order-history">
            <h4>Histórico de Pedidos</h4>
            {orderHistory.length > 0 ? (
              <ul>
                {orderHistory.map((order, index) => (
                  <li key={index}>
                    <p><strong>Pedido ID:</strong> {order.id}</p>
                    <p><strong>Data:</strong> {new Date(order.data_pedido).toLocaleString()}</p>
                    <p><strong>Total:</strong> R$ {order.valor_total.toFixed(2)}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhum pedido encontrado.</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="user-account">
      <section>
        <div id="close-account" onClick={handleCloseAccount}>
          <span>Fechar</span>
        </div>

        {isLoggedIn ? (
          <div>
            {renderUserMenu()}
            {renderActiveSection()}
          </div>
        ) : (
          <div className="user">
            {showLoginForm ? (
              <div className="flex">
                <form onSubmit={handleLogin}>
                  <h3>Logar agora</h3>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="box"
                    placeholder="Digite seu email"
                    maxLength="50"
                  />
                  <input
                    type="password"
                    name="pass"
                    value={formData.pass}
                    onChange={handleInputChange}
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
                <button className="Registro" onClick={handleToggleForm}>
                  Não tem conta? Registre agora
                </button>
              </div>
            ) : (
              <div className="flex">
                <form onSubmit={handleRegister}>
                  <h3>Registrar-se</h3>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                    className="box"
                    placeholder="Digite seu nome"
                    maxLength="50"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="box"
                    placeholder="Digite seu email"
                    maxLength="50"
                  />
                  <input
                    type="text"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleInputChange}
                    required
                    className="box"
                    placeholder="Digite seu CPF"
                    maxLength="14"
                  />
                  <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    required
                    className="box"
                    placeholder="Digite seu telefone"
                    maxLength="15"
                  />
                  <input
                    type="text"
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleInputChange}
                    required
                    className="box"
                    placeholder="Digite seu endereço"
                  />
                  <input
                    type="password"
                    name="pass"
                    value={formData.pass}
                    onChange={handleInputChange}
                    required
                    className="box"
                    placeholder="Digite sua senha"
                    maxLength="20"
                  />
                  <input
                    type="password"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleInputChange}
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
                <button className="Logar" onClick={handleToggleForm}>
                  Já possui uma conta? Faça login
                </button>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}