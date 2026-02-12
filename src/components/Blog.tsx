import { motion } from 'framer-motion';
import { useState } from 'react';
import { Calendar, User, ArrowRight, X } from 'lucide-react';
import styles from './Blog.module.css';

const viewportConfig = { once: false, amount: 0.2, margin: '-50px' };

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  const posts = [
    {
      id: 1,
      title: 'O bem-estar dos filhos em primeiro lugar',
      excerpt: 'Baseado na vida real, o que vou compartilhar com você poderia facilmente se transformar em um filme de drama. Mas, na verdade, é o que acontece diariamente ao nosso redor.',
      date: 'Janeiro 2025',
      author: 'Cristiane Sampaio',
      category: 'Guarda e Convivência',
      image: '/images/familia-crianca.jpg',
      content: `Baseado na vida real, o que vou compartilhar com você poderia facilmente se transformar em um filme de drama. Mas, na verdade, é o que acontece diariamente e com cada vez mais frequência ao nosso redor.

Como advogada especialista em Direito de Família, mergulhei nesse universo de conflitos familiares que, sem dúvida, são os que mais deixam marcas. Afinal, só tem o poder de nos ferir aqueles a quem permitimos entrar em nossa vida, aqueles em quem depositamos confiança, seja para construir vínculos eternos, seja para amar e respeitar.

E, muitas vezes, não é a morte quem separa. É a falta de diálogo, de respeito, de paciência, de reciprocidade, de fidelidade. São inúmeros os motivos, mas a certeza é uma só: como bem disse Bauman, a maioria das relações se tornaram mais líquidas, frágeis e passageiras.

Quando um casal se separa, rompe-se um vínculo e cada um segue sua vida. Mas quando há filhos, a separação não encerra a relação por completo: o laço entre homem e mulher se desfaz, mas permanece o desafio contínuo de criar e educar esses filhos, exigindo maturidade, responsabilidade e, acima de tudo, humanidade.

Entre tantas histórias que já passaram pelo escritório, eu poderia escolher uma e revelar fatos capazes de deixar qualquer um de queixo caído. Talvez eu faça isso em outro artigo. Neste, porém, quero falar de forma mais ampla sobre quem realmente sofre com a disputa de egos ao fim de um relacionamento: os filhos.

Muitas vezes, os pais nem percebem o quanto seus filhos estão sofrendo em silêncio. Acredito que, na maioria dos casos, eles estão genuinamente tentando lidar com o turbilhão de emoções dessa nova fase da melhor forma possível.

No entanto, acabam enfrentando não apenas suas próprias dores, mas também a pressão de uma disputa judicial, a resistência do outro em oferecer apoio ou cumprir com os deveres decorrentes do poder familiar. Somam-se ainda as acusações, as palavras duras trocadas em mensagens e o desgaste emocional que tudo isso provoca.

É por isso que, como operadora do Direito, procuro em cada consulta chamar a atenção para aquilo que constitui a verdadeira base do Direito de Família: quando há crianças e adolescentes envolvidos, a premissa que deve guiar qualquer decisão é o melhor interesse deles.

É preciso instruir, lembrar e repetir, mesmo que pareça óbvio. Porque o óbvio, quando esquecido, pode custar caro. E no Direito de Família, não há espaço para esquecer: o futuro dos filhos depende da responsabilidade dos pais e da consciência de todos nós.

Até a próxima!`,
    },
  ];

  const post = posts[0];

  return (
    <section id="blog" className={`section ${styles.blog}`}>
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
        >
          <h2>Notícias e Artigos</h2>
          <p>
            Conteúdos relevantes sobre Direito de Família e Sucessões para
            ajudar você a entender melhor seus direitos.
          </p>
        </motion.div>

        <motion.article
          className={styles.featuredCard}
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={viewportConfig}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className={styles.featuredImage}>
            <img src={post.image} alt={post.title} />
          </div>

          <div className={styles.featuredContent}>
            <span className={styles.category}>{post.category}</span>

            <h3>{post.title}</h3>

            <div className={styles.meta}>
              <span className={styles.author}>
                <User size={16} />
                {post.author}
              </span>
              <span className={styles.date}>
                <Calendar size={16} />
                {post.date}
              </span>
            </div>

            <p>{post.excerpt}</p>

            <button
              onClick={() => setSelectedPost(post.id)}
              className={styles.readMore}
            >
              Ler artigo completo <ArrowRight size={18} />
            </button>
          </div>
        </motion.article>
      </div>

      {/* Modal do artigo completo */}
      {selectedPost && (
        <div className={styles.modal} onClick={() => setSelectedPost(null)}>
          <motion.div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className={styles.closeBtn}
              onClick={() => setSelectedPost(null)}
              aria-label="Fechar"
            >
              <X size={24} />
            </button>

            <div className={styles.modalHeader}>
              <span className={styles.category}>{post.category}</span>
              <h2>{post.title}</h2>
              <div className={styles.meta}>
                <span className={styles.author}>
                  <User size={16} />
                  {post.author}
                </span>
                <span className={styles.date}>
                  <Calendar size={16} />
                  {post.date}
                </span>
              </div>
            </div>

            <div className={styles.modalBody}>
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className={styles.modalFooter}>
              <p>
                <strong>{post.author}</strong>
              </p>
              <a
                href="https://wa.me/5581992634067?text=Olá! Li o artigo sobre bem-estar dos filhos e gostaria de saber mais."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Fale com nossa equipe
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Blog;
