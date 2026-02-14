import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight, X, Share2, Check } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import styles from './Blog.module.css';

const viewportConfig = { once: false, amount: 0.2, margin: '-50px' };

interface BlogProps {
  onContactClick: (message?: string) => void;
}

interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  date: string;
  imageUrl: string;
  published: boolean;
  order: number;
}

const Blog = ({ onContactClick }: BlogProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'articles'));
        const articles = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Post[];
        const published = articles
          .filter((a) => a.published)
          .sort((a, b) => (a.order || 0) - (b.order || 0));
        setPosts(published);
      } catch (error) {
        console.error('Erro ao buscar artigos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}#artigo/${selectedPost}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const openPost = (id: string) => {
    setSelectedPost(id);
    window.location.hash = `artigo/${id}`;
  };

  const closePost = () => {
    setSelectedPost(null);
    if (window.location.hash.startsWith('#artigo/')) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      const match = hash.match(/^#artigo\/(.+)$/);
      if (match && posts.length > 0) {
        const id = match[1];
        const found = posts.find((p) => p.id === id);
        if (found) {
          setSelectedPost(id);
          document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [posts]);

  const selectedPostData = posts.find((p) => p.id === selectedPost);

  if (loading) {
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
            <p>Carregando artigos...</p>
          </motion.div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
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
        </div>
      </section>
    );
  }

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
            <img src={post.imageUrl} alt={post.title} />
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
              onClick={() => openPost(post.id)}
              className={styles.readMore}
            >
              Ler artigo completo <ArrowRight size={18} />
            </button>
          </div>
        </motion.article>

        {posts.length > 1 && (
          <div className={styles.postsGrid}>
            {posts.slice(1).map((p) => (
              <motion.article
                key={p.id}
                className={styles.postCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.5 }}
              >
                <div className={styles.postCardImage}>
                  <img src={p.imageUrl} alt={p.title} />
                </div>
                <div className={styles.postCardContent}>
                  <span className={styles.category}>{p.category}</span>
                  <h4>{p.title}</h4>
                  <div className={styles.meta}>
                    <span className={styles.date}>
                      <Calendar size={14} />
                      {p.date}
                    </span>
                  </div>
                  <p>{p.excerpt}</p>
                  <button
                    onClick={() => openPost(p.id)}
                    className={styles.readMore}
                  >
                    Ler mais <ArrowRight size={16} />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      {selectedPostData && (
        <div className={styles.modal} onClick={closePost}>
          <motion.div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.modalActions}>
              <button
                className={styles.shareBtn}
                onClick={handleShare}
                aria-label="Compartilhar artigo"
              >
                {copied ? <Check size={20} /> : <Share2 size={20} />}
                <span className={styles.shareBtnText}>{copied ? 'Link copiado!' : 'Compartilhar'}</span>
              </button>
              <button
                className={styles.closeBtn}
                onClick={closePost}
                aria-label="Fechar"
              >
                <X size={24} />
              </button>
            </div>

            <div className={styles.modalHeader}>
              <span className={styles.category}>{selectedPostData.category}</span>
              <h2>{selectedPostData.title}</h2>
              <div className={styles.meta}>
                <span className={styles.author}>
                  <User size={16} />
                  {selectedPostData.author}
                </span>
                <span className={styles.date}>
                  <Calendar size={16} />
                  {selectedPostData.date}
                </span>
              </div>
            </div>

            <div className={styles.modalBody}>
              {selectedPostData.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className={styles.modalFooter}>
              <p>
                <strong>{selectedPostData.author}</strong>
              </p>
              <button
                onClick={() => onContactClick(`Olá! Li o artigo "${selectedPostData.title}" e gostaria de saber mais.`)}
                className="btn btn-primary"
              >
                Fale com nossa equipe
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Blog;
