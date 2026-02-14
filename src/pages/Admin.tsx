import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  type User,
} from 'firebase/auth';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { LogOut, Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { auth, db } from '../lib/firebase';
import AdminArticleForm from './AdminArticleForm';
import { seedExistingArticle } from '../lib/seedArticle';
import styles from './Admin.module.css';

interface Article {
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

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
    } catch {
      setError('Email ou senha inválidos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h1>Painel Administrativo</h1>
        <p className={styles.loginSubtitle}>Calife & Sampaio Advocacia</p>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className={styles.loginBtn} disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}

function Dashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchArticles = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'articles'));
      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as Article[];
      data.sort((a, b) => (a.order || 0) - (b.order || 0));
      setArticles(data);
    } catch (error) {
      console.error('Erro ao buscar artigos:', error);
      alert('Erro ao buscar artigos: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Tem certeza que deseja excluir "${title}"?`)) return;

    try {
      await deleteDoc(doc(db, 'articles', id));
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      console.error('Erro ao excluir:', error);
      alert('Erro ao excluir artigo.');
    }
  };

  const handleTogglePublish = async (article: Article) => {
    try {
      await updateDoc(doc(db, 'articles', article.id), {
        published: !article.published,
      });
      setArticles((prev) =>
        prev.map((a) =>
          a.id === article.id ? { ...a, published: !a.published } : a
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      alert('Erro ao atualizar artigo.');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.dashboardHeader}>
        <div className={styles.dashboardHeaderInner}>
          <h1>Painel Admin</h1>
          <div className={styles.headerActions}>
            <button
              onClick={() => navigate('/admin/novo')}
              className={styles.newArticleBtn}
            >
              <Plus size={18} />
              Novo Artigo
            </button>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              <LogOut size={18} />
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className={styles.dashboardMain}>
        <h2>Artigos ({articles.length})</h2>

        {loading ? (
          <p className={styles.loadingText}>Carregando artigos...</p>
        ) : articles.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Nenhum artigo cadastrado.</p>
            <button
              onClick={() => navigate('/admin/novo')}
              className={styles.newArticleBtn}
            >
              <Plus size={18} />
              Criar primeiro artigo
            </button>
            <button
              onClick={async () => {
                const ok = await seedExistingArticle();
                if (ok) {
                  alert('Artigo inicial criado com sucesso!');
                  fetchArticles();
                } else {
                  alert('Erro ao criar artigo inicial.');
                }
              }}
              className={styles.newArticleBtn}
              style={{ marginLeft: 12, background: 'var(--color-primary)' }}
            >
              Importar artigo existente
            </button>
          </div>
        ) : (
          <div className={styles.articlesList}>
            {articles.map((article) => (
              <div key={article.id} className={styles.articleItem}>
                <div className={styles.articleInfo}>
                  <h3>{article.title}</h3>
                  <div className={styles.articleMeta}>
                    <span>{article.author}</span>
                    <span>{article.date}</span>
                    <span
                      className={`${styles.status} ${
                        article.published ? styles.published : styles.draft
                      }`}
                    >
                      {article.published ? 'Publicado' : 'Rascunho'}
                    </span>
                  </div>
                </div>
                <div className={styles.articleActions}>
                  <button
                    onClick={() => handleTogglePublish(article)}
                    className={styles.actionBtn}
                    title={
                      article.published ? 'Despublicar' : 'Publicar'
                    }
                  >
                    {article.published ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                  <button
                    onClick={() => navigate(`/admin/editar/${article.id}`)}
                    className={styles.actionBtn}
                    title="Editar"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(article.id, article.title)}
                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                    title="Excluir"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setChecking(false);
    });
    return unsubscribe;
  }, []);

  if (checking) {
    return (
      <div className={styles.loginContainer}>
        <p>Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return <LoginForm onLogin={() => {}} />;
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/novo" element={<AdminArticleForm />} />
      <Route path="/editar/:id" element={<AdminArticleForm />} />
    </Routes>
  );
}

export default Admin;
