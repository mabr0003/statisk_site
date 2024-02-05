const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

fetch("https://kea-alt-del.dk/t7/api/products/" + id)
  .then((response) => response.json())
  .then((data) => showProduct(data));

function showProduct(product) {
  console.log(product);

  document.querySelector("h1").textContent = product.productdisplayname;
  document.querySelector(".brandname").textContent = product.brandname;
  document.querySelector(".articletype").textContent = product.articletype;
  document.querySelector(".price").textContent = "DKK " + product.price + ",-";
  document.querySelector("img").src = "https://kea-alt-del.dk/t7/images/webp/640/" + product.id + ".webp";

  if (product.soldout) {
    document.querySelector(".product_img").classList.add("sold_out");
  }

  if (product.discount >= 1) {
    document.querySelector(".product_img").classList.add("on_sale");
  }

  if (document.querySelector(".product_img").classList.contains("sold_out")) {
    document.querySelector(".product_img").classList.remove("on_sale");
  }

  if (document.querySelector(".product_img").classList.contains("on_sale")) {
    document.querySelector(".discount").textContent = "-" + product.discount + "%";
  }

  if (document.querySelector(".product_img").classList.contains("on_sale")) {
    document.querySelector(".discount").style.display = "block";
  }
}
