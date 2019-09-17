async function getIdolList() {
    const container = document.getElementById('dynamic-list');
    const response = await ParseApi.getItemList();
    // console.log("리스폰이 : ",response);
    // console.log("리스폰이 리절트 : ",response.result)
    let htmls = [];
    response.result.forEach(element => {
        const { name, price, group, description, count, imgUrl,  objectId} = element; // Add objectId

      const html =  `<div class="item row-container" id="${objectId}">` + // Edit this line
        `<img src="${imgUrl}" class="profile">` +
        `<div class="column-container">` +
            `<div class="title idol-Name">${name}</div>` +
            `<div class="description">${description}</div>` +
            `<div class="tags Hashtag">` +
                `<span class="tag">${group}</span>` +
            `</div>` +
        `</div>` +
        `<div class="column-container subinfo-container">` +
            `<span class="Sub-Text quantity"> 상품 수: ${count}</span>` + // Add class called quantity
            `<span class="Sub-Text">$${price}</span>` +
        `</div>` +
        `<button class="buy-button" onclick="purchaseItem('${objectId}')">Buy</button>` + // Add this line
    `</div>`;

    const e = document.createElement('div');
    e.innerHTML = html;

    container.appendChild(e);
    });
}