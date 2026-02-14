import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';
import styles from './ContactModal.module.css';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappMessage?: string;
}

const offices = [
  {
    city: 'Recife/PE',
    lawyer: 'Dra. Cristiane Sampaio',
    phone: '(81) 99263-4067',
    whatsapp: '5581992634067',
  },
  {
    city: 'Natal/RN',
    lawyer: 'Dra. Ana Flávia Calife',
    phone: '(84) 99404-3042',
    whatsapp: '5584994043042',
  },
];

const ContactModal = ({ isOpen, onClose, whatsappMessage }: ContactModalProps) => {
  const defaultMessage = 'Olá! Gostaria de saber mais sobre os serviços do escritório.';

  const handleSelect = (whatsappNumber: string) => {
    const message = encodeURIComponent(whatsappMessage || defaultMessage);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.modal} onClick={onClose}>
          <motion.div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar">
              <X size={24} />
            </button>

            <h2 className={styles.title}>Com qual escritório deseja falar?</h2>
            <p className={styles.subtitle}>Selecione a unidade mais próxima de você</p>

            <div className={styles.cards}>
              {offices.map((office) => (
                <div
                  key={office.city}
                  className={styles.officeCard}
                  onClick={() => handleSelect(office.whatsapp)}
                >
                  <div className={styles.cityName}>{office.city}</div>
                  <div className={styles.lawyerName}>{office.lawyer}</div>
                  <div className={styles.phone}>{office.phone}</div>
                  <span className={styles.cardBtn}>
                    <MessageCircle size={16} />
                    WhatsApp
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
