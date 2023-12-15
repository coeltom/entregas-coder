import { promises as fs } from 'fs';

export default class ProductManager {
  constructor() {
    this.products = [];
    this.path = './src/products.json';
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
          return product;
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
