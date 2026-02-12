# Calife & Sampaio - Advocacia Especializada

Site institucional do escritório **Calife & Sampaio Advocacia Especializada**, com foco em Direito de Família e Sucessões.

## Sobre o Projeto

Site desenvolvido para apresentar o escritório, suas sócias fundadoras, áreas de atuação, diferenciais, blog com artigos jurídicos e informações de contato das unidades em Recife/PE e Natal/RN.

## Tecnologias

- **React 19** - Biblioteca para construção da interface
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Framer Motion** - Animações e transições
- **Lucide React** - Biblioteca de ícones
- **CSS Modules** - Estilização com escopo por componente

## Como rodar localmente

```bash
# Instalar dependencias
npm install

# Rodar em desenvolvimento
npm run dev

# Gerar build de producao
npm run build
```

## Estrutura

```
src/
├── components/
│   ├── Header.tsx      # Cabecalho com navegacao
│   ├── Hero.tsx        # Secao principal
│   ├── About.tsx       # Sobre o escritorio
│   ├── Differentials.tsx # Diferenciais
│   ├── Services.tsx    # Areas de atuacao
│   ├── Team.tsx        # Socias fundadoras
│   ├── Blog.tsx        # Artigos juridicos
│   ├── Contact.tsx     # Contato e formulario
│   ├── Footer.tsx      # Rodape
│   └── WhatsAppButton.tsx # Botao flutuante do WhatsApp
├── App.tsx
├── main.tsx
└── index.css
```
