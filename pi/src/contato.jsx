export default function Contatos() {
  return (
    <footer className="footer">
      <div className="box-container">
        <div className="box">
          <i className="fas fa-phone"></i>
          <h3>Número de telefone</h3>
          <p>12981003634</p>
        </div>

        <div className="box">
          <i className="fas fa-map-marker-alt"></i>
          <h3>Endereço</h3>
          <p>Do lado da esquina</p>
        </div>

        <div className="box">
          <i className="fas fa-clock"></i>
          <h3>Horário de atendimento</h3>
          <p>00:00 até 23:59</p> {/* Use consistent time format */}
        </div>

        <div className="box">
          <i className="fas fa-envelope"></i>
          <h3>Endereço de email</h3>
          <p>emaildashakira@gmail.com</p>
        </div>
      </div>

      <div className="credit">
        <span>&copy;</span> Copyright {new Date().getFullYear()} por{" "}
        <span>Grupo de amigos e cia</span>
      </div>
    </footer>
  );
}
