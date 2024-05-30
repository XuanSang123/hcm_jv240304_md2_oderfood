import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartReducer";
import foodApi from "../../api/foodApi";

export default function AsiaFood() {
  const [foods, setFoods] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAsiaFood = async () => {
      try {
        const response = await foodApi.getAsiaFood();
        setFoods(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAsiaFood();
  }, []);

  const handleDetails = (food) => {
    dispatch(addToCart(food));
  };

  return (
    <>
      <Header />
      <Navigation />
      <h1>Quán Châu Á ngon</h1>
      <div id="list-food">
        {foods.map((food) => (
          <div key={food.id} className="list-food">
            <img src={food.image} alt={food.name} />
            <h3>{food.name}</h3>
            <p>Restaurant: {food.restaurant}</p>
            <p>Address: {food.address}</p>
            <p>Price: {food.price}</p>
            <p>Review: {food.review}</p>
            <button onClick={() => handleDetails(food)}>Đặt món</button>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
