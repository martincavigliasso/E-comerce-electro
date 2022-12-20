class ProductManager {
    constructor() {
      this.products = [];
    }
  
    agregarProducto(title, description, price, thumbnail, code, stock) {
      const producto = {
        id: this.products.length + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      //todos son obligatorios
      if (
        title === undefined ||
        description === undefined ||
        price === undefined ||
        thumbnail === undefined ||
        code === undefined ||
        stock === undefined
      ) {
        return console.log("Todos los campos son obligatorios");
      }
  
      let condition = this.products.find((producto) => producto.code === code);
      if (condition) {
        return console.log("El producto ya existe");
      } else {
        this.products.push(producto);
      }
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      let myID = parseInt(id);
      let miPRoducto = null;
      this.products.forEach((producto) => {
        if (producto.id === myID) {
          miPRoducto = producto;
        }
      });
      if (miPRoducto === null) {
        return console.log("No existe el producto");
      } else {
        return miPRoducto;
      }
    }
  }
  
  const productManager = new ProductManager();
  productManager.agregarProducto(
    "informatica",
    "computadora",
    1000,
    "https://www.vecteezy.com/search?qterm=computadora&content_type=vector",
    "1234",
    10
  );
  productManager.agregarProducto(
    "navidad",
    1000,
    "https://www.vecteezy.com/vector-art/3704397-christmas-feast-and-dessert-background-concept"
    
  );
  
  console.log(productManager.getProducts());
  
  console.log("busqueda de producto", productManager.getProductById(1));
  
const fs = require("fs");
const path = require("path");

class UserManager {
  constructor() {
    this.users = [];
    this.file = path.join(__dirname, "users.json");
  }
  fileExists() {
    return fs.existsSync(this.file);
  }
  addUser(user) {
    return new Promise((resolve, reject) => {
      if (this.fileExists()) {
        console.log("El archivo existe");
        fs.readFile("./users.json", (err, data) => {
          if (err) {
            return console.log("Error al leer el archivo");
          }
          this.users = JSON.parse(data);
          this.users.push(user);
          fs.writeFile("./users.json", JSON.stringify(this.users), (err) => {
            if (err) {
              return console.log("Error al escribir el archivo");
            }
            resolve();
          });
        });
      } else {
        this.users.push(user);
        fs.writeFileSync(this.file, JSON.stringify(this.users), "utf8");
        resolve();
      }
    });
  }
  getUserById(id) {
    return new Promise((resolve, reject) => {
      fs.readFile(this.file, "utf8", (err, data) => {
        if (err) {
          reject(err);
        }
        this.users = JSON.parse(data);
        const user = this.users.find((user) => user.id === id);
        resolve(user);
      });
    });
  }
  getUsers() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.file, "utf8", (err, data) => {
        if (err) {
          reject(err);
        }
        this.users = JSON.parse(data);
        resolve(this.users);
      });
    });
  }

  deleteUserById(id) {
    return new Promise((resolve, reject) => {
      fs.readFile(this.file, "utf8", (err, data) => {
        if (err) {
          reject(err);
        }
        this.users = JSON.parse(data);
        this.users = this.users.filter((user) => user.id !== id);
        fs.writeFile;
      });
    });
  }
}

module.exports = UserManager;


import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(product) {
    try {
      const data = await this.readFile();
      if (data) {
        this.products = JSON.parse(data);
      }
      product.id = this.products.length
        ? this.products.reduce(
            (max, product) => (product.id > max ? product.id : max),
            0
          ) + 1
        : 1;
      this.products.push(product);

      await this.writeFile(this.products);
    } catch (err) {
      throw err;
    }
  }

  async getProducts() {
    try {
      const data = await this.readFile();
      this.products = JSON.parse(data);
      return this.products;
    } catch (err) {
      throw err;
    }
  }

  async getProductById(id) {
    try {
      const data = await this.readFile();
      this.products = JSON.parse(data);
      const product = this.products.find((product) => product.id === id);
      return product;
    } catch (err) {
      throw err;
    }
  }

  async updateProduct(id, product) {
    try {
      const data = await this.readFile();
      this.products = JSON.parse(data);
      const index = this.products.findIndex((product) => product.id === id);
      this.products[index] = product;
      await this.writeFile(this.products);
    } catch (err) {
      throw err;
    }
  }

  async deleteProduct(id) {
    try {
      const data = await this.readFile();
      this.products = JSON.parse(data);
      const index = this.products.findIndex((product) => product.id === id);
      this.products.splice(index, 1);
      await this.writeFile(this.products);
    } catch (err) {
      throw err;
    }
  }

  //resolve error ENOENT: no such file or directory, open 'products.json'
  async readFile() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.path, "utf-8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  async writeFile(data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.path, JSON.stringify(data, null, "\t"), (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }
}

export default ProductManager;
