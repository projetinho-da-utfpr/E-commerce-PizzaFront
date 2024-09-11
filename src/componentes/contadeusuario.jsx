import React, { useState, useEffect } from "react";

export default function Usuario({ handleCloseModal }) {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    pass: "",
    nome: "",
    cpf: "",
    telefone: "",
    endereco: "",
    password_confirmation: ""
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [activeSection, setActiveSection] = useState('user');
  const [orderHistory, setOrderHistory] = useState([]);
  const [editMode, setEditMode] = useState({
    email: false,
    telefone: false,
    endereco: false,
    password: false
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setUserData(parsedUser);
      setFormData(prevData => ({
        ...prevData,
        ...parsedUser
      }));
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
      const response = await fetch(`http://localhost:8080/pedidosCliente/${userData.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.message === "Pedidos encontrados com sucesso!") {
        setOrderHistory(data.data || []); // Garante que seja um array, mesmo se não houver dados
      } else {
        console.error("Erro na resposta do servidor:", data.message);
      }
    } catch (error) {
      console.error("Erro ao buscar histórico de pedidos:", error);
    }
  };

  const handleUpdateUserInfo = async (e) => {
    e.preventDefault();
    if (!userData) return;

    try {
      const response = await fetch(`http://localhost:8080/alterarCliente/${userData.id}`, {
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
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setUserData(prevData => ({
          ...prevData,
          ...formData
        }));
        localStorage.setItem('user', JSON.stringify({
          ...userData,
          ...formData
        }));
        alert("Informações atualizadas com sucesso!");
        setEditMode({
          email: false,
          telefone: false,
          endereco: false,
          password: false
        });
      } else {
        alert(`Erro ao atualizar informações: ${data.message || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao se conectar ao servidor.");
    }
  };

  const toggleEditMode = (field) => {
    setEditMode(prevMode => ({
      ...prevMode,
      [field]: !prevMode[field]
    }));
  };

  const refazerPedido = async (pedidoAnterior) => {
    console.log('Dados do pedido anterior:', pedidoAnterior);
  
    const medidasMap = {
      "Pequena": 1,
      "Média": 2,
      "Grande": 3,
      "Metro": 4
    };
  
    const produtoMap = {
      "Pizza de Frango": 1,
      "Pizza de Calabresa ": 2,
      "Pizza Portuguesa": 3,
      "Pizza de Kinder Bueno": 4,
    };
  
    const getIdFromName = (name) => {
      if (produtoMap.hasOwnProperty(name)) {
        console.log(`ID ${produtoMap[name]} encontrado para "${name}"`);
        return produtoMap[name];
      }
      console.log(`Não foi possível encontrar ID para "${name}", usando o nome completo`);
      return name;
    };
  
    const toNumber = (value) => {
      const num = Number(value);
      return isNaN(num) ? 0 : num;
    };
  
    const toNumberArray = (value) => {
      if (Array.isArray(value)) {
        return value.map(item => getIdFromName(item));
      }
      if (typeof value === 'string') {
        return [getIdFromName(value)];
      }
      return [];
    };
  
    const orderData = {
      cliente_id: userData.id,
      status: pedidoAnterior.status || 'pendente',
      endereco: userData.endereco,
      quantidade: toNumber(pedidoAnterior.quantidade),
      total: parseFloat(pedidoAnterior.total).toFixed(2),
      produtos: toNumberArray(pedidoAnterior.produtos),
      medida: medidasMap[pedidoAnterior.medida],
      sabores: toNumberArray(pedidoAnterior.sabores),
    };
  
    console.log('Preparando para enviar pedido para a API:', orderData);
  
    try {
      console.log('Iniciando requisição para http://localhost:8080/pedidos');
      const response = await fetch('http://localhost:8080/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });
  
      console.log('Resposta recebida. Status:', response.status);
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Detalhes da resposta de erro:', errorData);
        throw new Error(`Erro ao enviar o pedido: ${response.status} ${response.statusText}`);
      }
  
      const responseData = await response.json();
      console.log('Pedido enviado com sucesso. Resposta:', responseData);
      return responseData;
    } catch (error) {
      console.error('Erro detalhado ao enviar pedido:', error);
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        console.error('Parece que o servidor não está acessível. Verifique se o backend está rodando.');
      }
      throw error;
    }
  };
  

  const renderSettingsField = (field, label, type = "text") => (
    <div className="settings-field">
      <label>{label}:</label>
      {editMode[field] ? (
        <input
          type={type}
          name={field}
          value={formData[field]}
          onChange={handleInputChange}
          placeholder={`Digite seu ${label.toLowerCase()}`}
        />
      ) : (
        <span>{userData?.[field]}</span>
      )}
      <button type="button" onClick={() => toggleEditMode(field)}>
        {editMode[field] ? "Cancelar" : "Editar"}
      </button>
    </div>
  );

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  const userName = userData?.nome ? capitalizeFirstLetter(userData.nome) : 'Visitante';

  const renderUserMenu = () => (
    <div className="user-menu">
      <h3>Bem-vindo, {userName}</h3>
      <div className="user-menu-button">
      <button onClick={() => setActiveSection('user')}>Usuário</button>
      <button onClick={() => setActiveSection('settings')}>Configurações</button>
      <button onClick={() => { setActiveSection('orders'); fetchOrderHistory(); }}>Histórico de Pedidos</button>
      <button onClick={handleLogout}>Sair</button>
      </div>
    </div>
    
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'user':
        return (
          <div className="user-info">
            <h4>Informações do Usuário</h4>
            <p><strong>Nome:</strong> {userName}</p>
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
              <div className="settings-field">
                <label>Nome:</label>
                <span>{userData?.nome}</span>
              </div>
              {renderSettingsField("email", "Email", "email")}
              {renderSettingsField("telefone", "Telefone", "tel")}
              {renderSettingsField("endereco", "Endereço")}
              {editMode.password && (
                <>
                  <input
                    type="password"
                    name="pass"
                    value={formData.pass}
                    onChange={handleInputChange}
                    placeholder="Nova senha"
                  />
                  <input
                    type="password"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleInputChange}
                    placeholder="Confirme a nova senha"
                  />
                </>
              )}
              <button type="button" onClick={() => toggleEditMode("password")}>
                {editMode.password ? "Cancelar alteração de senha" : "Alterar senha"}
              </button>
              <button type="submit">Salvar Alterações</button>
            </form>
          </div>
        );
        case 'orders':
          return (
            <div className="order-history">
              <h4>Histórico de Pedidos</h4>
              {orderHistory && orderHistory.length > 0 ? (
                orderHistory.map((pedido, index) => (
                  <div key={index} className="order-item">
                    <p><strong>Detalhes do Pedido:</strong> {pedido.sabores}</p>
                    <p><strong>Valor:</strong> R${pedido.total}</p>
                    <button onClick={() => refazerPedido(pedido)}>Refazer Pedido</button>
                  </div>
                ))

              ) : (
                <p className="no-orders">Sem pedidos para mostrar.</p>
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
          <div className="logged-in-content">
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