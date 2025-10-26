import DocPage from "@/components/DocPage";

export default function DisclaimerPage() {
  return (
    <DocPage title="Aviso de Responsabilidade">
      <h2>AVISO DE RESPONSABILIDADE</h2>

      <div className="rounded-lg border-l-4 border-rawn-accent-neon bg-rawn-accent-neon/5 p-4 mb-6">
        <p className="font-semibold text-rawn-accent-neon">
          O RAWN PRO é uma ferramenta educacional de inteligência aplicada à
          performance humana.
        </p>
        <p className="mt-2">
          Seu propósito é fornecer orientações gerais baseadas em evidências
          científicas, mas não substitui acompanhamento profissional
          especializado.
        </p>
      </div>

      <h3>Natureza do Conteúdo</h3>
      <p>
        Todo o conteúdo fornecido pelo RAWN PRO possui{" "}
        <strong>caráter exclusivamente educacional e informativo</strong>.
      </p>
      <p>
        As orientações são baseadas em evidências científicas, princípios de
        fisiologia, treinamento e desempenho humano, mas{" "}
        <strong>não configuram prescrição</strong> de exercícios, dietas,
        tratamentos ou intervenções clínicas.
      </p>

      <h3>O RAWN PRO NÃO Substitui</h3>
      <ul>
        <li>Consulta médica ou diagnóstico clínico</li>
        <li>Acompanhamento de nutricionista, psicólogo ou fisioterapeuta</li>
        <li>Tratamento de doenças, lesões ou condições pré-existentes</li>
        <li>Prescrição de medicamentos ou suplementos</li>
        <li>Avaliação física individualizada</li>
        <li>Orientação jurídica, financeira ou profissional</li>
      </ul>

      <h3>Responsabilidade do Usuário</h3>
      <p>
        O usuário reconhece que utiliza o RAWN PRO sob sua própria
        responsabilidade e julgamento.
      </p>
      <p>
        Antes de iniciar qualquer programa de exercícios, mudança de rotina,
        ajuste alimentar ou protocolo de performance, o usuário deve:
      </p>
      <ul>
        <li>Consultar profissionais de saúde qualificados</li>
        <li>Avaliar suas condições físicas e limitações individuais</li>
        <li>Respeitar sinais do próprio corpo</li>
        <li>Adaptar as orientações ao seu contexto pessoal</li>
      </ul>

      <h3>Limitação de Responsabilidade</h3>
      <p>
        Em hipótese alguma o RAWN PRO, seus desenvolvedores, criadores ou
        afiliados serão responsáveis por:
      </p>
      <ul>
        <li>Lesões físicas resultantes da aplicação de orientações</li>
        <li>Efeitos adversos ou complicações de saúde</li>
        <li>Resultados não alcançados ou expectativas frustradas</li>
        <li>Decisões pessoais tomadas com base nas informações fornecidas</li>
        <li>
          Danos diretos, indiretos, incidentais, consequenciais ou punitivos
        </li>
      </ul>

      <h3>Casos que Exigem Orientação Profissional</h3>
      <p>
        O usuário <strong>deve procurar um profissional de saúde</strong> nas
        seguintes situações:
      </p>
      <ul>
        <li>Histórico de doença cardíaca, pressão alta ou diabetes</li>
        <li>Lesões recentes ou condições ortopédicas</li>
        <li>Gestação ou pós-parto</li>
        <li>Condições psicológicas ou neurológicas</li>
        <li>Dúvidas sobre segurança de atividades físicas</li>
        <li>Necessidade de prescrição de exercícios ou dietas</li>
      </ul>

      <h3>Embasamento Científico</h3>
      <p>
        As orientações do RAWN PRO são desenvolvidas com base em referências
        reconhecidas, como:
      </p>
      <ul>
        <li>American College of Sports Medicine (ACSM)</li>
        <li>World Health Organization (WHO)</li>
        <li>International Olympic Committee (IOC)</li>
        <li>Publicações indexadas em bases como PubMed e Cochrane</li>
      </ul>
      <p>
        No entanto, evidências científicas gerais não substituem avaliação
        individualizada, e o usuário deve sempre considerar suas
        particularidades.
      </p>

      <h3>Uso Correto do Aplicativo</h3>
      <p>
        O RAWN PRO foi projetado para funcionar como um assistente educacional,
        promovendo:
      </p>
      <ul>
        <li>Conscientização sobre práticas de saúde e performance</li>
        <li>Clareza sobre princípios científicos aplicados ao cotidiano</li>
        <li>Apoio à organização de rotinas e hábitos</li>
        <li>Reflexão crítica sobre escolhas pessoais</li>
      </ul>
      <p>
        O aplicativo <strong>não deve ser usado</strong> como única fonte de
        orientação em decisões críticas de saúde, desempenho ou bem-estar.
      </p>

      <h3>Isenção de Garantias</h3>
      <p>
        O serviço é fornecido "como está", sem garantias de resultados
        específicos, ganhos de performance, emagrecimento, hipertrofia ou
        melhoria cognitiva.
      </p>
      <p>
        Os resultados variam conforme fatores individuais, genéticos, ambientais
        e de aderência às práticas recomendadas.
      </p>

      <h3>Concordância</h3>
      <p>
        Ao utilizar o RAWN PRO, o usuário declara ter lido, compreendido e
        concordado integralmente com este Aviso de Responsabilidade.
      </p>
      <p>
        Caso não concorde com qualquer item, deve interromper imediatamente o
        uso do aplicativo.
      </p>

      <div className="mt-8 rounded-lg border border-rawn-border-panel bg-rawn-bg-surface/30 p-6">
        <p className="text-center font-semibold text-rawn-accent-neon">
          A verdadeira performance começa com responsabilidade.
        </p>
        <p className="text-center text-sm text-rawn-text-secondary mt-2">
          Use o conhecimento de forma consciente. Cuide de si com critério.
        </p>
      </div>
    </DocPage>
  );
}
