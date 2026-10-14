/**
 * ===================================================================
 *  CANAL LYNX - LÓGICA E INTERATIVIDADE (APP.JS)
 * ===================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // Elementos do DOM
  const searchInput = document.getElementById("searchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");
  const categoriesContainer = document.getElementById("categoriesContainer");
  const downloadsGrid = document.getElementById("downloadsGrid");
  const resultsCount = document.getElementById("resultsCount");
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toastMessage");

  // Estado da aplicação
  let currentCategory = "todos";
  let searchQuery = "";

  // Dicionário de nomes e ícones de categorias
  const CATEGORIES = {
    todos: { label: "Todos", icon: "fa-solid fa-shapes" },
    otimizacoes: { label: "Otimizações", icon: "fa-solid fa-gauge-high" },
    packs: { label: "Packs", icon: "fa-solid fa-folder-open" },
    programas: { label: "Programas", icon: "fa-solid fa-laptop-code" }
  };

  /**
   * Inicializa os botões de categorias com as contagens dinâmicas
   */
  function renderCategories() {
    categoriesContainer.innerHTML = "";

    // Contagem por categoria
    const counts = { todos: DOWNLOADS_DATA.length };
    DOWNLOADS_DATA.forEach(item => {
      const cat = item.category || "outros";
      counts[cat] = (counts[cat] || 0) + 1;
    });

    Object.keys(CATEGORIES).forEach(catKey => {
      const count = counts[catKey] || 0;
      const catInfo = CATEGORIES[catKey];

      const btn = document.createElement("button");
      btn.className = `cat-btn ${currentCategory === catKey ? "active" : ""}`;
      btn.innerHTML = `
        <i class="${catInfo.icon}"></i>
        <span>${catInfo.label}</span>
        <span class="badge-count">${count}</span>
      `;

      btn.addEventListener("click", () => {
        currentCategory = catKey;
        // Atualiza estilo ativo
        document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderDownloads();
      });

      categoriesContainer.appendChild(btn);
    });
  }

  /**
   * Filtra e renderiza os cards de download
   */
  function renderDownloads() {
    const term = searchQuery.toLowerCase().trim();

    const filtered = DOWNLOADS_DATA.filter(item => {
      const matchesCategory = currentCategory === "todos" || item.category === currentCategory;
      const matchesSearch = 
        item.title.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        (item.size && item.size.toLowerCase().includes(term));

      return matchesCategory && matchesSearch;
    });

    // Atualiza contador de resultados
    resultsCount.textContent = `${filtered.length} ${filtered.length === 1 ? "arquivo encontrado" : "arquivos encontrados"}`;

    if (filtered.length === 0) {
      downloadsGrid.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          <h3>Nenhum download encontrado</h3>
          <p>Não encontramos nada com o termo "<strong>${escapeHtml(searchQuery)}</strong>" nessa categoria.</p>
          <button class="cat-btn active" id="resetFiltersBtn">
            <i class="fa-solid fa-rotate-left"></i> Limpar pesquisa
          </button>
        </div>
      `;

      const resetBtn = document.getElementById("resetFiltersBtn");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          searchInput.value = "";
          searchQuery = "";
          clearSearchBtn.style.display = "none";
          currentCategory = "todos";
          renderCategories();
          renderDownloads();
        });
      }
      return;
    }

    // Ordena: itens com featured = true primeiro
    const sorted = [...filtered].sort((a, b) => {
      if (a.featured === b.featured) return 0;
      return a.featured ? -1 : 1;
    });

    downloadsGrid.innerHTML = sorted.map(item => createCardHTML(item)).join("");

    // Adiciona evento de copiar senha aos botões
    attachPasswordCopyEvents();
  }

  /**
   * Gera o HTML de cada card
   */
  function createCardHTML(item) {
    const categoryInfo = CATEGORIES[item.category] || { label: item.category, icon: "fa-solid fa-tag" };
    
    // Bloco de senha
    let passwordHTML = "";
    if (item.password && item.password.trim() !== "") {
      passwordHTML = `
        <div class="password-box">
          <span class="pw-label"><i class="fa-solid fa-key"></i> Senha:</span>
          <span class="pw-value">${escapeHtml(item.password)}</span>
          <button class="btn-copy-pw" data-pw="${escapeHtml(item.password)}" title="Copiar senha">
            <i class="fa-regular fa-copy"></i> Copiar
          </button>
        </div>
      `;
    }

    // Botão de Mirror (espelho) caso exista
    const mirrorBtnHTML = item.mirrorUrl ? `
      <a href="${item.mirrorUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-sub" title="Link Alternativo / Espelho">
        <i class="fa-solid fa-cloud-arrow-down"></i> Espelho
      </a>
    ` : "";

    // Botão do YouTube
    const ytBtnHTML = item.youtubeUrl ? `
      <a href="${item.youtubeUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-sub yt-sub" title="Ver tutorial no YouTube">
        <i class="fa-brands fa-youtube"></i> Tutorial
      </a>
    ` : "";

    return `
      <article class="download-card" data-id="${item.id}">
        <div class="card-thumb-wrapper">
          <img src="${escapeHtml(item.thumbnail)}" alt="${escapeHtml(item.title)}" class="card-thumb" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=700&auto=format&fit=crop&q=80'">
          <span class="card-category-badge">
            <i class="${categoryInfo.icon}"></i> ${categoryInfo.label}
          </span>
          ${item.featured ? '<span class="card-featured-badge"><i class="fa-solid fa-fire"></i> Destaque</span>' : ""}
        </div>

        <div class="card-content">
          <h3 class="card-title" title="${escapeHtml(item.title)}">${escapeHtml(item.title)}</h3>
          <p class="card-desc">${escapeHtml(item.description)}</p>

          <div class="card-meta">
            <span class="card-meta-item" title="Tamanho do arquivo">
              <i class="fa-solid fa-hard-drive"></i> ${escapeHtml(item.size || "Leve")}
            </span>
            <span class="card-meta-item" title="Data de postagem">
              <i class="fa-regular fa-calendar"></i> ${escapeHtml(item.date || "--/--/----")}
            </span>
          </div>

          ${passwordHTML}

          <div class="card-actions">
            <a href="${escapeHtml(item.downloadUrl)}" target="_blank" rel="noopener noreferrer" class="btn-download-primary">
              <i class="fa-solid fa-download"></i> Baixar Arquivo
            </a>

            ${(ytBtnHTML || mirrorBtnHTML) ? `
              <div class="card-actions-sub">
                ${ytBtnHTML}
                ${mirrorBtnHTML}
              </div>
            ` : ""}
          </div>
        </div>
      </article>
    `;
  }

  /**
   * Eventos de copiar senha
   */
  function attachPasswordCopyEvents() {
    const copyBtns = document.querySelectorAll(".btn-copy-pw");
    copyBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const pw = btn.getAttribute("data-pw");
        if (pw) {
          navigator.clipboard.writeText(pw).then(() => {
            showToast(`Senha "${pw}" copiada com sucesso!`);
            const originalIcon = btn.innerHTML;
            btn.innerHTML = `<i class="fa-solid fa-check"></i> Copiado!`;
            setTimeout(() => {
              btn.innerHTML = originalIcon;
            }, 2000);
          }).catch(() => {
            // Fallback se navigator.clipboard falhar
            prompt("Copie a senha manualmente:", pw);
          });
        }
      });
    });
  }

  /**
   * Notificação Toast
   */
  let toastTimeout;
  function showToast(message) {
    if (!toast) return;
    toastMessage.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  /**
   * Eventos da barra de busca
   */
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    clearSearchBtn.style.display = searchQuery.length > 0 ? "block" : "none";
    renderDownloads();
  });

  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchQuery = "";
    clearSearchBtn.style.display = "none";
    searchInput.focus();
    renderDownloads();
  });

  // Atalho de teclado: apertar Ctrl+K ou "/" foca na pesquisa
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey && e.key === "k") || (e.key === "/" && document.activeElement !== searchInput)) {
      e.preventDefault();
      searchInput.focus();
    }
  });

  /**
   * Função auxiliar para evitar XSS
   */
  function escapeHtml(string) {
    if (!string) return "";
    return String(string)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Inicialização
  renderCategories();
  renderDownloads();
});
