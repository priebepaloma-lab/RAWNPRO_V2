import DocPage from "@/components/DocPage";

export default function LGPDPage() {
  return (
    <DocPage title="Política LGPD">
      <h2>POLÍTICA LGPD — RAWN PRO</h2>

      <p>
        O RAWN PRO foi desenvolvido em total conformidade com a{" "}
        <strong>
          Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018)
        </strong>
        , adotando os mais altos padrões de privacidade e segurança da
        informação.
      </p>

      <h3>Princípios Aplicados</h3>

      <h4>1. Finalidade</h4>
      <p>
        Todo processamento de informação tem propósito claro: preservar a
        continuidade da experiência conversacional e fornecer orientações
        personalizadas baseadas em evidências científicas.
      </p>

      <h4>2. Adequação</h4>
      <p>
        O tratamento de dados é compatível com as finalidades informadas ao
        usuário, sem desvios ou usos secundários.
      </p>

      <h4>3. Necessidade</h4>
      <p>
        Apenas dados estritamente necessários são processados. Não há coleta de
        nome, CPF, e-mail, endereço, localização ou qualquer informação
        identificável.
      </p>

      <h4>4. Livre Acesso</h4>
      <p>
        O usuário tem total controle sobre suas informações, podendo acessar,
        modificar ou excluir seus dados a qualquer momento.
      </p>

      <h4>5. Qualidade dos Dados</h4>
      <p>
        As informações armazenadas são precisas, relevantes e mantidas
        atualizadas conforme as interações do usuário.
      </p>

      <h4>6. Transparência</h4>
      <p>
        O usuário tem acesso claro às informações sobre o processamento de
        dados, incluindo finalidade, forma de coleta e período de retenção.
      </p>

      <h4>7. Segurança</h4>
      <p>
        Utilização de criptografia AES, protocolos HTTPS/TLS e armazenamento
        local protegido, sem exposição a servidores externos.
      </p>

      <h4>8. Prevenção</h4>
      <p>
        Medidas técnicas e organizacionais impedem incidentes de segurança,
        acessos não autorizados ou vazamentos.
      </p>

      <h4>9. Não Discriminação</h4>
      <p>
        O tratamento de dados não tem finalidade discriminatória, abusiva ou
        ilícita. Todas as orientações são baseadas em ciência e ética.
      </p>

      <h4>10. Responsabilização e Prestação de Contas</h4>
      <p>
        O RAWN PRO adota práticas demonstráveis de conformidade e está preparado
        para comprovar o cumprimento das normas de proteção de dados.
      </p>

      <h3>Direitos do Titular</h3>
      <p>Conforme previsto na LGPD, o usuário pode:</p>
      <ul>
        <li>Confirmar a existência de tratamento de dados</li>
        <li>Acessar seus dados</li>
        <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
        <li>Solicitar a anonimização, bloqueio ou eliminação de dados</li>
        <li>Revogar o consentimento a qualquer momento</li>
      </ul>

      <h3>Base Legal</h3>
      <p>
        O tratamento de dados no RAWN PRO está fundamentado nas seguintes bases
        legais:
      </p>
      <ul>
        <li>
          <strong>Consentimento do titular</strong> — fornecido de forma livre,
          informada e inequívoca
        </li>
        <li>
          <strong>Execução de contrato</strong> — processamento necessário para
          fornecer o serviço solicitado
        </li>
        <li>
          <strong>Legítimo interesse</strong> — melhoria da experiência do
          usuário dentro dos limites legais
        </li>
      </ul>

      <h3>Ausência de Transferência Internacional</h3>
      <p>
        Nenhum dado pessoal é transferido para fora do Brasil ou para servidores
        internacionais. Todo processamento ocorre localmente no dispositivo do
        usuário.
      </p>

      <h3>Exclusão de Dados</h3>
      <p>
        A função <strong>"Apagar meus dados"</strong> permite a eliminação
        definitiva e irreversível de todas as informações armazenadas, sem
        retenção residual.
      </p>

      <h3>Canal de Contato</h3>
      <p>
        Para exercer seus direitos ou esclarecer dúvidas sobre o tratamento de
        dados, o usuário pode entrar em contato através do canal oficial de
        suporte do RAWN PRO.
      </p>

      <div className="mt-8 border-t border-rawn-border-panel pt-6">
        <p className="text-sm text-rawn-text-secondary">
          <strong>Última atualização:</strong> Janeiro de 2025
        </p>
      </div>
    </DocPage>
  );
}
