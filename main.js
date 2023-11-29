class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    let id;
    if (this.products.find(x => x.code === code)) {
      throw new Error('Code already in use');
    } else {
      const product = { title, description, price, thumbnail, code, stock };
      do {
        id = Math.floor(Math.random() * 10);
      } while (id === this.products.find(x => x.id));
      product.id = id;
      this.products.push(product);
    }
  }
  getProducts() {
    return this.products;
  }

  getProductById(param) {
    if (this.products.find(x => x.id === param))
      return this.products.find(x => x.id === param);
    else throw new Error("Can't find the product you're looking for");
  }
}

// SE CREA LA INSTANCIA DE "ProductManager".
const productManager = new ProductManager();

// SE LLAMA A 'getProducts' PARA COMPROBAR QUE DEVUELVA UN ARRAY VACIO.
console.log(productManager.getProducts()); // OUTPUT: Array []

// SE LLAMA AL METODO 'addProduct' PARA AGREGAR EL PRODUCTO CON LOS CAMPOS INDICADOS.
productManager.addProduct(
  'producto prueba',
  'Este es un producto prueba',
  200,
  'Sin Imagen',
  'abc123',
  25
);

// SE LLAMA A 'getProducts' NUEVAMENTE PARA COMPROBAR QUE SE HAYA INSERTADO SATISFACTORIAMENTE.
console.log(productManager.getProducts());

// SE AGREGA EL MISMO PROBLEMA PARA COMPROBAR QUE DE ERROR (Descomentar para probar).
//productManager.addProduct('producto prueba','Este es un producto prueba',200,'Sin Imagen','abc123',25); // Output: Uncaught Error: Code already in use

// SE EVALUA QUE  'getProductById' DE ERROR EN CASO DE NO ENCONTRAR EL ELEMENTO BUSCADO (Descomentar para probar).
//console.log(productManager.getProductById(2972)); // Output: Uncaught Error: Can't find the product you're looking for
