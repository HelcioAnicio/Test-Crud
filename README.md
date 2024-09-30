# Projeto CRUD com Deploy na Vercel

Este projeto utiliza **JSON Server** para criar uma API REST fake a partir de um arquivo `db.json`. O servidor está hospedado na **Vercel** e permite operações CRUD simples. 

## Tecnologias Usadas

- Next.js: Framework React para desenvolvimento de aplicações web.
- React: Biblioteca JavaScript para construir interfaces de usuário.
- JSON Server: Ferramenta para simular uma API REST usando um arquivo JSON.
- Axios: Biblioteca para fazer requisições HTTP.
- Tailwind CSS: Framework CSS para estilização.
- Lucide React: Biblioteca de ícones para React.
- TypeScript: Superset de JavaScript que adiciona tipagem estática.
- ESLint: Ferramenta para identificar e corrigir problemas no código.
- Prettier: Formatador de código.
- Vercel e render: Plataforma de deploy para aplicações web e backend

## Instalação e Execução Local

Siga os passos abaixo para rodar o projeto localmente:

### Pré-requisitos

- Node.js (versão 14 ou superior)
- NPM ou Yarn

### Passos para rodar o projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd nome-do-repositorio
   ```

3. Instale as dependências:
   Se estiver utilizando NPM:
   ```bash
   npm install
   ```

   Ou, se estiver utilizando Yarn:
   ```bash
   yarn install
   ```

4. Execute o servidor:
   Se estiver utilizando **NPM**:
   ```bash
   npm run dev
   ```
   
   Ou, se estiver utilizando **Yarn**:
   ```bash
   yarn run dev
   ```

   O projeto estará rodando localmente na porta 3000 ou em outra porta configurada.

5. Acesse a API:

   Acesse a API localmente através de:
   ```
   https://json-server-wb8q.onrender.com
   ```

## Como Rodar o Projeto em Produção

Este projeto está deployado na Vercel. Você pode acessá-lo diretamente através da URL fornecida pela Vercel:

https://test-crud-one.vercel.app/

### Endpoints da API

Aqui estão alguns exemplos de endpoints disponíveis na API:

- "/campaigns"
- "/categories"

### Exemplo de Request:

```bash
curl -X GET https://test-crud-one.vercel.app/campaigns
```

## Estrutura do Projeto

```
.
├── README.md
├── db.json
├── next-env.d.ts
├── next.config.mjs
├── node_modules
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── prettier.config.js
├── src
│   └── app
│       ├── components
│       │   ├── footer
│       │   │   └── footer.tsx
│       │   ├── header
│       │   │   └── header.tsx
│       │   ├── modalAdd
│       │   │   └── modalAdd.tsx
│       │   └── modalEdit
│       │       └── modalEdit.tsx
│       ├── details
│       │   └── [slug]
│       │       └── page.tsx
│       ├── fonts
│       │   ├── GeistMonoVF.woff
│       │   └── GeistVF.woff
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
├── tailwind.config.ts
└── tsconfig.json
```

## Dependências

```json
"dependencies": {
  "axios": "^1.7.7",
  "json-server": "1.0.0-beta.3",
  "lucide-react": "^0.446.0",
  "next": "14.2.13",
  "react": "^18.3.1",
  "react-dom": "^18.3.1"
},
"devDependencies": {
  "@types/node": "^20",
  "@types/react": "^18",
  "@types/react-dom": "^18",
  "eslint": "^8",
  "eslint-config-next": "14.2.13",
  "postcss": "^8",
  "prettier": "^3.3.3",
  "prettier-plugin-tailwindcss": "^0.6.8",
  "tailwindcss": "^3.4.1",
  "typescript": "^5"
}
```

## Como Contribuir

Se você deseja contribuir com este projeto, siga as etapas abaixo:

1. Faça um fork do repositório
2. Crie um branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Envie para o branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request
