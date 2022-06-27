import { useState, useEffect } from "react";
import styles from "./Cart.module.css";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);

  async function getProducts() {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.jsonbin.io/v3/b/62b52aef449a1f3821177207"
      );
      const resolve = await response.json();
      setProducts(resolve.record.items);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getTotal();
    getDiscount();
  }, [cartItems]);

  function insertOnCart(index) {
    const productsClone = [...products];
    productsClone.splice(index, 1);
    setProducts(productsClone);
    setCartItems([...cartItems, products[index]]);
  }

  function removeOnCart(index) {
    const cartItemsClone = [...cartItems];
    cartItemsClone.splice(index, 1);
    setCartItems(cartItemsClone);
    setProducts([...products, cartItems[index]]);
  }

  function formatValues(value) {
    return value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      style: "currency",
      currency: "BRL",
    });
  }

  function getTotal() {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.sellingPrice / 100;
    });
    setTotal(total);
  }

  function getDiscount() {
    let discount = 0;
    cartItems.forEach((item) => {
      const price = item.price / 100;
      const sellingPrice = item.sellingPrice / 100;
      const diff = price - sellingPrice;
      discount += +diff.toFixed(2);
    });
    setDiscount(discount);
  }

  return (
    <div className={styles.cart}>
      <section className={styles.products}>
        <h2 className="titleBold">Produtos</h2>
        <hr></hr>
        {!loading ? (
          <ul>
            {products.map((product, index) => (
              <li key={index} onClick={() => insertOnCart(index)}>
                <img src={product.imageUrl}></img>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.loadingProducts}>
            <p className="textMedium">Carregando produtos...</p>
          </div>
        )}
      </section>
      <section className={styles.cartItems}>
        <h2 className="titleBold">
          Meu carrinho <span className="textMedium">({cartItems.length})</span>
        </h2>
        <hr></hr>
        {cartItems.length !== 0 ? (
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                <div className={styles.itemImg}>
                  <img src={item.imageUrl}></img>
                </div>
                <div className={styles.itemInfo}>
                  <h3 className="textBold">{item.name}</h3>
                  <span className="legend">
                    {formatValues(item.price / 100)}
                  </span>
                  <p className="textMedium">
                    {formatValues(item.sellingPrice / 100)}
                  </p>
                </div>
                <div className={styles.itemRemove}>
                  <span className="legend" onClick={() => removeOnCart(index)}>
                    X
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.emptyCart}>
            <p className="textMedium">
              Carrinho vazio. Adicione os produtos acima clicando neles.
            </p>
          </div>
        )}
        <hr></hr>
        <div className={styles.payment}>
          <div className={styles.total}>
            <h4 className="titleBold">Total</h4>
            <div>
              <h4 className="titleBold">{formatValues(total)}</h4>
              {discount > 0 && (
                <p className="legend">
                  Você economizou {formatValues(discount)}
                </p>
              )}
            </div>
          </div>
          {total >= 10 && (
            <div className={styles.shipping}>
              <p className="titleMedium">
                Parabéns, sua compra tem frete grátis !
              </p>
            </div>
          )}
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
