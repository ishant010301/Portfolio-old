const components = [
  { id: "hero", file: "hero.html" },
  { id: "about", file: "about.html" },
  { id: "quote", file: "quote.html" },
  { id: "resume", file: "resume.html" },
  { id: "skills", file: "skills.html" },
  { id: "certificates", file: "certificates.html" },
  { id: "contact", file: "contact.html" },
  { id: "footer", file: "footer.html" },
];

const loadComponent = async (id, file) => {
  try {
    const response = await fetch(`components/${file}`);
    if (!response.ok) throw new Error(`Failed to load ${file}`);
    const data = await response.text();
    document.getElementById(id).innerHTML = data;
  } catch (error) {
    console.error(`Error loading component ${file}:`, error);
  }
};

components.forEach(({ id, file }) => loadComponent(id, file));
