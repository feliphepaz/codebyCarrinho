import { useState, useEffect } from "react";
import styles from "./Cart.module.css";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  async function getProducts() {
    try {
      const response = await fetch(
        "https://api.jsonbin.io/v3/b/62b52aef449a1f3821177207"
      );
      const resolve = await response.json();
      setProducts(resolve.record.items);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  function formatValues(value) {
    return value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <div className={styles.cart}>
      <section className={styles.products}>
        <h2 className="titleBold">Produtos</h2>
        <hr></hr>
        <ul>
          {products.map((product) => (
            <li key={product.productId}>
              <img src={product.imageUrl}></img>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.cartItems}>
        <h2 className="titleBold">Meu carrinho</h2>
        <hr></hr>
        <ul>
          {products.map((product) => (
            <li key={product.productId}>
              <div className={styles.itemImg}>
                <img src={product.imageUrl}></img>
              </div>
              <div className={styles.itemInfo}>
                <h3 className="textBold">{product.name}</h3>
                <span className="legend">{formatValues(product.price)}</span>
                <p className="textMedium">
                  {formatValues(product.sellingPrice)}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <hr></hr>
        <div className={styles.payment}>
          <div className={styles.total}>
            <h4 className="titleBold">Total</h4>
            <h4 className="titleBold">R$ 13,31</h4>
          </div>
          <div className={styles.shipping}>
            <p className="titleMedium">
              Parabéns, sua compra tem frete grátis !
            </p>
          </div>
        </div>
        <hr></hr>
        <div className={styles.buy}>
          <button className="titleBold">Finalizar compra</button>
        </div>
      </section>
    </div>
  );
};

export default Cart;
