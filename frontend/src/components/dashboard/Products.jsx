import React from "react";
import styles from "../../styles/dashboard/products.module.css";
import { useState, useEffect } from "react";
import { FilePlus, List, Edit, Trash2 } from "lucide-react";
import axios from "axios";
const Products = () => {
  const [switchProduct, setSwitchProduct] = useState("add");
  const [products, setProducts] = useState([]);

  const [formDataProducts, setFormDataProducts] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataProducts((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    // Zmienione z handleChange na właściwą obsługę plików
    setFormDataProducts({
      ...formDataProducts,
      image: e.target.files[0], // Zapisz cały obiekt pliku
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formDataProducts.image &&
      formDataProducts.image.size > 5 * 1024 * 1024
    ) {
      alert("Plik jest zbyt duży (max 5MB)");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", formDataProducts.title);
      formData.append("price", formDataProducts.price);
      formData.append("description", formDataProducts.description);
      if (formDataProducts.image) {
        formData.append("image", formDataProducts.image);
      }
      const response = await axios.post(
        "http://localhost:5000/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      // Reset form after successful submission
      setFormDataProducts({
        title: "",
        price: "",
        description: "",
        image: "",
      });
      alert("Product added successfully!");
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
      alert("Error adding product. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts(); // Odśwież listę po usunięciu
        alert("Product deleted successfully");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2 classsName={styles.sectionTitle}>Products</h2>
      </div>
      <div className={styles.content}>
        <div className={styles.btnSwitch}>
          <button
            onClick={() => setSwitchProduct("add")}
            className={styles.switch}
          >
            Add Products <FilePlus />{" "}
          </button>
          <button
            onClick={() => setSwitchProduct("list")}
            className={styles.switch}
          >
            Products List <List />
          </button>
        </div>
        {switchProduct === "add" && (
          <div className={styles.addProducts}>
            <form
              onSubmit={handleSubmit}
              value={formDataProducts}
              className={styles.form}
              encType="multipart/form-data"
            >
              <label className={styles.labels} htmlFor="title">
                Name:
              </label>
              <input
                onChange={handleChange}
                value={formDataProducts.title}
                type="text"
                id="title"
                name="title"
                required
              />
              <label className={styles.labels} htmlFor="price">
                Price:
              </label>
              <input
                onChange={handleChange}
                value={formDataProducts.price}
                type="number"
                id="price"
                name="price"
              />
              <label className={styles.labels} htmlFor="description">
                Description:
              </label>
              <textarea
                onChange={handleChange}
                value={formDataProducts.description}
                id="description"
                name="description"
              />
              <label className={styles.labels}>
                Image:
                <input
                  onChange={handleFileChange} 
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                />
              </label>
              <button className={styles.btnAdd} type="submit">
                Add Product
              </button>
            </form>
          </div>
        )}
        {switchProduct === "list" && (
          <div className={styles.listProducts}>
            {products.length === 0 ? (
              <p>No products found</p>
            ) : (
              <table className={styles.productsTable}>
                <thead>
                  <tr>
                    <th className={styles.descriptionTitle}>Image</th>
                    <th className={styles.descriptionTitle}>Name</th>
                    <th className={styles.descriptionTitle}>Price</th>
                    <th className={styles.descriptionTitle}>Description</th>
                    <th className={styles.descriptionTitle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td className={styles.productDesc}>
                        {product.image && (
                          <img
                            src={`http://localhost:5000${product.image}`}
                            alt={product.title}
                            className={styles.productImage}
                          />
                        )}
                      </td>
                      <td className={styles.productDesc}>{product.title}</td>
                      <td className={styles.productDesc}>${product.price}</td>
                      <td className={styles.productDesc}>
                        {product.description}
                      </td>
                      <td className={styles.buttonsAction}>
                        <button className={styles.editBtn}>
                          <Edit size={16} />
                        </button>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => handleDelete(product._id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
