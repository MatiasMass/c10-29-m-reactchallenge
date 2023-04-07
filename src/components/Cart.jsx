import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetAllPurchasesByUserId } from "../redux/features/purchases/purchasesSlice";
import { removeToCart, emptyCart } from "../redux/features/cart/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import purchaseService from "../services/purchases";
import Pay from "../pays/Pay";
import "./cart.css";

const Cart = () => {
  const [confirmed, setConfirmed] = useState(false);
  const [displayCard, setDisplayCard] = useState(false);
  const items = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);
  // const user = useSelector((state) => state.auth.user);
  const purchases = useSelector((state) => state.purchases.purchases);
  const dispatch = useDispatch();

  const emptyCartMessage = () => toast.error("No hay productos en el carrito");
  // const removeItemMessage = () => toast.error("Producto eliminado del carrito");
  const productFoundMessage = () => toast.error("Alguno de los productos ya fue comprado");
  
  const removeItem = (id) => {
    // console.log("remove item");
    // removeItemMessage();
    dispatch(removeToCart(id));
  };

  useEffect(() => {
    dispatch(fetchGetAllPurchasesByUserId());
  }, []);

  const verifyPurchase = () => {
    // console.log("verificar compra");
    // console.log(purchases);
    let foundPurchase = false
    items.forEach((item) => {
      purchases.some((purchase) => {
        console.log
        if (item.uid === purchase.uid) {
          foundPurchase = true;
          return true;
        }
      });
      return foundPurchase;
    });
    console.log("found purchase", foundPurchase);
    return foundPurchase;
  }
  const handlePurchase = async () => {
    // console.log("comprar");
    // // Add a new document with a generated id.
    // const docRef = await addDoc(collection(db, "cities"), {
    //   name: "Tokyo",
    //   country: "Japan",
    // });
    // console.log("Document written with ID: ", docRef.id);
    if (items.length === 0) {
      emptyCartMessage();
      return;
    }else if (verifyPurchase()) {
      productFoundMessage()
      return;
    } else {
      setDisplayCard(true);
      console.log("confirmed", confirmed);
      if (confirmed) {
        const purchase = await purchaseService.addPurchase(items);
        console.log(purchases);
        dispatch(emptyCart());
        return;
      }
    }
  };

  const handleEmptyCart = () => {
    // console.log("vaciar carrito");
    if (items.length === 0) {
      emptyCartMessage();
      return;
    }
    dispatch(emptyCart());
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Carrito de compras</h2>
      <ul className="cart-items-list">
        {items &&
          items.map((item) => {
            return (
              <div key={item.uid} className="cart-item-container">
                <li key={item.uid} className="cart-item">
                  {item.title} - {item.price}
                  <button
                    onClick={() => removeItem(item.uid)}
                    className="cart-item-remove-btn"
                  >
                    X
                  </button>
                </li>
              </div>
            );
          })}
      </ul>
      <p className="cart-total">Total: {total}</p>
      <button
        onClick={() => {
          handlePurchase();
        }}
        className="cart-purchase-btn"
      >
        Comprar
      </button>
      <button onClick={handleEmptyCart} className="cart-empty-btn">
        Vaciar carrito
      </button>
      {displayCard && (
        <Pay
          confirmed={confirmed}
          setConfirmed={setConfirmed}
          setDisplayCard={setDisplayCard}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default Cart;
