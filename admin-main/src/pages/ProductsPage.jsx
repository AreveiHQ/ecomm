import React from 'react';
import ProductList from '../components/ProductList';


function ProductsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        All Product's
      </h1>
      <ProductList />
    </div>
  );
}

export default ProductsPage;
