export default (text = "Button") => {
  const element = document.createElement("button");
  element.className = "btn btn-primary";
  element.innerHTML = text;

  element.onclick = () =>
    import("./LazyText.js")
      .then(lazy => {
        element.textContent = lazy.default;
      })
      .catch(err => console.log(err));

  return element;
};
