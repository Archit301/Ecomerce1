import React, { useState } from 'react';

const ProductSection = () => {
  // Sample product data (You can replace this with data fetched from your backend)
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Product 1',
      price: 100,
      stock: 'In Stock',
      category: 'Electronics',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 200,
      stock: 'Out of Stock',
      category: 'Clothing',
    },
    {
      id: 3,
      name: 'Product 3',
      price: 150,
      stock: 'In Stock',
      category: 'Accessories',
    },
  ]);

  // Handlers for product actions (add, edit, delete)
  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleEdit = (id) => {
    alert(`Edit product with ID: ${id}`);
  };

  const handleAddProduct = () => {
    alert('Add New Product');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>
        <button
          onClick={handleAddProduct}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Create New Product
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left py-3 px-4">Product Name</th>
              <th className="text-left py-3 px-4">Category</th>
              <th className="text-left py-3 px-4">Price</th>
              <th className="text-left py-3 px-4">Stock Status</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4">{product.name}</td>
                <td className="py-3 px-4">{product.category}</td>
                <td className="py-3 px-4">${product.price}</td>
                <td className="py-3 px-4">{product.stock}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="text-blue-500 hover:underline mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductSection;
