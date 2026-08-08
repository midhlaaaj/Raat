/* ROOH — shop grid + slide-over filter drawer */

(function () {
  const params = new URLSearchParams(window.location.search);
  const state = {
    categories: params.get("category") ? [params.get("category")] : [],
    collections: params.get("collection") ? [params.get("collection")] : [],
    price: "all",
    sort: "featured",
  };

  const allCategories = [...new Set(PRODUCTS.map((p) => p.category))];

  function renderFilterOptions() {
    document.getElementById("filter-category").innerHTML = allCategories
      .map(
        (cat) => `
        <label class="filter-option">
          <input type="checkbox" value="${cat}" data-filter="category" ${state.categories.includes(cat) ? "checked" : ""} />
          ${cat}
        </label>`
      )
      .join("");

    document.getElementById("filter-collection").innerHTML = COLLECTIONS.map(
      (c) => `
        <label class="filter-option">
          <input type="checkbox" value="${c.slug}" data-filter="collection" ${state.collections.includes(c.slug) ? "checked" : ""} />
          ${c.name}
        </label>`
    ).join("");

    document.querySelectorAll('input[name="price"]').forEach((el) => {
      el.checked = el.value === state.price;
    });
  }

  function readDrawerState() {
    state.categories = [...document.querySelectorAll('[data-filter="category"]:checked')].map((el) => el.value);
    state.collections = [...document.querySelectorAll('[data-filter="collection"]:checked')].map((el) => el.value);
    state.price = document.querySelector('input[name="price"]:checked')?.value || "all";
  }

  function filteredProducts() {
    let items = PRODUCTS.slice();

    if (state.categories.length) items = items.filter((p) => state.categories.includes(p.category));
    if (state.collections.length) items = items.filter((p) => state.collections.includes(p.collection));
    if (state.price !== "all") {
      const [min, max] = state.price.split("-").map(Number);
      items = items.filter((p) => p.price >= min && p.price <= max);
    }

    switch (state.sort) {
      case "price-asc": items.sort((a, b) => a.price - b.price); break;
      case "price-desc": items.sort((a, b) => b.price - a.price); break;
      case "name-asc": items.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: break;
    }
    return items;
  }

  function renderCard(p) {
    return `
      <a href="product.html?id=${p.id}" class="product-card">
        <div class="product-card__media">
          ${p.tag ? `<span class="product-card__tag">${p.tag === "new" ? "New" : "Trending"}</span>` : ""}
          <img src="${p.images[0]}" alt="${p.name}" loading="lazy" />
          <span class="product-card__quick">View Product</span>
        </div>
        <p class="product-card__name">${p.name}</p>
        <div class="product-card__meta">
          <span class="product-card__category">${p.category}</span>
          <span class="product-card__price">${formatPrice(p.price)}</span>
        </div>
      </a>`;
  }

  function renderActiveChips() {
    const chips = [];
    state.categories.forEach((c) => chips.push({ label: c, type: "category", value: c }));
    state.collections.forEach((c) => {
      const name = COLLECTIONS.find((col) => col.slug === c)?.name || c;
      chips.push({ label: name, type: "collection", value: c });
    });
    if (state.price !== "all") chips.push({ label: "Price", type: "price", value: "all" });

    const el = document.getElementById("active-filters");
    if (!chips.length) { el.innerHTML = ""; return; }
    el.innerHTML = chips
      .map(
        (chip) => `
        <span class="active-filter-chip">
          ${chip.label}
          <button type="button" data-remove-chip data-type="${chip.type}" data-value="${chip.value}">×</button>
        </span>`
      )
      .join("");

    el.querySelectorAll("[data-remove-chip]").forEach((btn) =>
      btn.addEventListener("click", () => {
        const { type, value } = btn.dataset;
        if (type === "category") state.categories = state.categories.filter((c) => c !== value);
        if (type === "collection") state.collections = state.collections.filter((c) => c !== value);
        if (type === "price") state.price = "all";
        renderFilterOptions();
        render();
      })
    );
  }

  function render() {
    const items = filteredProducts();
    const grid = document.getElementById("shop-grid");
    const empty = document.getElementById("empty-state");
    grid.innerHTML = items.map(renderCard).join("");
    empty.hidden = items.length > 0;
    document.getElementById("result-count").textContent = `${items.length} product${items.length === 1 ? "" : "s"}`;
    renderActiveChips();
  }

  function updateHeading() {
    const title = document.getElementById("shop-title");
    const subtitle = document.getElementById("shop-subtitle");
    if (state.collections.length === 1 && !state.categories.length) {
      const c = COLLECTIONS.find((col) => col.slug === state.collections[0]);
      if (c) { title.textContent = c.name; subtitle.textContent = c.blurb; return; }
    }
    if (state.categories.length === 1 && !state.collections.length) {
      title.textContent = state.categories[0];
      subtitle.textContent = `Shop the full ${state.categories[0]} edit.`;
      return;
    }
    title.textContent = "All Products";
    subtitle.textContent = "Considered silhouettes in handloom and hand-block cotton.";
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderFilterOptions();
    updateHeading();
    render();

    document.getElementById("open-filter").addEventListener("click", () => {
      document.getElementById("filter-drawer").classList.add("is-open");
      document.getElementById("drawer-overlay").classList.add("is-open");
      document.body.classList.add("no-scroll");
    });
    const closeFilterDrawer = () => {
      document.getElementById("filter-drawer").classList.remove("is-open");
      if (!document.getElementById("cart-drawer").classList.contains("is-open")) {
        document.getElementById("drawer-overlay").classList.remove("is-open");
        document.body.classList.remove("no-scroll");
      }
    };
    document.getElementById("close-filter").addEventListener("click", closeFilterDrawer);

    document.getElementById("apply-filters").addEventListener("click", () => {
      readDrawerState();
      updateHeading();
      render();
      closeFilterDrawer();
    });
    document.getElementById("clear-filters").addEventListener("click", () => {
      state.categories = [];
      state.collections = [];
      state.price = "all";
      renderFilterOptions();
      updateHeading();
      render();
    });

    document.getElementById("sort-select").addEventListener("change", (e) => {
      state.sort = e.target.value;
      render();
    });
  });
})();
