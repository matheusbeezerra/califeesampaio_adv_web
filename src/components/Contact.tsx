import { motion } from 'framer-motion';
import { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';
import styles from './Contact.module.css';

const viewportConfig = { once: false, amount: 0.2, margin: '-50px' };

const Contact = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `Olá! Meu nome é ${formData.name}.%0A%0AAssunto: ${formData.subject}%0A%0A${formData.message}%0A%0AEmail: ${formData.email}%0ATelefone: ${formData.phone}`;
    window.open(`https://wa.me/5581992634067?text=${whatsappMessage}`, '_blank');
  };

  const offices = [
    {
      city: 'Recife/PE',
      address: 'Empresarial Rio Mar - Sala 2801 Torre C, Av. República do Líbano, N° 251, Pina, Recife – PE',
      cep: 'CEP: 51110-160',
      phone: '(81) 3036-5193',
      phoneLink: 'tel:+558130365193',
      whatsapp: '(81) 99263-4067',
      whatsappLink: 'https://wa.me/5581992634067',
      email: 'cristianesampaio.dra@gmail.com',
    },
    {
      city: 'Natal/RN',
      address: 'Av. Almirante Alexandrino de Alencar, 1260, Tirol, Natal-RN',
      cep: 'CEP: 59022-350',
      phone: null,
      whatsapp: '(84) 99404-3042',
      whatsappLink: 'https://wa.me/5584994043042',
      email: 'anaflaviacalife.adv@gmail.com',
    },
  ];

  return (
    <section id="contato" className={`section ${styles.contact}`}>
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
        >
          <h2>Entre em Contato</h2>
          <p>
            Agende uma consulta ou tire suas dúvidas. Estamos prontos para ajudar você.
          </p>
        </motion.div>

        <div className={styles.grid}>
          <motion.div
            className={styles.info}
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <h3>Nossas Unidades</h3>

            {offices.map((office) => (
              <div key={office.city} className={styles.officeCard}>
                <h4>{office.city}</h4>

                <div className={styles.officeInfo}>
                  <div className={styles.infoItem}>
                    <MapPin size={18} />
                    <div>
                      <span>{office.address}</span>
                      <span className={styles.cep}>{office.cep}</span>
                    </div>
                  </div>

                  {office.phone && (
                    <a href={office.phoneLink} className={styles.infoItem}>
                      <Phone size={18} />
                      <span>{office.phone}</span>
                    </a>
                  )}

                  <a href={office.whatsappLink} target="_blank" rel="noopener noreferrer" className={styles.infoItem}>
                    <MessageCircle size={18} />
                    <span>{office.whatsapp}</span>
                  </a>

                  <a href={`mailto:${office.email}`} className={styles.infoItem}>
                    <Mail size={18} />
                    <span>{office.email}</span>
                  </a>
                </div>
              </div>
            ))}

            <div className={styles.schedule}>
              <h4>Horário de Atendimento</h4>
              <p>Segunda a Sexta: 09h às 18h</p>
            </div>
          </motion.div>

          <motion.form
            className={styles.form}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          >
            <h3>Envie uma mensagem</h3>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Nome Completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Seu nome"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Telefone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="subject">Assunto</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="Divórcio">Divórcio</option>
                  <option value="Guarda de Filhos">Guarda de Filhos</option>
                  <option value="Pensão Alimentícia">Pensão Alimentícia</option>
                  <option value="Inventário">Inventário</option>
                  <option value="União Estável">União Estável</option>
                  <option value="Planejamento Sucessório">Planejamento Sucessório</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Mensagem</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Descreva brevemente seu caso..."
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              <Send size={18} />
              Enviar via WhatsApp
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
