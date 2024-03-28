export const renderWithTemplate = (template, parentElement, data, callback) => {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback(data);
  }
}

export const loadTemplate = async (path) => await fetch(path).then((res) => res.text());

export const loadHeader = async () => {
  const header = await loadTemplate("partials/header.html");
  renderWithTemplate(header, document.getElementById("header"));
}