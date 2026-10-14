# 🟣 Canal LYNX — Central de Downloads & Tutoriais

Site oficial de downloads para o canal **LYNX**, desenvolvido com tema **Black & Purple (Roxo Neon)**, moderno, responsivo e 100% compatível com o **GitHub Pages**.

---

## 🚀 Como Hospedar Grátis no GitHub Pages (Passo a Passo)

O GitHub Pages é a melhor escolha: é **100% gratuito**, tem **HTTPS seguro** (cadeado verde) e o YouTube nunca bloqueia domínios `github.io`.

### Passo 1: Criar o Repositório no GitHub
1. Acesse o [GitHub](https://github.com) e entre na sua conta.
2. Clique no botão **New** (Novo repositório).
3. Escolha um nome para o repositório (ex: `downloads` ou `site-canal`).
4. Marque como **Public** (Público).
5. Clique em **Create repository**.

### Passo 2: Subir os Arquivos
Você pode subir diretamente pelo navegador ou via Git:
- **Pelo Navegador:** Na página do repositório vazio, clique em **uploading an existing file** e arraste todos os arquivos desta pasta:
  - `index.html`
  - `style.css`
  - `app.js`
  - `downloads-data.js`
  - `.nojekyll`
  - `README.md`
- Clique em **Commit changes**.

### Passo 3: Ativar o GitHub Pages
1. No seu repositório no GitHub, clique na aba **Settings** (Configurações).
2. No menu lateral esquerdo, clique em **Pages**.
3. Em **Build and deployment > Branch**, selecione a branch `main` (ou `master`) e a pasta `/(root)`.
4. Clique em **Save**.
5. Aguarde cerca de 1 a 2 minutos. Pronto! O GitHub vai gerar um link como:
   ```
   https://seunome.github.io/site-canal/
   ```
   Esse é o link que você pode colocar na descrição dos seus vídeos ou fixar nos comentários do YouTube!

---

## 📦 Como Adicionar Novos Downloads

Você **não precisa mexer no código HTML**. Toda a lista de downloads fica salva no arquivo [`downloads-data.js`](downloads-data.js).

Para adicionar um novo download:
1. Abra o arquivo [`downloads-data.js`](downloads-data.js) (você pode editar direto pelo GitHub pelo botão do lápis ✏️).
2. Copie o bloco de exemplo abaixo e cole no início da lista:

```javascript
{
  id: 7, // Um número que ainda não foi usado
  title: "Nome do Programa ou Tutorial",
  category: "otimizacoes", // Opções: otimizacoes, packs, programas
  description: "Breve descrição do arquivo para o seu público entender o que é.",
  thumbnail: "https://i.ytimg.com/vi/ID_DO_SEU_VIDEO/hqdefault.jpg", // Thumbnail do seu vídeo
  youtubeUrl: "https://www.youtube.com/watch?v=ID_DO_SEU_VIDEO",
  downloadUrl: "https://seu-link-de-download.com", // Link direto (Drive, MediaFire, Mega, etc.)
  mirrorUrl: "", // Link alternativo opcional (se não tiver, deixe vazio "")
  size: "150 MB", // Tamanho aproximado
  date: "14/10/2026", // Data da postagem
  password: "", // Se tiver senha coloque aqui (ex: "link"), se não tiver deixe ""
  featured: false // Coloque true se quiser que o card tenha destaque no topo
},
```

3. Salve o arquivo. O site é atualizado automaticamente!

---

## 🎨 Como Pegar a Thumbnail do seu Vídeo do YouTube Automaticamente

Para usar a própria thumbnail do seu vídeo do YouTube no card do download, basta usar esta URL substituindo o `ID_DO_VIDEO`:
```
https://i.ytimg.com/vi/ID_DO_VIDEO/hqdefault.jpg
```
*(O ID do vídeo são os códigos no final do link do YouTube, ex: `youtube.com/watch?v=dQw4w9WgXcQ` -> o ID é `dQw4w9WgXcQ`)*.

---

## ⚙️ Personalizar suas Redes Sociais

No arquivo [`index.html`](index.html), você pode colocar os links reais do seu canal:
- No topo (navbar): troque `https://www.youtube.com` pelo link do seu canal.
- No rodapé (footer): coloque seus links do YouTube, Discord, Instagram e Telegram.
