import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import styles from './WhatsAppButton.module.css';

interface WhatsAppButtonProps {
  onContactClick: (message?: string) => void;
}

const WhatsAppButton = ({ onContactClick }: WhatsAppButtonProps) => {
  return (
    <motion.button
      className={styles.button}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Fale conosco pelo WhatsApp"
      onClick={() => onContactClick()}
    >
      <MessageCircle size={28} />
      <span className={styles.tooltip}>Fale Conosco</span>
    </motion.button>
  );
};

export default WhatsAppButton;
