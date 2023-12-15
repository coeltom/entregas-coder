import ProductManager from './productManager.js';
import express from 'express';
const PORT = 8080;
const app = express();
const manager = new ProductManager();

app.get('/', (req, res) => {
  res.send('Hola Mundo');
});

app.get('/products', async (req, res) => {
  try {
    let { limit } = req.query;
    const products = await manager.readProducts();
    if (limit) {
      const prods = products.slice(0, limit);
      res.send(prods);
    } else {
      res.send(products);
    }
  } catch (err) {
    res.send(err);
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const products = await manager.readProducts();
    const prod = products.filter(item => item.id == id);
    if (prod.length > 0) {
      res.send(prod);
    } else {
      res.send('Product not found');
    }
  } catch (err) {
    res.send(err);
  }
});

app.get('/prods', async (req, res) => {
  let { key } = req.query;
  res.send(key);
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
