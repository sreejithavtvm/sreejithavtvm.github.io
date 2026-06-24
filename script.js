const filterButtons = document.querySelectorAll(".filter-button");
const publications = Array.from(document.querySelectorAll(".publication"));
const publicationToggle = document.querySelector("#toggle-publications");
const courseItems = Array.from(document.querySelectorAll("#teaching-goa + .course-list .course-item"));
const courseToggle = document.querySelector("#toggle-courses");
const initialPublicationCount = 5;
const initialCourseCount = 7;
let activeFilter = "all";
let publicationsExpanded = false;
let coursesExpanded = false;

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
