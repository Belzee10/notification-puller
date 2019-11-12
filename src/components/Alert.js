export default msg => {
  const element = document.createElement("div");

  element.className = "alert alert-danger";
  element.innerHTML = msg;

  return element;
};
