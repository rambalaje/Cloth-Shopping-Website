let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = (data = shopItemsData) => {
    shop.innerHTML = data
        .map((x) => {
            let { id, name, price, desc, img } = x;
            let search = basket.find((x) => x.id === id) || [];
            return `
            <div id=product-id-${id} class="item">
                <img width="220px" src="${img}" alt="">
                <div class="details">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                </div>
                <div class="price-quantity">
                    <h2><i class="bi bi-currency-rupee"></i>${price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>`;
        })
        .join("");
};

// Initial call to generate the full shop
generateShop();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    } else {
        search.item += 1;
    }

    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }

    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);

    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

// Filter function for search bar
let filterShop = () => {
    let searchValue = document.getElementById("searchInput").value.toLowerCase();
    let filteredItems = shopItemsData.filter((item) =>
        item.name.toLowerCase().includes(searchValue) || item.desc.toLowerCase().includes(searchValue)
    );

    generateShop(filteredItems);
};
