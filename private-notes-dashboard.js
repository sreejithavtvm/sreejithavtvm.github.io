(function () {
  const DAY_MS = 24 * 60 * 60 * 1000;

  function activatePrivateTabs(root) {
    const buttons = Array.from(root.querySelectorAll("[data-private-tab]"));
    const panes = Array.from(root.querySelectorAll("[data-private-pane]"));

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.dataset.privateTab;
        buttons.forEach((item) => item.setAttribute("aria-selected", String(item === button)));
        panes.forEach((pane) => {
          pane.hidden = pane.dataset.privatePane !== target;
        });
      });
    });
  }

  function formatDate(date, options) {
    return new Intl.DateTimeFormat("en-IN", options).format(date);
  }

  function isoDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function localDateFromIso(value) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  function startOfToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }

  function getWeekDates(baseDate) {
    const monday = new Date(baseDate);
    const day = monday.getDay() || 7;
    monday.setDate(monday.getDate() - day + 1);
    monday.setHours(0, 0, 0, 0);

    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);
      return date;
    });
  }

  function getWeekOffset(node) {
    const offsetNode = node.closest("[data-week-offset]");
    return offsetNode ? Number(offsetNode.dataset.weekOffset || 0) : 0;
  }

  function getOffsetWeekDates(baseDate, offset) {
    const offsetDate = new Date(baseDate);
    offsetDate.setDate(offsetDate.getDate() + offset * 7);
    return getWeekDates(offsetDate);
  }

  function hydratePrivateCalendar(root, baseDate = new Date()) {
    const today = new Date();
    const viewDate = new Date(baseDate);
    const todayIso = isoDate(today);

    root.querySelectorAll("[data-today-label]").forEach((node) => {
      node.textContent = formatDate(today, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    });

    root.querySelectorAll("[data-week-range]").forEach((node) => {
      const offset = getWeekOffset(node);
      const weekDates = getOffsetWeekDates(viewDate, offset);
      const start = formatDate(weekDates[0], { day: "numeric", month: "short" });
      const end = formatDate(weekDates[6], { day: "numeric", month: "short", year: "numeric" });
      node.textContent = start + " - " + end;
    });

    root.querySelectorAll("[data-week-day]").forEach((node) => {
      const offset = getWeekOffset(node);
      const weekDates = getOffsetWeekDates(viewDate, offset);
      const index = Number(node.dataset.weekDay);
      const date = weekDates[index];
      if (!date) {
        return;
      }
      const dayName = node.querySelector("[data-day-name]");
      const dayDate = node.querySelector("[data-day-date]");
      if (dayName) {
        dayName.textContent = formatDate(date, { weekday: "short" });
      }
      if (dayDate) {
        dayDate.textContent = formatDate(date, { day: "numeric", month: "short" });
      }
      node.classList.toggle("is-today", isoDate(date) === todayIso);
    });

    root.querySelectorAll("[data-event-date], [data-start-date]").forEach((event) => {
      event.hidden = false;
    });

    root.querySelectorAll("[data-event-date]").forEach((event) => {
      const date = event.dataset.eventDate;
      const dayNode = event.closest("[data-week-day]");
      if (dayNode) {
        const offset = getWeekOffset(dayNode);
        const weekDates = getOffsetWeekDates(viewDate, offset);
        const visibleDate = weekDates[Number(dayNode.dataset.weekDay)];
        event.hidden = !visibleDate || date !== isoDate(visibleDate);
        return;
      }
      event.hidden = date !== todayIso;
    });

    root.querySelectorAll("[data-start-date]").forEach((event) => {
      const dayNode = event.closest("[data-week-day]");
      const offset = dayNode ? getWeekOffset(dayNode) : 0;
      const weekDates = getOffsetWeekDates(viewDate, offset);
      const index = dayNode ? Number(dayNode.dataset.weekDay) : NaN;
      const visibleDate = weekDates[index];
      if (visibleDate) {
        event.hidden = event.hidden || isoDate(visibleDate) < event.dataset.startDate;
      }
    });

    root.querySelectorAll(".agenda-list").forEach((list) => {
      const visibleItems = Array.from(list.querySelectorAll(".agenda-item")).some((item) => !item.hidden);
      let empty = list.querySelector(".agenda-empty");
      if (!empty) {
        empty = document.createElement("p");
        empty.className = "agenda-empty";
        empty.textContent = "No events for today.";
        list.append(empty);
      }
      empty.hidden = visibleItems;
    });
  }

  function activatePrivateCalendar(root) {
    let currentViewDate = new Date();

    function updateCalendar() {
      hydratePrivateCalendar(root, currentViewDate);
    }

    root.querySelectorAll("[data-calendar-shift]").forEach((button) => {
      button.addEventListener("click", () => {
        currentViewDate.setDate(currentViewDate.getDate() + Number(button.dataset.calendarShift));
        updateCalendar();
      });
    });

    root.querySelectorAll("[data-calendar-today]").forEach((button) => {
      button.addEventListener("click", () => {
        currentViewDate = new Date();
        updateCalendar();
      });
    });

    updateCalendar();
  }

  function colorConferenceDeadlines(root) {
    const today = startOfToday();

    root.querySelectorAll("[data-full-paper-date]").forEach((cell) => {
      const deadline = localDateFromIso(cell.dataset.fullPaperDate);
      const days = Math.floor((deadline - today) / DAY_MS);
      cell.classList.remove("deadline-past", "deadline-soon", "deadline-upcoming");

      if (days < 0) {
        cell.classList.add("deadline-past");
      } else if (days <= 30) {
        cell.classList.add("deadline-soon");
      } else if (days <= 60) {
        cell.classList.add("deadline-upcoming");
      }
    });
  }

  function activateAll(root) {
    activatePrivateTabs(root);
    activatePrivateCalendar(root);
    colorConferenceDeadlines(root);
  }

  function autoActivate() {
    if (document.querySelector("[data-private-tab]")) {
      activateAll(document);
    }
  }

  window.PrivateNotesDashboard = { activateAll, colorConferenceDeadlines };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", autoActivate, { once: true });
  } else {
    autoActivate();
  }
})();
