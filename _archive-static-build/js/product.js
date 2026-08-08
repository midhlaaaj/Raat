/* ROOH — product detail page rendering + add-to-cart */

(function () {
  const params = new URLSearchParams(window.location.search);
  const product = getProductById(params.get("id")) || PRODUCTS[0];
  let selectedSize = product.sizes[0];
  let selectedColor = product.colors[0];
  let qty = 1;

  document.getElementById("page-title").textContent = `${product.name} — ROOH`;
  document.getElementById("breadcrumb").innerHTML =
    `<a href="index.html">Home</a> / <a href="shop.html?category=${encodeURIComponent(product.category)}">${product.category}</a> / ${product.name}`;

  function trustIcon(path) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">${path}</svg>`;
  }

  document.getElementById("pdp-root").innerHTML = `
    <div class="pdp__gallery">
      ${product.images.map((src) => `<img src="${src}" alt="${product.name}" />`).join("")}
    </div>
    <div class="pdp__info">
      <h1>${product.name}</h1>
      <p class="pdp__price">${formatPrice(product.price)}</p>
      <p class="pdp__desc">${product.description}</p>

      <div class="option-group">
        <h4>Colour — <span id="selected-color">${selectedColor}</span></h4>
        <div class="swatches" id="color-swatches">
          ${product.colors.map((c, i) => `<button type="button" class="swatch ${i === 0 ? "is-active" : ""}" data-color="${c}">${c}</button>`).join("")}
        </div>
      </div>

      <div class="option-group">
        <h4>Size — <span id="selected-size">${selectedSize}</span></h4>
        <div class="swatches" id="size-swatches">
          ${product.sizes.map((s, i) => `<button type="button" class="swatch ${i === 0 ? "is-active" : ""}" data-size="${s}">${s}</button>`).join("")}
        </div>
      </div>

      <div class="pdp__actions">
        <div class="qty-stepper">
          <button type="button" id="qty-minus" aria-label="Decrease quantity">−</button>
          <span id="qty-value">1</span>
          <button type="button" id="qty-plus" aria-label="Increase quantity">+</button>
        </div>
        <button type="button" class="btn" id="add-to-cart-btn" style="flex:1;">Add to Cart</button>
      </div>

      <ul class="trust-list">
        <li>${trustIcon('<path d="M3 12h18M3 6h18M3 18h18"/>')} Free shipping across India on all orders</li>
        <li>${trustIcon('<path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-6"/>')} 7-day easy returns on unworn pieces</li>
        <li>${trustIcon('<circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/>')} Hand-finished, made in small batches</li>
      </ul>
    </div>
  `;

  document.getElementById("color-swatches").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-color]");
    if (!btn) return;
    selectedColor = btn.dataset.color;
    document.getElementById("selected-color").textContent = selectedColor;
    btn.parentElement.querySelectorAll(".swatch").forEach((s) => s.classList.remove("is-active"));
    btn.classList.add("is-active");
  });

  document.getElementById("size-swatches").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-size]");
    if (!btn) return;
    selectedSize = btn.dataset.size;
    document.getElementById("selected-size").textContent = selectedSize;
    btn.parentElement.querySelectorAll(".swatch").forEach((s) => s.classList.remove("is-active"));
    btn.classList.add("is-active");
  });

  document.getElementById("qty-minus").addEventListener("click", () => {
    qty = Math.max(1, qty - 1);
    document.getElementById("qty-value").textContent = qty;
  });
  document.getElementById("qty-plus").addEventListener("click", () => {
    qty += 1;
    document.getElementById("qty-value").textContent = qty;
  });

  function doAddToCart() {
    addToCart(product.id, selectedSize, selectedColor, qty);
  }
  document.getElementById("add-to-cart-btn").addEventListener("click", doAddToCart);
  document.getElementById("sticky-add-btn").addEventListener("click", doAddToCart);

  document.getElementById("sticky-img").src = product.images[0];
  document.getElementById("sticky-img").alt = product.name;
  document.getElementById("sticky-name").textContent = product.name;
  document.getElementById("sticky-price").textContent = formatPrice(product.price);

  const stickyAdd = document.getElementById("sticky-add");
  const infoPanel = document.querySelector(".pdp__actions");
  if ("IntersectionObserver" in window && infoPanel) {
    const observer = new IntersectionObserver(
      ([entry]) => stickyAdd.classList.toggle("is-visible", !entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    observer.observe(infoPanel);
  }

  const related = getRelatedProducts(product, 4);
  document.getElementById("related-grid").innerHTML = related
    .map(
      (p) => `
      <a href="product.html?id=${p.id}" class="product-card">
        <div class="product-card__media">
          <img src="${p.images[0]}" alt="${p.name}" loading="lazy" />
          <span class="product-card__quick">View Product</span>
        </div>
        <p class="product-card__name">${p.name}</p>
        <div class="product-card__meta">
          <span class="product-card__category">${p.category}</span>
          <span class="product-card__price">${formatPrice(p.price)}</span>
        </div>
      </a>`
    )
    .join("");
})();
