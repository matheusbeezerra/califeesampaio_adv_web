import { Phone, Mail, MessageCircle } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Sobre Nós', href: '#sobre' },
    { label: 'Diferenciais', href: '#diferenciais' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Equipe', href: '#equipe' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contato', href: '#contato' },
  ];

  const services = [
    'Divórcio',
    'Guarda de Filhos',
    'Pensão Alimentícia',
    'Inventário',
    'Planejamento Sucessório',
    'União Estável',
  ];

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <a href="#inicio" className={styles.logo}>
              <img src="/images/logo.png" alt="Calife & Sampaio Advocacia" className={styles.logoImage} />
            </a>
            <p>
              Escritório especializado em Direito de Família e Sucessões,
              oferecendo atendimento humanizado e soluções jurídicas
              estratégicas para proteger você e sua família.
            </p>
          </div>

          <div className={styles.links}>
            <h4>Links Rápidos</h4>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.links}>
            <h4>Serviços</h4>
            <ul>
              {services.map((service) => (
                <li key={service}>
                  <a href="#servicos">{service}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.contact}>
            <h4>Recife/PE</h4>
            <div className={styles.contactList}>
              <a href="tel:+558130365193" className={styles.contactItem}>
                <Phone size={16} />
                <span>(81) 3036-5193</span>
              </a>
              <a href="https://wa.me/5581992634067" target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                <MessageCircle size={16} />
                <span>(81) 99263-4067</span>
              </a>
              <a href="mailto:cristianesampaio.dra@gmail.com" className={styles.contactItem}>
                <Mail size={16} />
                <span>cristianesampaio.dra@gmail.com</span>
              </a>
            </div>

            <h4 style={{ marginTop: '20px' }}>Natal/RN</h4>
            <div className={styles.contactList}>
              <a href="https://wa.me/5584994043042" target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                <MessageCircle size={16} />
                <span>(84) 99404-3042</span>
              </a>
              <a href="mailto:anaflaviacalife.adv@gmail.com" className={styles.contactItem}>
                <Mail size={16} />
                <span>anaflaviacalife.adv@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            &copy; {currentYear} Calife & Sampaio Advocacia Especializada. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
