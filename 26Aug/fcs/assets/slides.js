(function () {
  const deck = document.querySelector(".deck");
  const slides = Array.from(document.querySelectorAll(".slide"))
    .map((slide, originalIndex) => ({
      slide,
      order: Number(slide.dataset.slideOrder) || originalIndex + 1
    }))
    .sort((a, b) => a.order - b.order)
    .map(({ slide }) => slide);
  if (deck && slides.some((slide) => slide.dataset.slideOrder)) {
    slides.forEach((slide) => deck.appendChild(slide));
  }
  const current = document.querySelector("[data-current-slide]");
  const total = document.querySelector("[data-total-slides]");
  let index = 0;

  function show(next) {
    if (!slides.length) return;
    const nextIndex = Math.max(0, Math.min(slides.length - 1, next));
    if (nextIndex !== index) resetAnswers(slides[index]);
    index = nextIndex;
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

  const revealButtons = Array.from(document.querySelectorAll("[data-reveal]"));
  const groupRevealButtons = Array.from(document.querySelectorAll("[data-reveal-group]"));
  const revealAllButtons = Array.from(document.querySelectorAll("[data-reveal-all]"));
  const allRevealButtons = [...revealButtons, ...groupRevealButtons, ...revealAllButtons];

  allRevealButtons.forEach((button) => {
    button.dataset.showLabel = button.textContent.trim();
    button.dataset.hideLabel = button.dataset.hideLabel
      || button.dataset.showLabel.replace(/^(Reveal|Show)/, "Hide");
    button.setAttribute("aria-expanded", "false");
  });

  revealButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.getElementById(button.dataset.reveal);
      if (!target) return;
      const visible = target.classList.toggle("visible");
      button.textContent = visible ? button.dataset.hideLabel : button.dataset.showLabel;
      button.setAttribute("aria-expanded", String(visible));
    });
  });

  groupRevealButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targets = Array.from(document.querySelectorAll("[data-answer-group]"))
        .filter((target) => target.dataset.answerGroup === button.dataset.revealGroup);
      if (!targets.length) return;
      const visible = targets.some((target) => !target.classList.contains("visible"));
      targets.forEach((target) => target.classList.toggle("visible", visible));
      button.textContent = visible ? button.dataset.hideLabel : button.dataset.showLabel;
      button.setAttribute("aria-expanded", String(visible));
    });
  });

  revealAllButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targets = Array.from(document.querySelectorAll(button.dataset.revealAll));
      if (!targets.length) return;
      const visible = targets.some((target) => !target.classList.contains("visible"));
      targets.forEach((target) => target.classList.toggle("visible", visible));
      button.textContent = visible ? button.dataset.hideLabel : button.dataset.showLabel;
      button.setAttribute("aria-expanded", String(visible));
      groupRevealButtons.forEach((groupButton) => {
        if (!button.closest(".slide")?.contains(groupButton)) return;
        groupButton.textContent = visible ? groupButton.dataset.hideLabel : groupButton.dataset.showLabel;
        groupButton.setAttribute("aria-expanded", String(visible));
      });
    });
  });

  function resetAnswers(scope = document) {
    scope.querySelectorAll(".answer.visible").forEach((answer) => {
      answer.classList.remove("visible");
    });
    allRevealButtons.filter((button) => scope.contains(button)).forEach((button) => {
      button.textContent = button.dataset.showLabel || button.textContent;
      button.setAttribute("aria-expanded", "false");
    });
    scope.querySelectorAll("input, textarea").forEach((input) => {
      input.value = "";
      input.style.removeProperty("border-color");
    });
    scope.querySelectorAll(".feedback").forEach((feedback) => {
      feedback.textContent = "";
      feedback.className = "feedback";
    });
  }

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
      const feedback = document.getElementById(button.dataset.feedback);
      if (!target || !feedback) return;
      const expected = (button.dataset.answers || button.dataset.answer || "")
        .split("|")
        .map(normalizeAnswer);
      const actual = normalizeAnswer(target.value);
      const ok = expected.includes(actual);
      feedback.textContent = ok
        ? button.dataset.success || "Correct."
        : button.dataset.error || "Try again. Use the rule on the slide.";
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
      feedback.textContent = wrong.length === 0
        ? button.dataset.success || "All rows match."
        : button.dataset.error || `${wrong.length} cell(s) need another look.`;
      feedback.className = `feedback ${wrong.length === 0 ? "good" : "bad"}`;
    });
  });

  function normalizeAnswer(value) {
    return value
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/ⁿ/g, "^n")
      .replace(/\*\*/g, "^");
  }

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
  window.addEventListener("pageshow", () => resetAnswers());
  window.addEventListener("pagehide", () => resetAnswers(slides[index]));
  fromHash();
  show(index);
})();
