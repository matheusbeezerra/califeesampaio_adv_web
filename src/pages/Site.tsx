import { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Differentials from '../components/Differentials';
import Services from '../components/Services';
import Team from '../components/Team';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ContactModal from '../components/ContactModal';

function Site() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactMessage, setContactMessage] = useState<string | undefined>();

  const handleContactClick = (message?: string) => {
    setContactMessage(message);
    setShowContactModal(true);
  };

  return (
    <>
      <Header />
      <main>
        <Hero onContactClick={handleContactClick} />
        <About />
        <Differentials />
        <Services />
        <Team />
        <Blog onContactClick={handleContactClick} />
        <Contact onContactClick={handleContactClick} />
      </main>
      <Footer />
      <WhatsAppButton onContactClick={handleContactClick} />
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        whatsappMessage={contactMessage}
      />
    </>
  );
}

export default Site;
