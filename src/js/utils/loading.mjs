export function loadingSpinner(list) {
  const spinner = document.createElement("div");
  spinner.classList.add("spinner", "flex", "justify-center", "items-center");
  const innerSpinner = document.createElement("div");
  innerSpinner.classList.add(
    "animate-spin",
    "rounded-full",
    "h-32",
    "w-32",
    "border-b-2",
    "border-primaryClr"
  );
  spinner.appendChild(innerSpinner);
  list && list.appendChild(spinner);
}

export function removeSpinner() {
  const spinner = document.querySelector(".spinner");
  spinner && spinner.remove();
}
