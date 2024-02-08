fetch("https://kea-alt-del.dk/t7/api/brands")
  .then((response) => response.json())
  .then(dataReceived);

function dataReceived(categories) {
  console.log(categories);
  categories.forEach(showCategory);
}

function showCategory(cat) {
  const template = document.querySelector("template").content;
  const clone = template.cloneNode(true);

  clone.querySelector(".brandname").textContent = cat.brandname;
  clone.querySelector(".brandbio").textContent = cat.brandbio;

  if (cat.brandbio) {
    clone.querySelector(".brandbio").style.display = "block";
  }

  clone.querySelector(".brandname").setAttribute("href", `productlist.html?brandname=${cat.brandname}`);

  const parent = document.querySelector("#brandlist");
  parent.appendChild(clone);
}

//   {
//     "brandname": "Nike",
//     "brandbio": "Nike, creating experiences for today’s athlete"
//   },
