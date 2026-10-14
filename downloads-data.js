/**
 * ===================================================================
 *  BASE DE DADOS DE DOWNLOADS - CANAL LYNX
 * ===================================================================
 *  Para adicionar um novo download, basta copiar o bloco abaixo,
 *  colar no início do array DOWNLOADS_DATA e preencher com os dados do seu vídeo!
 * 
 *  Campos:
 *  - id: Número único (1, 2, 3...)
 *  - title: Nome do arquivo ou tutorial
 *  - category: "otimizacoes", "packs", "programas"
 *  - description: Breve resumo do que é o arquivo
 *  - thumbnail: Nome da imagem (ex: "thumb-roblox.jpg") ou link da thumbnail do YouTube
 *  - youtubeUrl: Link do seu vídeo no YouTube
 *  - downloadUrl: Link principal para baixar (Google Drive, MediaFire, Mega, etc.)
 *  - mirrorUrl: Link alternativo caso o principal caia (opcional)
 *  - size: Tamanho ou formato do arquivo (ex: "Fast By Lynx.rar" ou "150 MB")
 *  - date: Data em que foi postado
 *  - password: Senha de descompactação se houver (se não tiver, deixe "")
 *  - featured: true se você quiser destaque no topo, ou false
 * ===================================================================
 */

const DOWNLOADS_DATA = [
  {
    id: 1,
    title: "Roblox em PC Fraco Sem Travar (+999 FPS) - Fast By Lynx",
    category: "otimizacoes",
    description: "Pack completo de otimização para jogar Roblox liso sem lag e com máximo de FPS mesmo em computadores fracos. Arquivo: Fast By Lynx.rar",
    thumbnail: "thumb-roblox.jpg",
    youtubeUrl: "https://www.youtube.com",
    downloadUrl: "https://drive.google.com/file/d/1tGaqd13sg4LHEsCRrkBtJBtmpxg6aT6J/view?usp=drive_link",
    mirrorUrl: "https://www.mediafire.com/file/u3yyyv1ac5296uq/Fast+By+Lynx.rar/file",
    size: "87.63 KB",
    date: "14/10/2026",
    password: "",
    featured: true
  }
];
