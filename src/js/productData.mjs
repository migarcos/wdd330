function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export function getData(category = "tents") {
  return fetch(`../json/${category}.json`)
    .then(convertToJson)
    .then((data) => data); //  arrow functions in JavaScript
}      // ^^ function(data) { return data; } // more traditional anonymous function declaration

export async function findProductById(id) {
  const products = await getData();
  return products.find((item) => item.Id === id);
}                   // function(item) { return item.Id === id; }

// ^^ Many find the async/await syntax to be easier to read 
// (and write) than the typical .then() based promise handling.