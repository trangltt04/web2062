const productElement = document.getElementById("products");
// console.log(productElement);

const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const descriptionInput = document.getElementById("description");

let isEdit;

const url = "http://localhost:3000/products";

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    const row = data
      .map(
        (item) => /*html*/ `<tr>
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>${item.price}</td>
          <td>${item.description}</td>
          <td>
            <button class="btn btn-warning" onClick="editProduct(${item.id})">Edit</button>
            <button class="btn btn-danger" onClick="deleteProduct(${item.id})">Delete</button>
          </td>
        </tr>
    `
      )
      .join("");
    productElement.innerHTML = row;
  });

function deleteProduct(id) {
  if (confirm("Are you sure")) {
    fetch(`${url}/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
}

function handleSubmit() {
  const name = nameInput.value;
  const price = priceInput.value;
  const description = descriptionInput.value;

  if (!name || !price || !description) {
    alert("Khong duoc bo trong!");
    return;
  }
  if (price < 0) {
    alert("gia khong duoc nho hon 0");
    return;
  }
  if (name.length < 6) {
    alert("Ten sp k dc ngan hon 6 ky tu!");
    return;
  }
  if (isEdit) {
    // logic edit
    fetch(`${url}/${isEdit}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price, description }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  } else {
    // login add
    fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price, description }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
}

function editProduct(id) {
  isEdit = id;
  fetch(`${url}/${id}`)
    .then((res) => res.json())
    .then((data) => {
      nameInput.value = data.name;
      priceInput.value = data.price;
      descriptionInput.value = data.description;
    });
}
