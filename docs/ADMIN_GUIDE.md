# Monte da Estrada - Guia do Administrador

## 📋 Índice

1. [Como Aceder ao Painel de Administração](#como-aceder)
2. [Como Editar Conteúdo](#como-editar-conteúdo)
3. [Como Carregar e Gerir Imagens](#como-carregar-imagens)
4. [Aguardar Publicação das Alterações](#aguardar-publicação)
5. [Perguntas Frequentes](#perguntas-frequentes)
6. [Resolução de Problemas](#resolução-de-problemas)
7. [Contactos de Suporte](#contactos)

---

## 🔐 Como Aceder ao Painel de Administração {#como-aceder}

### Passo 1: Abrir o Painel

1. Abra o seu navegador (Chrome, Firefox, Safari, ou Edge)
2. Visite o endereço: **https://seu-site.netlify.app/admin**
   - Substitua `seu-site` pelo nome real do seu site no Netlify
3. Aguarde que a página carregue

### Passo 2: Fazer Login

1. Na primeira vez que aceder, receberá um email de convite
2. Clique no link do email para criar a sua senha
3. Introduza o seu **email** e **senha**
4. Clique em **"Login"**
5. O painel de administração abrirá

### Passo 3: Navegar no Painel

Após fazer login, verá a lista de páginas que pode editar:
- **Página Inicial** - Conteúdo da homepage
- **Quartos** - Informações sobre quartos e preços
- **Atividades** - Atividades e experiências
- **A Região** - Informação sobre redondezas
- **Localização** - Morada e como chegar
- **Galeria** - Imagens do monte

---

## ✏️ Como Editar Conteúdo {#como-editar-conteúdo}

### Editar Texto na Página Inicial

1. No painel, clique em **"Página Inicial"**
2. Clique no item **"Conteúdo da Home"**
3. Verá todos os campos editáveis organizados por secções:

#### Hero Section (Topo da Página)
- **Título**: O título principal (ex: "Monte da Estrada")
- **Subtítulo**: O subtítulo (ex: "Turismo Rural no Alentejo")
- **Imagem de Fundo**: Clique para alterar a imagem do topo

#### Secção de Boas-vindas
- **Título**: Título da secção de boas-vindas
- **Parágrafos**: Lista de parágrafos
  - Para **adicionar** um parágrafo: clique em "+ Add paragraph"
  - Para **editar** um parágrafo: clique nele e modifique o texto
  - Para **remover** um parágrafo: clique no X vermelho

#### Destaques
- Lista de destaques com título, descrição e ícone
- Para **adicionar**: clique em "+ Add highlights"
- Para **editar**: clique no item e modifique os campos
- Para **reordenar**: arraste os itens
- Para **remover**: clique no X vermelho

4. Depois de fazer as alterações, clique em **"Publish"** no topo
5. Confirme a publicação clicando em **"Publish now"**

### Editar Outras Páginas

O processo é semelhante para todas as páginas:

**Quartos:**
1. Clique em "Quartos" no menu lateral
2. Edite informações dos quartos, preços e comodidades
3. Clique em "Publish" quando terminar

**Atividades:**
1. Clique em "Atividades"
2. Edite as categorias de atividades e suas descrições
3. Adicione ou remova atividades conforme necessário

**A Região:**
1. Clique em "A Região"
2. Edite informações sobre praias, vilas, restaurantes e eventos
3. Atualize distâncias e descrições

**Localização:**
1. Clique em "Localização"
2. Atualize morada, GPS e direções
3. Modifique distâncias e dicas úteis

**Galeria:**
1. Clique em "Galeria"
2. Organize imagens por categorias
3. Adicione legendas às fotografias

---

## 📷 Como Carregar e Gerir Imagens {#como-carregar-imagens}

### Carregar uma Nova Imagem

1. No campo de imagem, clique no botão **"Choose an image"**
2. Tem duas opções:
   - **Upload**: Carregar uma imagem do seu computador
   - **Choose**: Selecionar uma imagem já carregada

#### Opção A: Carregar do Computador
1. Clique em **"Upload"**
2. Selecione a imagem no seu computador
3. Aguarde o upload (verá uma barra de progresso)
4. A imagem aparecerá no campo

#### Opção B: Escolher Imagem Existente
1. Clique em **"Choose"**
2. Navegue pelas imagens já carregadas
3. Clique na imagem desejada
4. Clique em **"Choose selected"**

### Dicas para Imagens

✅ **Recomendações:**
- Formato: JPG ou PNG
- Tamanho máximo: 5 MB por imagem
- Resolução recomendada: 1920x1080 pixels para imagens grandes
- Nomes de ficheiro: use nomes descritivos (ex: `quarto-duplo-1.jpg`)

❌ **Evite:**
- Imagens muito grandes (> 10 MB)
- Nomes com espaços ou caracteres especiais
- Imagens de baixa qualidade ou pixeladas

### Organizar Imagens na Galeria

1. Vá para **Galeria**
2. Cada categoria tem uma lista de imagens
3. Para **reordenar** imagens: arraste-as para a posição desejada
4. Para **adicionar** imagem: clique em "+ Add images"
5. Para **remover** imagem: clique no X vermelho
6. Não se esqueça de adicionar:
   - **Texto Alternativo (alt)**: Descrição para acessibilidade
   - **Legenda (caption)**: Texto que aparece sob a imagem

---

## ⏱️ Aguardar Publicação das Alterações {#aguardar-publicação}

### Como Funciona o Sistema

Quando clica em **"Publish"**, o sistema:

1. **Guarda as alterações** no repositório Git (GitHub)
2. **Aciona automaticamente** a reconstrução do site no Netlify
3. **Publica** a nova versão do site

### Tempo de Espera

⏰ **Tempo normal**: 1 a 3 minutos
- Depende da quantidade de alterações
- Sites grandes podem demorar mais

### Verificar se Publicou

1. Após clicar em "Publish", aguarde **2 minutos**
2. Abra o site numa **janela privada/anónima** do navegador
3. Pressione **Ctrl + F5** (Windows) ou **Cmd + Shift + R** (Mac) para forçar atualização
4. Verifique se as suas alterações estão visíveis

### Acompanhar o Progresso (Opcional)

Se tiver acesso ao Netlify:
1. Aceda a **app.netlify.com**
2. Selecione o site **Monte da Estrada**
3. Veja o estado do **deploy** (build) em tempo real
4. Verde = Publicado ✅
5. Amarelo = A publicar ⏳
6. Vermelho = Erro ❌

---

## ❓ Perguntas Frequentes {#perguntas-frequentes}

### Q1: Quanto tempo demora a atualizar o site?

**R:** Normalmente entre 1 a 3 minutos após clicar em "Publish". Se após 5 minutos ainda não vir as alterações, tente:
1. Limpar a cache do navegador (Ctrl + Shift + Delete)
2. Abrir em janela privada/anónima
3. Contactar suporte técnico

### Q2: Posso editar de qualquer dispositivo?

**R:** Sim! Pode editar do:
- 💻 Computador (Windows, Mac, Linux)
- 📱 Tablet (iPad, Android)
- 📱 Telemóvel (iPhone, Android)

Basta ter acesso à internet e um navegador moderno.

### Q3: E se cometer um erro?

**R:** Não há problema! Pode sempre:
1. Voltar ao painel de administração
2. Editar novamente o conteúdo
3. Corrigir o erro
4. Clicar em "Publish" novamente

**Nota:** O sistema guarda o histórico de todas as alterações no Git, por isso é possível reverter se necessário (contacte o suporte técnico).

### Q4: Posso ver as alterações antes de publicar?

**R:** Atualmente, o sistema publica diretamente. Recomendamos:
1. Rever bem o conteúdo antes de clicar em "Publish"
2. Fazer alterações pequenas de cada vez
3. Verificar o resultado após cada publicação

### Q5: Esqueci-me da senha. O que faço?

**R:**
1. Na página de login, clique em **"Forgot password?"**
2. Introduza o seu email
3. Receberá um email com instruções
4. Siga o link e crie uma nova senha

### Q6: Posso adicionar novos quartos ou atividades?

**R:** Sim! Em cada secção (Quartos, Atividades, etc.):
1. Procure o botão **"+ Add [nome do item]"**
2. Clique para adicionar um novo item
3. Preencha todos os campos obrigatórios
4. Clique em "Publish"

### Q7: As alterações aparecem em todos os dispositivos?

**R:** Sim! Quando publica alterações:
- ✅ Todos os visitantes vêem a nova versão
- ✅ Em todos os dispositivos (desktop, tablet, mobile)
- ✅ Em todos os browsers (Chrome, Firefox, Safari, etc.)

---

## 🔧 Resolução de Problemas {#resolução-de-problemas}

### Problema: Não consigo fazer login

**Possíveis Causas e Soluções:**

1. **Senha incorreta**
   - Verifique se o Caps Lock está desligado
   - Tente recuperar a senha (Forgot password?)

2. **Email não reconhecido**
   - Confirme que está a usar o email correto
   - Verifique se recebeu o email de convite
   - Contacte o administrador para reenviar convite

3. **Página não carrega**
   - Verifique a sua ligação à internet
   - Tente outro navegador
   - Limpe a cache do navegador

### Problema: Alterações não aparecem no site

**Soluções:**

1. **Aguarde mais tempo**
   - Espere pelo menos 3 minutos após publicar
   - O site está a reconstruir em segundo plano

2. **Limpe a cache**
   - No Chrome: Ctrl + Shift + Delete
   - No Firefox: Ctrl + Shift + Delete
   - No Safari: Cmd + Option + E

3. **Force refresh**
   - Windows: Ctrl + F5
   - Mac: Cmd + Shift + R

4. **Teste em janela privada**
   - Abra uma janela anónima/privada
   - Visite o site novamente

5. **Verifique o Netlify**
   - Veja se o deploy completou com sucesso
   - Procure erros nos logs

### Problema: Imagem não carrega

**Soluções:**

1. **Tamanho do ficheiro**
   - Verifique se a imagem tem menos de 10 MB
   - Comprima a imagem se necessário

2. **Formato do ficheiro**
   - Use apenas JPG, PNG ou WebP
   - Evite formatos como BMP, TIFF

3. **Nome do ficheiro**
   - Não use espaços (use hífens: `quarto-1.jpg`)
   - Não use acentos ou caracteres especiais

### Problema: Não vejo o botão "Publish"

**Soluções:**

1. **Faça scroll até ao topo** da página
   - O botão está no cabeçalho da página de edição

2. **Verifique se fez alterações**
   - O botão só aparece após modificar algum conteúdo

3. **Recarregue a página**
   - Pressione F5 para recarregar
   - Faça login novamente se necessário

### Problema: Erro ao publicar

**Mensagens Comuns:**

1. **"Unable to save changes"**
   - Verifique a ligação à internet
   - Tente novamente em alguns minutos
   - Contacte suporte se persistir

2. **"Validation error"**
   - Há campos obrigatórios por preencher
   - Procure campos marcados com asterisco (*)
   - Preencha todos os campos necessários

---

## 📞 Contactos de Suporte {#contactos}

### Suporte Técnico

**Developer (Tomás):**
- 📧 Email: [seu-email@exemplo.com]
- 📱 Telefone: [seu-telefone]
- Disponível: Segunda a Sexta, 9h-18h

### Recursos Adicionais

**Documentação Oficial:**
- Decap CMS: https://decapcms.org/docs/
- Netlify: https://docs.netlify.com/

**Vídeos Tutoriais:**
- Procure no YouTube: "Decap CMS tutorial português"
- Procure no YouTube: "Netlify CMS como usar"

### Antes de Contactar o Suporte

Para resolver o problema mais rapidamente, tenha esta informação pronta:

1. ✅ **Descrição do problema**: O que estava a tentar fazer?
2. ✅ **Mensagem de erro**: Tire um screenshot se possível
3. ✅ **Dispositivo**: Está no computador, tablet ou telemóvel?
4. ✅ **Navegador**: Chrome, Firefox, Safari, etc.?
5. ✅ **Quando aconteceu**: Data e hora aproximada
6. ✅ **Já tentou**: O que já tentou fazer para resolver?

---

## 📝 Notas Finais

### Boas Práticas

✅ **Faça:**
- Edite com calma e atenção
- Releia o texto antes de publicar
- Faça alterações pequenas de cada vez
- Teste no site após publicar
- Mantenha backup das imagens no seu computador

❌ **Evite:**
- Fazer muitas alterações simultâneas
- Publicar sem rever
- Carregar imagens muito grandes
- Partilhar a sua senha
- Editar enquanto outra pessoa também está a editar

### Dicas de Segurança

🔒 **Proteja a sua Conta:**
1. Use uma senha forte (mínimo 10 caracteres)
2. Não partilhe a senha com ninguém
3. Faça logout após terminar
4. Não guarde a senha no navegador de computadores partilhados

### Atualizações

Este guia será atualizado periodicamente. Verifique a versão mais recente em:
- 📄 Ficheiro: `/docs/ADMIN_GUIDE.md`
- 📅 Última atualização: Janeiro 2026
- 📌 Versão: 1.0

---

**Boa sorte e bom trabalho! 🎉**

Se tiver dúvidas, não hesite em contactar o suporte técnico.

---

*Monte da Estrada - Turismo Rural no Alentejo*
*Guia do Administrador - v1.0 - Janeiro 2026*
