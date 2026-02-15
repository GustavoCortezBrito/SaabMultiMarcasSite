# Deploy na Vercel - SAAB Multimarcas

## ⚠️ IMPORTANTE: Limitação do Sistema Atual

O sistema atual usa arquivos locais (`db.json`) para armazenar os veículos. **Na Vercel, o sistema de arquivos é read-only**, o que significa:

✅ **O que funciona:**
- Site completo funcionando
- Página de estoque mostrando os 9 veículos iniciais
- Filtros e busca
- Painel admin (login funciona)

❌ **O que NÃO funciona na Vercel:**
- Adicionar novos veículos (não persiste)
- Editar veículos existentes (não persiste)
- Deletar veículos (não persiste)

## Solução Temporária

Para testar o site na Vercel com os veículos atuais:

1. Faça o deploy normalmente
2. Os 9 veículos do `db.json` aparecerão no estoque
3. Use o painel admin apenas para demonstração (mudanças não persistem)

## Solução Permanente: Usar Banco de Dados Real

Para que o painel admin funcione em produção, você precisa migrar para um banco de dados real. Recomendo:

### Opção 1: Vercel Postgres (Recomendado)

```bash
# Instalar
npm install @vercel/postgres

# Configurar no dashboard da Vercel
# Criar tabela vehicles
# Atualizar as API routes para usar Postgres
```

### Opção 2: Supabase (Gratuito e Fácil)

```bash
# Instalar
npm install @supabase/supabase-js

# Criar conta em supabase.com
# Criar tabela vehicles
# Atualizar as API routes para usar Supabase
```

### Opção 3: MongoDB Atlas (Gratuito)

```bash
# Instalar
npm install mongodb

# Criar conta em mongodb.com
# Criar cluster gratuito
# Atualizar as API routes para usar MongoDB
```

## Como fazer o Deploy

1. Faça push do código para o GitHub:
```bash
git add .
git commit -m "Deploy inicial"
git push
```

2. Acesse [vercel.com](https://vercel.com)

3. Clique em "New Project"

4. Importe seu repositório do GitHub

5. Configure:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

6. Clique em "Deploy"

## Após o Deploy

- Seu site estará disponível em: `https://seu-projeto.vercel.app`
- Admin: `https://seu-projeto.vercel.app/admin/login`
  - Usuário: admin
  - Senha: saab2026

## Próximos Passos

Se você quiser que o painel admin funcione em produção, me avise e eu posso ajudar a implementar uma das soluções de banco de dados acima!
