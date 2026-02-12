import { motion } from 'framer-motion';
import { Scale, Shield, Users, Heart } from 'lucide-react';
import styles from './About.module.css';

const viewportConfig = { once: false, amount: 0.2, margin: '-50px' };

const About = () => {

  const stats = [
    { icon: Scale, value: '10+', label: 'Anos de Experiência' },
    { icon: Users, value: '2', label: 'Unidades' },
    { icon: Shield, value: '100%', label: 'Compromisso' },
    { icon: Heart, value: '∞', label: 'Dedicação' },
  ];

  return (
    <section id="sobre" className={`section ${styles.about}`}>
      <div className="container">
        <div className={styles.grid}>
          <motion.div
            className={styles.imageContainer}
            initial={{ opacity: 0, x: -80, rotate: -3 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <img
              src="/images/acolhimento.jpg"
              alt="Atendimento humanizado"
              className={styles.image}
            />
            <div className={styles.imageAccent}></div>
          </motion.div>

          <motion.div
            className={styles.content}
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          >
            <span className={styles.tagline}>Conheça o Nosso Escritório</span>
            <h2>Calife <span className="text-gold">&</span> Sampaio <span className="text-gold">Advocacia Especializada</span></h2>

            <p>
              O escritório <strong>Calife & Sampaio Advocacia Especializada</strong> atua em âmbito
              nacional, oferecendo soluções jurídicas estratégicas e personalizadas para uma ampla
              gama de demandas familiares e patrimoniais.
            </p>

            <p>
              Nosso compromisso é com a excelência no atendimento, pautado pela ética, transparência
              e dedicação. Cada projeto é conduzido com atenção individualizada, respeitando as
              particularidades de cada cliente e buscando sempre as melhores alternativas jurídicas
              para a proteção de seus interesses.
            </p>

            <p>
              Trabalhamos com foco na segurança, agilidade e eficiência, acompanhando todas as
              etapas dos processos com rigor técnico e sensibilidade, visando não apenas a resolução
              das questões jurídicas, mas também a satisfação plena do cliente.
            </p>

            <div className={styles.stats}>
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className={styles.statItem}
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={viewportConfig}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
                >
                  <stat.icon size={28} className={styles.statIcon} />
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
