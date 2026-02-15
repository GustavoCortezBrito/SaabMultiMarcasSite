# Banco de Dados - SAAB Multimarcas

## Como usar

O projeto agora usa API Routes do Next.js para gerenciar os veículos.

### Desenvolvimento Local

Basta executar:

```bash
npm run dev
```

O Next.js iniciará na porta 3000 e as APIs estarão disponíveis automaticamente.

### Deploy na Vercel

O projeto está pronto para deploy na Vercel! Basta fazer o push para o GitHub e conectar na Vercel.

**IMPORTANTE:** Na Vercel, o sistema de arquivos é read-only. Para produção, você tem duas opções:

#### Opção 1: Dados Estáticos (Recomendado para começar)
Os veículos iniciais do `db.json` serão carregados, mas as edições pelo admin não persistirão entre deploys. Ideal para testar o site.

#### Opção 2: Banco de Dados Real (Recomendado para produção)
Para que as edições persistam, você precisará usar um banco de dados real como:
- Vercel KV (Redis)
- Vercel Postgres
- MongoDB Atlas
- Supabase

### 3. Acessar o site

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin/login
  - Usuário: admin
  - Senha: saab2026

## Funcionalidades

- ✅ Adicionar veículos pelo painel admin
- ✅ Editar veículos existentes
- ✅ Excluir veículos
- ✅ Visualizar veículos no estoque
- ✅ Filtrar veículos por marca, ano e busca
- ✅ Dados persistem localmente

## Arquivo de dados

Os dados ficam salvos em `db.json` na raiz do projeto. Você pode editar este arquivo diretamente se necessário.

## API Endpoints

- GET /api/vehicles - Lista todos os veículos
- GET /api/vehicles/:id - Busca um veículo específico
- POST /api/vehicles - Cria um novo veículo
- PATCH /api/vehicles/:id - Atualiza um veículo
- DELETE /api/vehicles/:id - Deleta um veículo

## Nota sobre JSON Server

O `json-server` não é mais necessário. Você pode removê-lo se quiser:
```bash
npm uninstall json-server
```

E remover o script `"db"` do `package.json`.
