/* ROOH — cart: localStorage-backed, shared across every page */

const CART_KEY = "rooh_cart";

function readCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function writeCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  updateCartBadge();
  renderCartDrawer();
}

function addToCart(productId, size, color, qty = 1) {
  const items = readCart();
  const existing = items.find((i) => i.id === productId && i.size === size && i.color === color);
  if (existing) {
    existing.qty += qty;
  } else {
    items.push({ id: productId, size, color, qty });
  }
  writeCart(items);
  openCartDrawer();
}

function updateCartQty(index, qty) {
  const items = readCart();
  if (qty <= 0) {
    items.splice(index, 1);
  } else {
    items[index].qty = qty;
  }
  writeCart(items);
}

function removeFromCart(index) {
  const items = readCart();
  items.splice(index, 1);
  writeCart(items);
}

function cartCount() {
  return readCart().reduce((sum, i) => sum + i.qty, 0);
}

function cartSubtotal() {
  return readCart().reduce((sum, i) => {
    const product = typeof getProductById === "function" ? getProductById(i.id) : null;
    return sum + (product ? product.price * i.qty : 0);
  }, 0);
}

function updateCartBadge() {
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    const count = cartCount();
    el.textContent = count;
    el.classList.toggle("is-visible", count > 0);
  });
}

function openCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("drawer-overlay");
  if (drawer) drawer.classList.add("is-open");
  if (overlay) overlay.classList.add("is-open");
  document.body.classList.add("no-scroll");
}

function closeCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("drawer-overlay");
  if (drawer) drawer.classList.remove("is-open");
  if (overlay && !document.getElementById("filter-drawer")?.classList.contains("is-open")) {
    overlay.classList.remove("is-open");
  }
  if (!document.querySelector(".drawer.is-open")) document.body.classList.remove("no-scroll");
}

function renderCartDrawer() {
  const body = document.getElementById("cart-drawer-body");
  const footer = document.getElementById("cart-drawer-footer");
  if (!body) return;

  const items = readCart();
  if (!items.length) {
    body.innerHTML = `<p class="cart-empty">Your cart is empty.</p>`;
    if (footer) footer.style.display = "none";
    return;
  }

  if (footer) footer.style.display = "";

  body.innerHTML = items
    .map((item, index) => {
      const product = getProductById(item.id);
      if (!product) return "";
      return `
        <div class="cart-line">
          <img src="${product.images[0]}" alt="${product.name}" class="cart-line__img" />
          <div class="cart-line__info">
            <p class="cart-line__name">${product.name}</p>
            <p class="cart-line__meta">${item.color} · ${item.size}</p>
            <div class="cart-line__qty">
              <button type="button" data-qty-decrease="${index}" aria-label="Decrease quantity">−</button>
              <span>${item.qty}</span>
              <button type="button" data-qty-increase="${index}" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <div class="cart-line__price">
            <span>${formatPrice(product.price * item.qty)}</span>
            <button type="button" class="cart-line__remove" data-remove="${index}" aria-label="Remove item">Remove</button>
          </div>
        </div>`;
    })
    .join("");

  const subtotalEls = document.querySelectorAll("[data-cart-subtotal]");
  subtotalEls.forEach((el) => (el.textContent = formatPrice(cartSubtotal())));

  body.querySelectorAll("[data-qty-increase]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const i = Number(btn.dataset.qtyIncrease);
      updateCartQty(i, items[i].qty + 1);
    })
  );
  body.querySelectorAll("[data-qty-decrease]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const i = Number(btn.dataset.qtyDecrease);
      updateCartQty(i, items[i].qty - 1);
    })
  );
  body.querySelectorAll("[data-remove]").forEach((btn) =>
    btn.addEventListener("click", () => removeFromCart(Number(btn.dataset.remove)))
  );
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  renderCartDrawer();

  document.querySelectorAll("[data-open-cart]").forEach((btn) => btn.addEventListener("click", openCartDrawer));
  document.querySelectorAll("[data-close-cart]").forEach((btn) => btn.addEventListener("click", closeCartDrawer));
  document.getElementById("drawer-overlay")?.addEventListener("click", () => {
    closeCartDrawer();
    document.getElementById("filter-drawer")?.classList.remove("is-open");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCartDrawer();
      document.getElementById("filter-drawer")?.classList.remove("is-open");
    }
  });
});
