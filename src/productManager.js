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
  