import React from 'react'
import styles from '../styles/homepage.module.css'
import {useState, useEffect} from 'react';
import axios from 'axios';
const HomePage = () => {
    
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  },[]);


  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.leftContent}>
        <div className={styles.leftContentTop}>
          <div className={styles.leftSide}>
            {products.map((product) => (
              <div key={product._id} className={styles.product}>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <p>${product.price}</p>
                <img src={product.image} alt={product.title} />
                <button>Add to Cart</button>
              </div>
            ))}
          </div>
          <div className={styles.rightSide}>

          </div>
        </div>
      </div>
      <div className={styles.rightContent}></div>
    </div>
  )
}

export default HomePage