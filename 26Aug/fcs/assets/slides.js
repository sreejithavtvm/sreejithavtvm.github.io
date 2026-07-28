(function () {
  const slides = Array.from(document.querySelectorAll(".slide"));
  const current = document.querySelector("[data-current-slide]");
  const total = document.querySelector("[data-total-slides]");
  let index = 0;

  function show(next) {
    if (!slides.length) return;
    index = Math.max(0, Math.min(slides.length - 1, next));
    slides.forEach((slide, i) => slide.classList.toggle("current", i === index));
    if (current) current.textContent = String(index + 1);
    if (total) total.textContent = String(slides.length);
    history.replaceState(null, "", `#${index + 1}`);
  }

  function fromHash() {
    const raw = Number(location.hash.replace("#", ""));
    if (Number.isFinite(raw) && raw > 0) show(raw - 1);
  }

  document.addEventListener("keydown", (event) => {
    if (event.target.matches("input, textarea")) return;
    if (["ArrowRight", "PageDown", " "].includes(event.key)) {
      event.preventDefault();
      show(index + 1);
    }
    if (["ArrowLeft", "PageUp"].includes(event.key)) {
      event.preventDefault();
      show(index - 1);
    }
    if (event.key === "Home") show(0);
    if (event.key === "End") show(slides.length - 1);
  });

  document.querySelectorAll("[data-next]").forEach((button) => {
    button.addEventListener("click", () => show(index + 1));
  });

  document.querySelectorAll("[data-prev]").forEach((button) => {
    button.addEventListener("click", () => show(index - 1));
  });

  document.querySelectorAll("[data-reveal]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.getElementById(button.dataset.reveal);
      if (target) target.classList.toggle("visible");
    });
  });

  document.querySelectorAll("[data-poll]").forEach((form) => {
    const list = document.getElementById(form.dataset.poll);
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const idea = form.elements.idea.value.trim();
      const votes = form.elements.votes.value.trim() || "1";
      if (!idea || !list) return;
      const item = document.createElement("li");
      item.innerHTML = `<span>${escapeHtml(idea)}</span><strong>${escapeHtml(votes)}</strong>`;
      list.appendChild(item);
      form.reset();
      form.elements.idea.focus();
    });
  });

  document.querySelectorAll("[data-check]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.getElementById(button.dataset.check);
      const expected = (button.dataset.answer || "").trim().toLowerCase();
      const feedback = document.getElementById(button.dataset.feedback);
      if (!target || !feedback) return;
      const actual = target.value.trim().toLowerCase().replace(/\s+/g, "");
      const ok = actual === expected;
      feedback.textContent = ok ? "Correct." : "Try again. Use the rule on the slide.";
      feedback.className = `feedback ${ok ? "good" : "bad"}`;
    });
  });

  document.querySelectorAll("[data-check-table]").forEach((button) => {
    button.addEventListener("click", () => {
      const scope = document.getElementById(button.dataset.checkTable);
      const feedback = document.getElementById(button.dataset.feedback);
      if (!scope || !feedback) return;
      const inputs = Array.from(scope.querySelectorAll("input[data-answer]"));
      const wrong = inputs.filter((input) => input.value.trim() !== input.dataset.answer);
      inputs.forEach((input) => {
        input.style.borderColor = input.value.trim() === input.dataset.answer ? "#15803d" : "#b91c1c";
      });
      feedback.textContent = wrong.length === 0 ? "All rows match." : `${wrong.length} cell(s) need another look.`;
      feedback.className = `feedback ${wrong.length === 0 ? "good" : "bad"}`;
    });
  });

  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[char]);
  }

  window.addEventListener("hashchange", fromHash);
  fromHash();
  show(index);
})();
