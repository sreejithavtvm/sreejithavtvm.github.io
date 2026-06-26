const filterButtons = document.querySelectorAll(".filter-button");
const publications = Array.from(document.querySelectorAll(".publication"));
const publicationToggle = document.querySelector("#toggle-publications");
const courseItems = Array.from(document.querySelectorAll("#teaching-goa + .course-list .course-item"));
const courseToggle = document.querySelector("#toggle-courses");
const initialPublicationCount = 3;
const initialCourseCount = 7;
let activeFilter = "all";
let publicationsExpanded = false;
let coursesExpanded = false;

function compactPublicationLayout() {
  publications.forEach((paper) => {
    const title = paper.querySelector("h3");
    const authors = paper.querySelector(".authors");
    const links = paper.querySelector(".paper-links");
    const abstract = paper.querySelector(".abstract");

    if (title && authors && !title.parentElement.classList.contains("publication-heading-line")) {
      const line = document.createElement("div");
      line.className = "publication-heading-line";
      paper.insertBefore(line, title);
      line.append(title, document.createTextNode(" "), authors);
    }

    if ((links || abstract) && !paper.querySelector(".publication-actions")) {
      const actions = document.createElement("div");
      actions.className = "publication-actions";
      const anchor = abstract || links;
      paper.insertBefore(actions, anchor);
      if (links) {
        actions.append(links);
      }
      if (abstract) {
        actions.append(abstract);
      }
    }
  });
}

compactPublicationLayout();

function updatePublications() {
  publications.forEach((paper, index) => {
    const tags = (paper.dataset.area || "").split(/\s+/);
    const matchesFilter = activeFilter === "all" || tags.includes(activeFilter);
    const withinInitialSet = publicationsExpanded || activeFilter !== "all" || index < initialPublicationCount;
    paper.classList.toggle("hidden", !(matchesFilter && withinInitialSet));
  });

  if (!publicationToggle) {
    return;
  }

  const canCollapse = activeFilter === "all" && publications.length > initialPublicationCount;
  publicationToggle.hidden = !canCollapse;
  publicationToggle.textContent = publicationsExpanded ? "Show fewer publications" : "Show all publications";
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    publicationsExpanded = false;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    updatePublications();
  });
});

if (publicationToggle) {
  publicationToggle.addEventListener("click", () => {
    publicationsExpanded = !publicationsExpanded;
    updatePublications();
  });
}

updatePublications();

function updateCourses() {
  courseItems.forEach((course, index) => {
    course.classList.toggle("hidden", !coursesExpanded && index >= initialCourseCount);
  });

  if (!courseToggle) {
    return;
  }

  courseToggle.hidden = courseItems.length <= initialCourseCount;
  courseToggle.textContent = coursesExpanded ? "Show fewer courses" : "Show all courses";
}

if (courseToggle) {
  courseToggle.addEventListener("click", () => {
    coursesExpanded = !coursesExpanded;
    updateCourses();
  });
}

updateCourses();
