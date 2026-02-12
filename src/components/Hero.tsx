import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import styles from './Hero.module.css';

const Hero = () => {
  const whatsappLink = 'https://wa.me/5581992634067?text=Olá! Gostaria de saber mais sobre os serviços do escritório.';

  return (
    <section id="inicio" className={styles.hero}>
      <div className={styles.backgroundImage}>
        <img src="/images/familia-maos.jpg" alt="" />
      </div>
      <div className={styles.overlay}></div>

      <div className={`container ${styles.content}`}>
        <motion.div
          className={styles.textContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.span
            className={styles.tagline}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Advocacia Especializada
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Direito de{' '}
            <span className={styles.highlight}>Família e Patrimônio</span>
          </motion.h1>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Soluções jurídicas estratégicas e personalizadas, com atendimento
            humanizado e foco na proteção dos seus interesses e de sua família.
          </motion.p>

          <motion.div
            className={styles.buttons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <MessageCircle size={20} />
              Fale Conosco
            </a>
            <a href="#sobre" className="btn btn-secondary" style={{ borderColor: 'white', color: 'white' }}>
              Conheça o Escritório
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <div className={styles.mouse}>
          <div className={styles.wheel}></div>
        </div>
        <span>Role para baixo</span>
      </motion.div>
    </section>
  );
};

export default Hero;
