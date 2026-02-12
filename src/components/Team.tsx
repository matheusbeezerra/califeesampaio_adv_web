import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import styles from './Team.module.css';

const viewportConfig = { once: false, amount: 0.2, margin: '-50px' };

const Team = () => {
  const founders = [
    {
      name: 'Ana Flávia Calife',
      oab: 'OAB/RN 19.165',
      role: 'Sócia Fundadora',
      image: '/images/ana-flavia-calife.jpg',
      description: [
        'Advogada pós-graduada em Direito Civil e Processo Civil, além de pós-graduada em Direito de Família e Sucessões.',
        'Especialista em Família e Sucessões, presta consultas jurídicas personalizadas e humanizadas, atuando na prevenção e resolução de questões familiares e litígios com sensibilidade, comprometimento e zelo.',
        'Sua prática integra técnica jurídica sólida à atenção às dimensões humanas e emocionais de cada caso. Pautada pela escuta atenta, pela empatia e pela busca constante por soluções eficazes e seguras.',
      ],
    },
    {
      name: 'Cristiane Sampaio',
      oab: 'OAB/PE 37.974',
      role: 'Sócia Fundadora',
      image: '/images/cristiane-sampaio.jpg',
      description: [
        'Advogada com mais de 10 anos de experiência na área. Pós-graduada em Direito Processual Civil e em Direito de Família e Sucessões.',
        'Especialista em Família e Sucessões, possui base e experiência com ênfase na Mediação de Conflitos. Membro do IBDFAM - Instituto Brasileiro de Direito de Família e da Comissão de Ensino Jurídico da OAB/PE.',
        'Teve oportunidade de trabalhar como Juíza leiga no PROCON em convênio executado junto a OAB/PE. Liderou projetos de mentoria e trocas de experiências com demais advogados da área.',
      ],
    },
  ];

  return (
    <section id="equipe" className={`section ${styles.team}`}>
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
        >
          <h2>Sócias Fundadoras</h2>
          <p>
            Conheça as profissionais que lideram o escritório com excelência e dedicação.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {founders.map((founder, index) => (
            <motion.div
              key={founder.name}
              className={styles.card}
              initial={{ opacity: 0, x: index === 0 ? -80 : 80, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={viewportConfig}
              transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={founder.image}
                  alt={founder.name}
                  className={styles.image}
                />
              </div>

              <div className={styles.content}>
                <h3>{founder.name}</h3>
                <span className={styles.oab}>{founder.oab}</span>
                <span className={styles.role}>{founder.role}</span>

                <div className={styles.description}>
                  {founder.description.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Imagem das duas juntas - gerada por IA */}
        <motion.div
          className={styles.teamImage}
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportConfig}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <img
            src="/images/equipe-atendimento.jpg"
            alt="Equipe Calife & Sampaio em atendimento"
            className={styles.teamPhoto}
          />
          <div className={styles.aiDisclaimer}>
            <Sparkles size={14} />
            <span>Imagem ilustrativa gerada por inteligência artificial</span>
          </div>
        </motion.div>

        <motion.div
          className={styles.whyUs}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h3>Por que escolher Calife & Sampaio?</h3>
          <p>
            Calife & Sampaio é mais do que um escritório jurídico, é um espaço de confiança,
            acolhimento e soluções eficazes para quem precisa de apoio nas questões que envolvem
            família e patrimônio.
          </p>
          <p>
            Aqui, cada cliente é acolhido com discrição e respeito, e cada processo é conduzido
            com a devida estratégia. Estamos preparados para atuar com firmeza e sensibilidade,
            sempre buscando os melhores resultados.
          </p>
          <p>
            Atuando com atenção artesanal em cada caso, nossa equipe oferece suporte completo
            para que você tome decisões importantes com segurança e tranquilidade.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
