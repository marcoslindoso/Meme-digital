# Meme Digital — Next.js

Migração fiel do frontend WordPress para Next.js 16 com App Router e
TypeScript. A saída visual original é preservada por snapshots locais dos
templates do Elementor, incluindo cabeçalho, rodapé, estilos e animações.

## Desenvolvimento

O projeto funciona sem PHP, banco de dados ou WordPress em execução:

```powershell
npm install
npm run dev
```

O Next.js abre em `http://localhost:3000`.

## Produção e Vercel

```powershell
npm run build
npm run start
```

Os assets utilizados ficam versionados em `public/wp-content` e
`public/wp-includes`. O build e o deploy não acessam `localhost:8080` nem a
instalação WordPress.

URLs internas do domínio público são normalizadas para caminhos locais. A
navegação permanece no Next.js e não abre o site original.

Na Vercel, importe a pasta `next-site` como raiz do projeto. Não é necessário
configurar `WORDPRESS_URL` nem outras variáveis para o frontend atual.

## Atualizar a partir do backup

Somente quando quiser importar mudanças futuras do WordPress, inicie o backup
local em `http://localhost:8080` e execute:

```powershell
npm run sync:wordpress
```

Esse comando atualiza os conteúdos, os snapshots visuais e somente os assets
necessários. Ele não é executado durante o build ou na Vercel.

## Tipografia

- Títulos: Rubik, servida localmente em `public/fonts`.
- Corpo: `-apple-system`, com fallbacks nativos do sistema.
