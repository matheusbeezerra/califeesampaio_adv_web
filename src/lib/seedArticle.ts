import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

const seedArticle = {
  title: 'O bem-estar dos filhos em primeiro lugar',
  excerpt:
    'Baseado na vida real, o que vou compartilhar com você poderia facilmente se transformar em um filme de drama. Mas, na verdade, é o que acontece diariamente ao nosso redor.',
  date: 'Janeiro 2026',
  author: 'Cristiane Sampaio',
  category: 'Guarda e Convivência',
  imageUrl: '/images/familia-crianca.jpg',
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
  published: true,
  order: 1,
};

export async function seedExistingArticle() {
  try {
    await addDoc(collection(db, 'articles'), {
      ...seedArticle,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error('Erro ao criar artigo seed:', error);
    return false;
  }
}
