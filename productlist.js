const urlParams = new URLSearchParams(window.location.search);
const brandname = urlParams.get("brandname");

fetch("https://kea-alt-del.dk/t7/api/products?brandname=" + brandname)
  .then((response) => response.json())
  .then(dataReceived);

function dataReceived(products) {
  console.log(products);
  products.forEach(showProduct);
}

function showProduct(product) {
  const template = document.querySelector("#product_card_template").content;
  const clone = template.cloneNode(true);

  clone.querySelector("h2").textContent = product.productdisplayname;
  clone.querySelector(".articletype").textContent = product.articletype;
  clone.querySelector(".brandname").textContent = product.brandname;
  clone.querySelector(".price").textContent = "DKK " + product.price + ",-";
  clone.querySelector("img").src = "https://kea-alt-del.dk/t7/images/webp/640/" + product.id + ".webp";

  document.querySelector("h1").textContent = product.brandname;

  if (product.soldout) {
    clone.querySelector(".product_card").classList.add("sold_out");
  }

  if (product.discount) {
    clone.querySelector(".product_card").classList.add("on_sale");
  }

  if (clone.querySelector(".product_card").classList.contains("sold_out")) {
    clone.querySelector(".product_card").classList.remove("on_sale");
  }

  if (clone.querySelector(".product_card").classList.contains("on_sale")) {
    clone.querySelector(".discount").style.display = "block";
    clone.querySelector(".discount").textContent = "-" + product.discount + "%";
  }

  clone.querySelector(".read_more").setAttribute("href", `product.html?id=${product.id}`);

  const parent = document.querySelector("#productlist");
  parent.appendChild(clone);
}

/* <article class="product_card">
                <img src="https://kea-alt-del.dk/t7/images/webp/640/1163.webp" alt="nike">
                <h2>Sahara Team India Fanwear Round Neck Jersey</h2>
                <div class="subtle">NIKE | T-shirts</div>
                <div class="price">DKK 895,-</div>
                <a href="product.html">Read more</a>
            </article> 
            
            
              {
    "id": 1163,
    "gender": "Men",
    "category": "Apparel",
    "subcategory": "Topwear",
    "articletype": "Tshirts",
    "season": "Summer",
    "productionyear": 2011,
    "usagetype": "Sports",
    "productdisplayname": "Sahara Team India Fanwear Round Neck Jersey",
    "price": 895,
    "discount": null,
    "brandname": "Nike",
    "soldout": 0
  },*/
