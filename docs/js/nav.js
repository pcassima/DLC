function myFunction() {
    let element = document.getElementById("nav-list");
    if (element.classList.contains("active")) {
        element.classList.remove("active");
    } else {
        element.classList.add("active");
    }
}