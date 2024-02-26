import { useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../store/CartContext";
import { ProductContext } from "../store/ProductContext";
import { WishListContext } from "../store/WishListContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const cartCtx = useContext(CartContext);
  const wishListCtx = useContext(WishListContext);
  const product = products.find((item) => {
    return item.id === parseInt(id);
  });
  if (!product) {
    return (
      <section className="h-screen flex justify-center items-center">
        Loading...
      </section>
    );
  }
  const { title, price, description, image } = product;
  const addToCartHandler = (item) => {
    cartCtx.addItem({
      id: item.id,
      image: item.image,
      title: item.title,
      price: item.price,
      amount: 1,
    });
  };
  const addToWishListHandler = (item) => {
    wishListCtx.addWishItem({
      id: item.id,
      image: item.image,
      title: item.title,
      price: item.price,
    });
  };
  return (
    <section className="pt-8 lg:py-16 md:flex md:items-center">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="mb-8 md:mb-0 md:mr-8 md:flex-shrink-0">
          <img className="pt-8 h-[425px]" src={image} alt="product_image" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl lg:text-4xl font-medium mb-2 max-w-[450px]">
            {title}
          </h1>
          <div className="text-lg text-red-500 font-medium mb-6">$ {price}</div>
          <p className="text-sm md:text-base mb-8">{description}</p>
          <div className="flex flex-col md:flex-row items-center justify-center m-4 md:justify-start space-y-4 md:space-y-0">
            <button
              onClick={() => addToWishListHandler(product)}
              className="bg-red-500 py-3 px-6 text-white hover:bg-red-400 md:mr-4"
            >
              Add to Wishlist
            </button>
            <button
              onClick={() => addToCartHandler(product)}
              className="bg-blue-500 py-3 px-6 text-white hover:bg-blue-400"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
