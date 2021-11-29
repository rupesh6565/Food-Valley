import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import PopupWriteRevew from "../components/Popup/WriteReview";
import PopupRevews from "../components/Popup/Reviews";
import Item from "../components/Common/Item";
import { fetchItems } from "../reducks/items/operations";
import { getItems } from "../reducks/items/selectors";
import { getCarts, getSubtotal } from "../reducks/carts/selectors";
import { fetchFromLocalStorage } from "../reducks/carts/operations";
import background from "../assets/img/main_img.png";
import queryString from "query-string";

const Home = () => {
  const parsed = queryString.parse(window.location.search);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showCartList, setShowCartList] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const items = getItems(selector);
  const carts = getCarts(selector);
  const subtotal = getSubtotal(selector);

  useEffect(() => {
    dispatch(fetchFromLocalStorage());
    dispatch(fetchItems(parsed.category));
  }, []);

  const showItem = (item) => {
    let selected_count = 0;
    if (carts[item.id] && carts[item.id].selected_count) {
      selected_count = carts[item.id].selected_count;
    }

    if (showCartList && carts[item.id] == undefined) {
      // if the page is cart page and item is not slected, show nothing.
      return;
    }

    return (
      <li>
        <Item
          key={item.id}
          item={item}
          selected_count={selected_count}
          setShowWriteReview={setShowWriteReview}
          setShowReviews={setShowReviews}
          setSelectedItemId={setSelectedItemId}
        />
      </li>
    );
  };

  return (
    <div class="home">
      <Header />

      <section class="main-visual">
      <img src={background} alt="" />
      <div class="order">
                <h1>How to order?</h1>
                <p>
                  Thank you for loading Food Valley by QR code.
                  <br />
                  Now, you can select your items below and show your order to our waiter.
                </p>
              </div>
      </section>
    
      <section class="content">
        {showCartList ? (
          <>

        </>
        ) : (
          <>
            
              <div class="category">
                  <select name="menu" class="active" >
                    <option value="Menu">Menu</option>
                    <option value="Veg">Veg</option>
                    <option value="Non Veg">Non Veg</option>
                  </select>
                </div>
                
          </>
        )}
        <ul class="items">{items && items.map((item) => showItem(item))}</ul>
      </section>

      <Footer price={subtotal} showCartList={showCartList} setShowCartList={setShowCartList} />

      {showWriteReview && (
        <PopupWriteRevew selectedItemId={selectedItemId} setSelectedItemId={setSelectedItemId} setShowWriteReview={setShowWriteReview} />
      )}
      {showReviews && <PopupRevews selectedItemId={selectedItemId} setSelectedItemId={setSelectedItemId} setShowReviews={setShowReviews} />}
    </div>
  );
};

export default Home;
