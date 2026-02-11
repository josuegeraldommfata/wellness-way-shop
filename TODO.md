# TODO: Migração para PostgreSQL e Integração Admin Panel

## 1. Criar Banco de Dados PostgreSQL
- [x] Criar banco "loja" no pgAdmin4 com usuário postgres e senha 320809eu

## 2. Atualizar Backend para PostgreSQL
- [x] Instalar dependências: sequelize, pg, pg-hstore
- [x] Criar arquivo .env com DATABASE_URL=postgresql://postgres:320809eu@localhost:5432/loja
- [x] Atualizar models/Product.js para Sequelize
- [x] Atualizar models/Order.js para Sequelize
- [x] Atualizar server.js para conectar ao PostgreSQL
- [x] Atualizar controllers/productController.js para Sequelize
- [x] Atualizar controllers/orderController.js para Sequelize
- [x] Atualizar controllers/paymentController.js para Sequelize
- [x] Atualizar seed.js para Sequelize

## 3. Atualizar Painel Admin para API
- [x] Modificar src/pages/admin/Produtos.tsx para usar API em vez de contexto
- [x] Modificar src/pages/admin/Pedidos.tsx para usar API em vez de contexto
- [ ] Atualizar contextos se necessário

## 4. Testes e Funcionalidade
- [ ] Testar endpoints com Postman
- [ ] Verificar painel admin funcionando
- [ ] Executar seed para popular banco

## 5. Implementar Checkout Frontend
- [x] Criar página Checkout.tsx
- [x] Adicionar rota /checkout no App.tsx
- [x] Modificar Carrinho.tsx: botão "Finalizar Compra" navegar para /checkout
- [x] Implementar formulário de checkout com dados de usuário, envio e pagamento
- [x] Integrar criação de pedido via API POST /api/orders
- [ ] Placeholder para integração de pagamento (sem chaves por enquanto)
