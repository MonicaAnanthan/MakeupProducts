const Makeup_API = 'http://makeup-api.herokuapp.com/api/v1/products.json'
async function getMakeupData() {
    try {
        const response = await fetch(`${Makeup_API}`);

        const result = await response.json();
        if (result.length > 0) {
            renderLists(result);
        } else {
            hideShow("no-data-container", "No Data found");
        }
    } catch (error) {
        hideShow("no-data-container", "Something went wrong! No Data Found!!");
        console.log(error);
    }
}
getMakeupData();

function renderLists(data = []) {
    const ulElement = document.getElementsByClassName("row")[0];
    if (data.length > 0) {
        data.forEach((_d) => {
            ulElement.appendChild(createListitem(_d));
        });
    }
}

// let defaultImage = './assets/img/defaultMakeup.webp';
// <img onerror='this.src="./assets/img/defaultMakeup.webp"' src=${item.image_link.length > 0 ? item.image_link : defaultImage} alt="product" />

function createListitem(item = {}) {
    const liItem = document.createElement("div");
    liItem.className = "col-12 col-md-6 col-lg-4";
    liItem.innerHTML = `<div class="card">
                            <div class="card-body">
                                <div class="img-box">
                                <img onerror='this.src="./assets/img/defaultMakeup.webp"' src=${item.image_link} alt="product" />
                                </div>
                                <div class="text-box">
                                    <h4>${item.brand}</h4>
                                    <h5>${item.name}</h5>
                                    <div class="d-flex justify-content-center">
                                        <p>
                                            <span>${item.price_sign}</span>
                                            <span>${item.price}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>`
    return liItem;
}


function hideShow(classOfElement = "", message = "") {
    const element = document.getElementsByClassName(classOfElement)[0];
    element.className = "no-data-container";
    document.getElementsByClassName("error-txt")[0].innerHTML = message
}
