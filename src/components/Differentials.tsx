import { motion } from 'framer-motion';
import { Gem, Users, Target, FileCheck, ClipboardList } from 'lucide-react';
import styles from './Differentials.module.css';

const viewportConfig = { once: false, amount: 0.2, margin: '-50px' };

const Differentials = () => {

  const differentials = [
    {
      icon: Gem,
      title: 'Advocacia Artesanal',
      description: 'Prioriza o atendimento personalizado, desenvolvendo estratégias jurídicas sob medida para cada cliente.',
    },
    {
      icon: Users,
      title: 'Parceria Consolidada',
      description: 'Nasceu da afinidade de valores, princípios éticos e atuação colaborativa entre as sócias fundadoras.',
    },
    {
      icon: Target,
      title: 'Foco em Resultados',
      description: 'Excelência técnica e sensibilidade nos conflitos familiares, sempre guiadas pelo compromisso com resultados humanizados.',
    },
  ];

  const expertise = [
    {
      icon: FileCheck,
      title: 'Consultoria Especializada',
      description: 'Planejamento estratégico e consultoria para execução de projetos, maximizando desempenho e minimizando riscos.',
    },
    {
      icon: ClipboardList,
      title: 'Gestão de Processos',
      description: 'Gestão eficiente de processos, assegurando a otimização de recursos e cumprimento de prazos.',
    },
  ];

  return (
    <section id="diferenciais" className={`section ${styles.differentials}`}>
      <div className={styles.overlay}></div>
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-white">Nosso Diferencial</h2>
          <p className="text-white" style={{ opacity: 0.9 }}>
            O que faz do Escritório Calife & Sampaio a escolha certa para você.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {differentials.map((item, index) => (
            <motion.div
              key={item.title}
              className={styles.card}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.12, ease: 'easeOut' }}
            >
              <div className={styles.iconWrapper}>
                <item.icon size={36} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.experienceSection}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h3 className={styles.experienceTitle}>Nossa Experiência</h3>
          <p className={styles.experienceText}>
            Contamos com uma equipe de advogados associados altamente qualificada, com vasta
            experiência em suas respectivas áreas de atuação. Nossa expertise permite desenvolver
            consultas personalizadas e soluções eficazes.
          </p>
          <div className={styles.expertiseGrid}>
            {expertise.map((item) => (
              <div key={item.title} className={styles.expertiseItem}>
                <item.icon size={24} className={styles.expertiseIcon} />
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Differentials;
