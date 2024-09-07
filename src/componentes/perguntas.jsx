export default function Perguntas() {
  return (
    <section class="faq" id="faq">
      <h1 class="heading">Perguntas e respostas</h1>

      <div class="accordion-container">
        <div class="accordion active">
          <div class="accordion-heading">
            <span>Como funciona?</span>
            <i class="fas fa-angle-down"></i>
          </div>
          <section className="como-funciona">
            <h2>Como funciona?</h2>

            <div className="accordion-container">
              <h1 title="Pedido online">
                <ol>
                  <li>
                    Escolha uma pizza ou crie sua pizza: Escolha o tamanho da
                    massa, a base (tradicional, integral ou sem glúten), seus
                    ingredientes favoritos e finalize seu pedido.
                  </li>
                  <li>
                    Escolha a forma de pagamento: Selecione entre pagamento
                    online com cartão de crédito ou débito, dinheiro no ato da
                    entrega ou Pix.
                  </li>
                  <li>
                    Informe seu endereço: Insira seu endereço completo para que
                    possamos entregar sua pizza com rapidez e segurança.
                  </li>
                  <li>
                    Confirme seu pedido: Revise seu pedido, escolha o horário de
                    entrega ou retirada e finalize a compra.
                  </li>
                  <li>
                    Acompanhe seu pedido: Receba notificações em tempo real
                    sobre o status do seu pedido, desde a confirmação até a
                    entrega.
                  </li>
                </ol>
              </h1>

              <h1 title="Entrega e retirada">
                <ul>
                  <li>
                    <strong>Entrega em domicílio:</strong> Oferecemos entrega em
                    domicílio em toda cidade de Campo Mourão. A taxa de entrega
                    varia de acordo com a distância.
                  </li>
                  <li>
                    <strong>Retirada no balcão:</strong> Retire seu pedido no
                    balcão da nossa loja sem fila de espera.
                  </li>
                </ul>
              </h1>

              <h1 title="Tempo de entrega">
                <ul>
                  <li>
                    <strong>Entrega em domicílio:</strong> O tempo médio de
                    entrega é de 30 minutos após o término do preparo, podendo
                    variar de acordo com o dia, horário e volume de pedidos.
                  </li>
                  <li>
                    <strong>Retirada no balcão:</strong> Seu pedido estará
                    pronto para retirada em 30 minutos após a confirmação do
                    pagamento.
                  </li>
                </ul>
              </h1>

              <h1 title="Pagamento">
                <ul>
                  <li>
                    <strong>Cartão de crédito e débito:</strong> Aceitamos
                    pagamentos online com cartão de crédito e débito das
                    principais bandeiras.
                  </li>
                  <li>
                    <strong>Dinheiro:</strong> Pague em dinheiro no ato da
                    entrega.
                  </li>
                  <li>
                    <strong>Pix:</strong> Realize pagamentos instantâneos via
                    Pix.
                  </li>
                </ul>
              </h1>

              <h1 title="Promoções">
                <ul>
                  <li>
                    <strong>Fique de olho em nossas promoções:</strong>{" "}
                    Oferecemos promoções exclusivas em nosso site e redes
                    sociais.
                  </li>
                  <li>
                    <strong>Combos:</strong> Aproveite nossos combos vantajosos
                    com pizza e bebida.
                  </li>
                  <li>
                    <strong>Descontos para aniversariantes:</strong> Apresente
                    seu documento de identidade e ganhe desconto em seu pedido
                    no mês do seu aniversário.
                  </li>
                </ul>
              </h1>

              <h1 title="Ingredientes de qualidade">
                <ul>
                  <li>
                    <strong>
                      Utilizamos apenas ingredientes frescos e de alta
                      qualidade.
                    </strong>
                  </li>
                  <li>
                    <strong>
                      Nossas massas são feitas com fermentação natural,
                      garantindo sabor e leveza.
                    </strong>
                  </li>
                  <li>
                    <strong>
                      Oferecemos uma variedade de opções para atender a todos os
                      gostos, incluindo pizzas vegetarianas, veganas e sem
                      glúten.
                    </strong>
                  </li>
                </ul>
              </h1>

              <h1 title="Atendimento personalizado">
                <ul>
                  <li>
                    <strong>
                      Nossa equipe está sempre pronta para atender você com
                      atenção e cordialidade.
                    </strong>
                  </li>
                  <li>
                    <strong>
                      Tire suas dúvidas e faça seu pedido por telefone ou
                      WhatsApp.
                    </strong>
                  </li>
                  <li>
                    <strong>
                      Visite nossa loja e conheça nosso ambiente aconchegante.
                    </strong>
                  </li>
                </ul>
              </h1>

              <h1 title="Experimente o melhor da pizza!">
                <p>
                  Peça sua pizza agora mesmo e desfrute de uma experiência
                  gastronômica inesquecível!
                </p>
              </h1>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
