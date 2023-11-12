import {
  getLocalStorage,
  setLocalStorage,
  alertMessage,
  removeAllAlerts,
} from "./utils.mjs";
import { checkout } from "./externalServices.mjs";

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: item.Quantity,
    };
  });
  return simplifiedItems;
}

function addPrice(checkoutProcess) {
  const cartItems = getLocalStorage("so-cart");
  const total = cartItems.reduce(
    (acc, item) => acc + item.FinalPrice * item.Quantity,
    0
  );

  // Calculate the total item count
  const totalItems = cartItems.reduce(
    (count, item) => count + item.Quantity,
    0
  );

  // Store these values in the checkoutProcess object
  checkoutProcess.itemTotal = total.toFixed(2);
  checkoutProcess.totalItems = totalItems;
}

const checkoutProcess = {
  key: "",
  outputSelector: "",
  list: [],
  itemTotal: 0,
  totalItems: 0,
  shipping: 0,
  tax: 0,
  orderTotal: 0,
  init: function (key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = getLocalStorage(key);
    this.calculateItemSummary();
  },
  calculateItemSummary: function () {
    const summaryElement = document.querySelector(
      this.outputSelector + " #cartTotal"
    );
    const itemNumElement = document.querySelector(
      this.outputSelector + " #num-items"
    );
    itemNumElement.innerText = this.list.length;
    // calculate the total of all the items in the cart
    const amounts = this.list.map((item) => item.FinalPrice);
    this.itemTotal = amounts.reduce((sum, item) => sum + item, 0);
    const formattedItemTotal = this.itemTotal.toFixed(2);
    summaryElement.innerText = "$" + formattedItemTotal;
  },
  calculateOrdertotal: function () {
    this.shipping = 10 + (this.totalItems - 1) * 2;
    this.tax = (parseFloat(this.itemTotal) * 0.06).toFixed(2);
    this.orderTotal = (
      parseFloat(this.itemTotal) +
      parseFloat(this.shipping) +
      parseFloat(this.tax)
    ).toFixed(2);
    this.displayOrderTotals();
  },
  displayOrderTotals: function () {
    const shipping = document.querySelector(this.outputSelector + " #shipping");
    const tax = document.querySelector(this.outputSelector + " #tax");
    const orderTotal = document.querySelector(
      this.outputSelector + " #orderTotal"
    );
    shipping.innerText = "$" + this.shipping;
    tax.innerText = "$" + this.tax;
    orderTotal.innerText = "$" + this.orderTotal;
  },
  checkout: async function (form) {
    const json = {
      orderDate: new Date().toISOString(),
      fname: form.fname.value,
      lname: form.lname.value,
      street: form.street.value,
      city: form.city.value,
      state: form.state.value,
      zip: form.zip.value,
      cardNumber: form.cardNumber.value,
      expiration: form.expiration.value,
      code: form.code.value,
      items: packageItems(Array.from(this.list)),
      orderTotal: this.orderTotal,
      shipping: this.shipping.toFixed(2),
      tax: this.tax,
    };

    console.log(json);

    try {
      const res = await checkout(json);
      console.log(res);
      setLocalStorage("so-cart", []);
      location.assign("/checkout/success.html");
    } catch (err) {
      removeAllAlerts();
      for (let message in err.message) {
        alertMessage(err.message[message]);
      }
      console.log(err);
    }
  },
};

addPrice(checkoutProcess);

export default checkoutProcess;
