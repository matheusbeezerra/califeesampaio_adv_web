import { motion } from 'framer-motion';
import {
  Heart,
  Users,
  FileText,
  Home,
  Scale,
  HandHeart,
  Briefcase,
  ScrollText,
  Shield,
  Baby,
  FileCheck,
  HelpCircle
} from 'lucide-react';
import styles from './Services.module.css';

const viewportConfig = { once: false, amount: 0.1, margin: '-50px' };

const Services = () => {

  const services = [
    {
      icon: Briefcase,
      title: 'Assessoria Jurídica e Negociação',
      description: 'Consultoria completa e negociação estratégica para resolver conflitos de forma eficiente.',
    },
    {
      icon: Home,
      title: 'Dissolução de União Estável',
      description: 'Acompanhamento em processos de dissolução de união estável, garantindo seus direitos.',
    },
    {
      icon: Heart,
      title: 'Divórcio',
      description: 'Suporte completo em divórcios consensuais e litigiosos, buscando sempre a melhor solução.',
    },
    {
      icon: FileText,
      title: 'Inventário',
      description: 'Assessoria em inventários judiciais e extrajudiciais, divisão de bens e partilha.',
    },
    {
      icon: ScrollText,
      title: 'Pacto Antenupcial',
      description: 'Elaboração de pactos antenupciais para proteção patrimonial antes do casamento.',
    },
    {
      icon: Scale,
      title: 'Pensão Alimentícia',
      description: 'Pedido, revisão e exoneração de pensão alimentícia com estratégia personalizada.',
    },
    {
      icon: Shield,
      title: 'Planejamento Sucessório',
      description: 'Organização antecipada da transmissão de bens para proteger o patrimônio familiar.',
    },
    {
      icon: HandHeart,
      title: 'Processo de Curatela',
      description: 'Representação em processos de curatela para proteção de pessoas incapazes.',
    },
    {
      icon: FileCheck,
      title: 'Reconhecimento de União Estável',
      description: 'Formalização legal da união estável para garantir direitos e segurança jurídica.',
    },
    {
      icon: Users,
      title: 'Regulamentação de Guarda',
      description: 'Guarda de crianças e adolescentes, visitas e convivência familiar.',
    },
    {
      icon: Baby,
      title: 'Testamento',
      description: 'Elaboração e registro de testamentos para garantir a vontade do testador.',
    },
    {
      icon: HelpCircle,
      title: 'E mais...',
      description: 'Atuamos em diversas outras demandas de Direito de Família e Sucessões.',
    },
  ];

  return (
    <section id="servicos" className={`section ${styles.services}`}>
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
        >
          <h2>Nossos Serviços</h2>
          <p>
            Com ampla experiência em Direito de Família e Sucessões, nossa equipe está
            altamente qualificada para atuar nas seguintes áreas:
          </p>
        </motion.div>

        <div className={styles.grid}>
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className={styles.card}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' }}
              whileHover={{ y: -8 }}
            >
              <div className={styles.iconWrapper}>
                <service.icon size={28} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
