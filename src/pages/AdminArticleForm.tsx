import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  doc,
  getDoc,
  addDoc,
  updateDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';
import { ArrowLeft, Image, Save } from 'lucide-react';
import { db } from '../lib/firebase';
import styles from './AdminArticleForm.module.css';

function AdminArticleForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [order, setOrder] = useState(0);
  const [published, setPublished] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      setLoading(true);
      try {
        const snap = await getDoc(doc(db, 'articles', id));
        if (snap.exists()) {
          const data = snap.data();
          setTitle(data.title || '');
          setExcerpt(data.excerpt || '');
          setContent(data.content || '');
          setAuthor(data.author || '');
          setCategory(data.category || '');
          setDate(data.date || '');
          setOrder(data.order || 0);
          setPublished(data.published || false);
          setImageUrl(data.imageUrl || '');
        }
      } catch (error) {
        console.error('Erro ao carregar artigo:', error);
        alert('Erro ao carregar artigo.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content || !author) {
      alert('Preencha pelo menos o título, conteúdo e autor.');
      return;
    }

    setSaving(true);

    try {
      const articleData = {
        title,
        excerpt,
        content,
        author,
        category,
        date,
        imageUrl,
        published,
        order,
        updatedAt: serverTimestamp(),
      };

      if (isEditing && id) {
        await updateDoc(doc(db, 'articles', id), articleData);
      } else {
        await addDoc(collection(db, 'articles'), {
          ...articleData,
          createdAt: serverTimestamp(),
        });
      }

      navigate('/admin');
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar artigo.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.formPage}>
        <p style={{ textAlign: 'center', padding: '60px' }}>Carregando...</p>
      </div>
    );
  }

  return (
    <div className={styles.formPage}>
      <header className={styles.formHeader}>
        <div className={styles.formHeaderInner}>
          <button onClick={() => navigate('/admin')} className={styles.backBtn}>
            <ArrowLeft size={18} />
            Voltar
          </button>
          <h1>{isEditing ? 'Editar Artigo' : 'Novo Artigo'}</h1>
        </div>
      </header>

      <main className={styles.formMain}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.formLeft}>
              <div className={styles.field}>
                <label htmlFor="title">Título *</label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="excerpt">Resumo</label>
                <textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={3}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="content">Conteúdo *</label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={15}
                  required
                />
              </div>
            </div>

            <div className={styles.formRight}>
              <div className={styles.field}>
                <label htmlFor="author">Autor *</label>
                <select
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="Cristiane Sampaio">Cristiane Sampaio</option>
                  <option value="Ana Flávia Calife">Ana Flávia Calife</option>
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="category">Categoria</label>
                <input
                  id="category"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Ex: Guarda e Convivência"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="date">Data de exibição</label>
                <input
                  id="date"
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Ex: Fevereiro 2026"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="order">Ordem</label>
                <input
                  id="order"
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(Number(e.target.value))}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="imageUrl">URL da Imagem</label>
                <input
                  id="imageUrl"
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Ex: /images/foto.jpg ou https://..."
                />
                {imageUrl && (
                  <div className={styles.imagePreviewBox}>
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className={styles.imagePreview}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <p className={styles.fieldHint}>
                  <Image size={14} />
                  Use "/images/nome.jpg" para imagens do site ou cole um link externo
                </p>
              </div>

              <div className={styles.checkboxField}>
                <label>
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                  />
                  Publicar artigo
                </label>
              </div>
            </div>
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className={styles.cancelBtn}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.saveBtn}
              disabled={saving}
            >
              <Save size={18} />
              {saving ? 'Salvando...' : isEditing ? 'Salvar alterações' : 'Criar artigo'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default AdminArticleForm;
