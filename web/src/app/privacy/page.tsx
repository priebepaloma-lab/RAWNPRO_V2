import DocPage from "@/components/DocPage";

export default function PrivacyPage() {
  return (
    <DocPage title="Política de Privacidade">
      <h2>POLÍTICA DE PRIVACIDADE — RAWN PRO</h2>

      <h3>1. Propósito</h3>
      <p>
        Esta Política de Privacidade explica como o RAWN PRO coleta, utiliza e
        protege informações durante o uso do aplicativo.
      </p>
      <p>
        O sistema foi desenvolvido sob o princípio da privacidade integral:{" "}
        <strong>
          o controle total dos dados pertence exclusivamente ao usuário
        </strong>
        .
      </p>

      <h3>2. Princípios Fundamentais</h3>
      <ul>
        <li>
          <strong>Privacidade por design</strong> — o sistema foi arquitetado
          para operar com o mínimo necessário de dados.
        </li>
        <li>
          <strong>Controle local</strong> — as informações permanecem apenas no
          dispositivo do usuário.
        </li>
        <li>
          <strong>Transparência</strong> — o usuário entende o que é processado,
          quando e para quê.
        </li>
        <li>
          <strong>Segurança e conformidade</strong> — aderência plena à LGPD
          (Lei nº 13.709/2018) e ao GDPR (Regulamento Europeu de Proteção de
          Dados).
        </li>
      </ul>

      <h3>3. Dados Coletados e Processados</h3>
      <p>
        No uso conversacional do app, o RAWN PRO <strong>não coleta</strong>{" "}
        nome, e-mail, CPF, localização, nem qualquer informação pessoal
        identificável.
      </p>
      <p>
        O aplicativo armazena apenas{" "}
        <strong>preferências e histórico de interação</strong>, localmente no
        dispositivo, para preservar a continuidade da experiência
        conversacional.
      </p>
      <p>
        Esses dados <strong>não são enviados a servidores externos</strong> e{" "}
        <strong>não são utilizados para treinamento de algoritmos</strong>.
      </p>

      <h3>3.1 Pagamentos e Checkout (Stripe)</h3>
      <p>
        As assinaturas e pagamentos do RAWN PRO são processados com segurança
        pela plataforma
        <strong> Stripe</strong>. Durante o processo de checkout, os dados de
        pagamento (como informações de cartão, e-mail e dados de cobrança) são
        coletados e tratados diretamente pelo Stripe, conforme a
        <a
          href="https://stripe.com/privacy"
          target="_blank"
          rel="noreferrer"
          className="text-rawn-accent-neon"
        >
          {" "}
          Política de Privacidade do Stripe
        </a>
        .
      </p>
      <ul>
        <li>
          O RAWN PRO <strong>não armazena</strong> dados de cartão ou
          credenciais de pagamento.
        </li>
        <li>
          Recebemos apenas identificadores técnicos (ex.: <em>session_id</em>) e
          o status da transação para ativação de acesso.
        </li>
        <li>
          O Stripe pode realizar{" "}
          <strong>transferência internacional de dados</strong>, conforme suas
          próprias bases legais.
        </li>
      </ul>

      <h3>4. Armazenamento Local e Exclusão de Dados</h3>
      <p>
        Todas as informações são gravadas apenas no dispositivo do usuário, em
        área criptografada.
      </p>
      <p>
        A função <strong>"Apagar meus dados"</strong> remove de forma definitiva
        todo o histórico.
      </p>
      <p>Nenhum dado é retido, copiado ou transferido após a exclusão.</p>

      <h3>5. Uso de Inteligência Artificial</h3>
      <p>
        O RAWN PRO utiliza modelo de linguagem configurado para operar sob
        parâmetros éticos, científicos e seguros.
      </p>
      <p>
        As respostas são geradas em tempo real, sem reidentificação,
        rastreamento ou associação de informações pessoais.
      </p>

      <h3>6. Compartilhamento de Dados</h3>
      <p>
        O RAWN PRO <strong>não compartilha dados com terceiros</strong> para
        fins de marketing ou perfilização. Para fins de{" "}
        <strong>processamento de pagamentos</strong>, utilizamos o Stripe como
        operador de dados.
      </p>
      <p>
        Não há uso de cookies, rastreadores, nem ferramentas de análise
        comportamental.
      </p>

      <h3>7. Segurança e Integridade da Informação</h3>
      <ul>
        <li>Comunicação criptografada com protocolos HTTPS e TLS.</li>
        <li>Armazenamento local protegido por criptografia AES.</li>
        <li>Nenhum dado sensível transita fora do ambiente do usuário.</li>
        <li>Ausência total de back-end com acesso a informações pessoais.</li>
      </ul>

      <h3>8. Direitos do Usuário</h3>
      <p>O usuário pode, a qualquer momento:</p>
      <ul>
        <li>Excluir dados armazenados localmente.</li>
        <li>Encerrar o uso sem necessidade de solicitação externa.</li>
        <li>Solicitar esclarecimentos por meio do canal oficial de contato.</li>
      </ul>

      <h3>9. Base Legal e Conformidade</h3>
      <p>
        O RAWN PRO cumpre integralmente as disposições da LGPD e do GDPR,
        respeitando os princípios de finalidade, adequação, necessidade e
        segurança.
      </p>
      <p>
        Não há tratamento de dados sensíveis no uso conversacional do app. Para
        pagamentos, o Stripe poderá realizar{" "}
        <strong>transferência internacional</strong> conforme suas políticas e
        leis aplicáveis.
      </p>

      <h3>10. Alterações desta Política</h3>
      <p>
        A Política pode ser atualizada periodicamente para refletir melhorias
        técnicas ou exigências legais.
      </p>
      <p>
        A nova versão será disponibilizada dentro do próprio aplicativo, e o uso
        contínuo implicará aceitação das novas condições.
      </p>
    </DocPage>
  );
}
