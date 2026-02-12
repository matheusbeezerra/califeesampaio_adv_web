import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import styles from './WhatsAppButton.module.css';

const WhatsAppButton = () => {
  const whatsappLink = 'https://wa.me/5581992634067?text=Olá! Gostaria de saber mais sobre os serviços do escritório.';

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.button}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Fale conosco pelo WhatsApp"
    >
      <MessageCircle size={28} />
      <span className={styles.tooltip}>Fale Conosco</span>
    </motion.a>
  );
};

export default WhatsAppButton;
