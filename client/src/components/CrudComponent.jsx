import React, { useState, useEffect } from "react";
import axios from "axios";

const CRUDComponent = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [img, setImg] = useState("");
  const [editingProductId, setEditingProductId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://app-api-server.vercel.app/api/products/");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createProduct = async () => {
    try {
      await axios.post("https://app-api-server.vercel.app/api/products/", {
        name,
        price,
        stock,
        img,
      });
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const updateProduct = async (productId) => {
    try {
      await axios.put(`https://app-api-server.vercel.app/api/products/${productId}`, {
        name,
        price,
        stock,
        img,
      });
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`https://app-api-server.vercel.app/api/products/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setStock("");
    setImg("");
    setEditingProductId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingProductId) {
      updateProduct(editingProductId);
    } else {
      createProduct();
    }
  };

  const handleEdit = (product) => {
    setEditingProductId(product._id);
    setName(product.name);
    setPrice(product.price);
    setStock(product.stock);
    setImg(product.img);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const productsPerPage = 6;
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const productsToShow = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <>
      <div className="mt-17">
        <div className="flex flex-col gap-4 items-center">
          <form onSubmit={handleSubmit}>
            <div className="font-semibold">
              <input
                type="text"
                placeholder="Name"
                className="border shadow outline-none focus:ring ring-sky-600 rounded px-2 py-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="font-semibold">
              <input
                type="number"
                placeholder="Price"
                className="border shadow outline-none focus:ring ring-sky-600 rounded px-2 py-1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="font-semibold">
              <input
                type="number"
                placeholder="Stock"
                className="border shadow outline-none focus:ring ring-sky-600 rounded px-2 py-1"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="font-semibold">
              <input
                type="text"
                placeholder="Image URL"
                className="border shadow outline-none focus:ring ring-sky-600 rounded px-2 py-1"
                value={img}
                onChange={(e) => setImg(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-sky-500 text-white py-1 px-3 rounded shadow hover:bg-sky-700 transition"
              >
                {editingProductId ? "UPDATE" : "ADD"}
              </button>
              {editingProductId && (
                <button
                  type="button"
                  className="bg-sky-500 text-white py-1 px-3 rounded shadow hover:bg-sky-700 transition"
                  onClick={resetForm}
                >
                  CANCEL
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="mt-19"></div>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mt-4">
          {productsToShow.map((product) => (
            <div
              key={product._id}
              className="rounded-lg border border-sky-600 p-4 flex flex-col gap-2"
            >
              <div className="font-semibold">
                <img
                  className="object-cover h-48 w-48"
                  src={product.img}
                  alt=""
                />
              </div>
              <div className="border-t border-sky-600"></div>
              <div className="font-semibold">{product.name} </div>
              <div className="border-t border-sky-600"></div>
              <div className="font-semibold">PRICE: {product.price} €</div>
              <div className="border-t border-sky-600"></div>
              <div className="font-semibold">STOCK: {product.stock}</div>
              <div className="border-t border-sky-600"></div>
              <div className="flex justify-between">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-sky-500 text-white py-1 px-3 rounded shadow hover:bg-sky-700 transition"
                >
                  EDIT
                </button>
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="bg-red-600 text-white py-1 px-3 rounded shadow hover:bg-red-700 transition"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2"></div>
        <div className="flex justify-center space-x-2 gap-4 mt-4">
          <div className="rounded-lg border border-sky-600 p-4">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className="bg-sky-500 text-white py-1 px-6 rounded shadow hover:bg-sky-700 transition ml-1 mr-1"
                  hidden={pageNumber === currentPage}
                >
                  {pageNumber}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CRUDComponent;
