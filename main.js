const fs = require('fs').promises;

class ProductManager {
  constructor() {
    this.products = [];
    this.path = './products.json';
  }

  async readProducts() {
    try {
      const res = await fs.readFile(this.path, 'utf-8');
      if (res !== '') {
        return JSON.parse(res);
      } else {
        return [];
      }
    } catch (err) {
      console.log('Error al leer el archivo', err);
    }
  }

  async getProducts() {
    try {
      const arr = await this.readProducts();
      console.log(arr);
    } catch (err) {
      console.log("Couldn't get products", err);
    }
  }

  async writeProducts(data) {
    try {
      await fs.writeFile(this.path, JSON.stringify(data, null, 2));
    } catch (err) {
      console.log('error writing file', err);
    }
  }

  async addProduct(newObj) {
    let { title, desc, price, img, code, stock } = newObj;
    try {
      const fileProducts = await this.readProducts();
      if (fileProducts.length > 0) {
        this.products = fileProducts.map(obj => ({ ...obj }));

        const newProduct = {
          id: this.products.length + 1,
          title,
          desc,
          price,
          img,
          code,
          stock,
        };

        this.products.push(newProduct);
        this.writeProducts(this.products);
      } else {
        const newProduct = {
          id: 1,
          title,
          desc,
          price,
          img,
          code,
          stock,
        };
        this.products.push(newProduct);
        this.writeProducts(this.products);
      }
    } catch (err) {
      console.log("Coudn't add the product");
    }
  }

  async getProductById(id) {
    try {
      const arr = await this.readProducts();
      if (arr.length > 0) {
        if (arr.find(e => e.id === id)) {
          const product = arr.find(e => e.id === id);
          console.log(product);
        } else {
          console.log("product doesn't exist");
        }
      } else {
        console.log('No elements in stock');
      }
    } catch (err) {
      console.log("Couldn't find product", err);
    }
  }

  async deleteProduct(id) {
    try {
      const arr = await this.readProducts();
      if (arr.find(e => e.id === id)) {
        if (arr.length > 0) {
          const newArr = arr.filter(obj => obj.id !== id);
          this.products = newArr;
          this.writeProducts(this.products);
        } else {
          console.log('No elements in stock');
        }
      } else {
        console.log('product not found');
      }
    } catch (err) {
      console.log("Couldn't find product", err);
    }
  }

  async updateProductById(id, obj) {
    try {
      const arr = await this.readProducts();
      let { title, desc, price, img, code, stock } = obj;
      if (arr.length > 0) {
        this.products = arr;
        const i = arr.findIndex(o => {
          return o.id === id;
        });
        this.products[i].title = title;
        this.products[i].desc = desc;
        this.products[i].price = price;
        this.products[i].img = img;
        this.products[i].code = code;
        this.products[i].stock = stock;
        console.log(this.products);
        this.writeProducts(this.products);
      } else {
        console.log();
      }
    } catch (err) {
      console.log("Couldn't find product", err);
    }
  }
}

// Se creará una instancia de la clase 'ProductManager'
const manager = new ProductManager();

// Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []. (DESCOMENTAR PARA PROBAR)
// manager.getProducts(); // Output: []

// Se llamará al método 'addProduct'. (DESCOMENTAR PARA PROBAR)
/*
manager.addProduct({
  title: 'producto prueba',
  desc: 'este es un producto prueba',
  price: 200,
  img: 'sin imagen',
  code: 'abc123',
  stock: 25,
});
*/

// Se llamará el método 'getProducts' nuevamente, esta vez debe aparecer el producto recién agregado. (DESCOMENTAR PARA PROBAR)
// manager.getProducts();

// Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error. (DESCOMENTAR PARA PROBAR)
// manager.getProductById(1);

//Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización. (DESCOMENTAR PARA PROBAR)

/*
manager.updateProductById(1, {
  title: 'prueba cambio',
  desc: 'cambio',
  price: 90000,
  img: 'no img',
  code: 'abcdef',
  stock: 100,
});
*/

// Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir. (DESCOMENTAR PARA PROBAR)

// manager.deleteProduct(1);
