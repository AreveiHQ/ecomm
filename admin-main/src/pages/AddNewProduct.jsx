import React, {useRef, useState } from 'react'
import './AddNewProduct.css'
import axios from 'axios';
import swal from 'sweetalert';

const server = import.meta.env.VITE_BACKEND_SERVER;


export default function AddNewProduct() {
  const [product,setProduct] = useState({name:'', description:'', price:'', category:'',subCategory:'', brand:'', images:[],imagePreviews: [], stock:''});
  const categories = {
    men: ['shirts', 'trousers', 'shoes'],
    women: ['dresses', 'handbags', 'shoes'],
    kids: ['toys', 'clothing', 'shoes'],
  };
  const resetBtn = useRef();
  const [sizes, setSizes] = useState([]); // Store multiple sizes
  const [sizeInput, setSizeInput] = useState(''); // Track current size input
  const [availableColors] = useState(['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Purple', 'Orange']);
  const [selectedColors, setSelectedColors] = useState([]); // Store selected colors as tags
  const [inputValue, setInputValue] = useState(''); // Current input value
  const [filteredOptions, setFilteredOptions] = useState([]); // Options filtered by user input

  // Handle input change and filter available options
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Filter available colors based on input value
    const filtered = availableColors.filter(
      (color) => color.toLowerCase().includes(value.toLowerCase()) && !selectedColors.includes(color)
    );
    setFilteredOptions(filtered);
  };

  // Add color to the selected tags
  const addTag = (color) => {
    if (!selectedColors.includes(color)) {
      setSelectedColors([...selectedColors, color]);
    }
    setInputValue(''); // Reset input after selecting a color
    setFilteredOptions([]); // Hide the dropdown options
  };

  // Remove color tag
  const removeTag = (color) => {
    setSelectedColors(selectedColors.filter((tag) => tag !== color));
  };

  // Add size to the list
  const addSize = (e) => {
    e.preventDefault();
    if (sizeInput.trim() !== '') {
      setSizes([...sizes, sizeInput]);
      setSizeInput(''); // Clear input after adding
    }
  };
  // Remove size by index
  const removeSize = (index) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };


  const handleChangeAddProduct=(e)=>{
        setProduct({...product,[e.target.name]:e.target.value})
    }
    const handleImageChange = (e) => {
      const files = Array.from(e.target.files);
      const previews = files.map((file) => URL.createObjectURL(file));
      setProduct({
        ...product,
        images: files, // Store actual files
        imagePreviews: previews // Store URLs for preview
      });
      document.querySelector(".postform").classList.add("jadu");
    };

  const handleformdata = (e)=>{
    e.preventDefault();
    console.log(product,selectedColors,sizes);
    alert('wait for Few Seconds');

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('category', product.category);
    formData.append('subCategory', product.subCategory);
    formData.append('brand', product.brand);
    sizes.forEach((size) => {
        formData.append('sizes', size);
      });
    selectedColors.forEach((color) => {
        formData.append('colors', color);
      });
    formData.append('stock', product.stock);
    
    product.images.forEach((image) => {
      formData.append('images', image);
    });
    axios.post(`${server}/v1/product/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((res)=>{console.log(res.data);
  swal({
    title: "Successfully Uploaded",
    text: `${res.data.protype}`,
    icon: "success",
    dangerMode: true,
  })
  resetBtn.current.click();
  
}
  ).catch((err)=>{console.log(err);
    swal({
      title: "Failed",
      text: `${err.response?err.response.data.message:err.response.message}`,
      icon: "error",
      dangerMode: true,
    })});
  }
  let fileInput;
 

  return (
    <>
    <div className="mysite">
    <div class="postform">
        <h1>Add Product</h1>
        <form  >
      <div class="upload-box"  onClick={()=>fileInput.click()}>
        <input type="file"  accept="image/*" id="postinp" 
                name="images"
                multiple
                onChange={handleImageChange}
 ref={(e)=>{fileInput=e}} hidden/>
        <div className="imageList">
        {product.imagePreviews.length > 0 && (
    <div className="flex  gap-2 overflow-x-auto">
      {product.imagePreviews.map((preview, index) => (
        <img
          key={index}
          src={preview}
          alt={`Preview ${index + 1}`}
          className="w-32 h-32 object-cover rounded"
        />
      ))}
  </div>
)}

        </div>
        <img src="https://www.codingnepalweb.com/demos/resize-and-compress-image-javascript/upload-icon.svg" alt="" id="postimage"/>
        <p>Browse File to Upload Product Image</p>
      </div>
      <div className="content">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
       {/* Name */}
       <div>
              <label className="block text-lg font-medium mb-1">Product Name</label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChangeAddProduct}
                className="w-full h-12 px-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter product name"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-lg font-medium mb-1">Price</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChangeAddProduct}
                className="w-full h-12 px-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter product price"
              />
            </div>

            {/* Brand */}
            <div>
              <label className="block text-lg font-medium mb-1">Brand</label>
              <input
                type="text"
                name="brand"
                value={product.brand}
                onChange={handleChangeAddProduct}
                className="w-full h-12 px-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter product brand"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-lg font-medium mb-1">Category</label>
              <select
                name="category"
                value={product.category}
                onChange={handleChangeAddProduct}
                className="w-full h-12 px-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              >
                <option value='' className=' text-slate-500'>Select Category</option>
                {
                  Object.keys(categories).map((pcategory)=><option value={pcategory} className=' text-slate-500'>{pcategory}</option>)
                }
              </select>
            </div>

            {/* Sub-Category */}
            <div className='sm:col-[span_2/span_2]'>
              <label className="block text-lg font-medium mb-1">Sub-Category</label>
              <select
                name="subCategory"
                value={product.subCategory}
                onChange={handleChangeAddProduct}
                disabled={product.category === ''}
                className="w-full h-12 px-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              >
               <option value='' className=' text-slate-500'>Select sub-Category</option>
                {
                  product.category !== '' && categories[product.category].map((scategory)=><option value={scategory} className=' text-slate-500'>{scategory}</option>)
                }
                </select>
            </div>

            

         
                {/* Stock */}
                <div>
              <label className="block text-lg font-medium mb-1">Stock</label>
              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChangeAddProduct}
                className="w-full h-12 px-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter stock quantity"
              />
            </div>

            <div className=" sm:col-span-2">
        <label className="block text-lg font-medium mb-1">Sizes</label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={sizeInput}
            onChange={(e) => setSizeInput(e.target.value)}
            placeholder="Add a size"
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
          <button
            onClick={addSize}
            className="bg-purple-500 text-white px-3 py-2 rounded-lg hover:bg-purple-600"
          >
            Add
          </button>
        </div>

        {/* Display sizes as tags */}
        {sizes.length > 0 && (
          <div className="mt-2 flex gap-2 flex-wrap">
            {sizes.map((size, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-200 px-3 py-1 rounded-lg text-sm"
              >
                {size}
                <button
                  onClick={() => removeSize(index)}
                  className="ml-2 text-red-600 font-bold"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Colors Input Section */}
      <div className=" col-span-2">
      <label className="block text-lg font-medium mb-1">Colors</label>
      
      {/* Input field with dropdown suggestions */}
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type to select or add colors"
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
        
        {/* Dropdown list */}
        {inputValue && filteredOptions.length > 0 && (
          <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-md z-10 mt-1 max-h-40 overflow-y-auto">
            {filteredOptions.map((color) => (
              <li
                key={color}
                onClick={() => addTag(color)}
                className="p-2 cursor-pointer hover:bg-gray-100"
              >
                {color}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Display selected tags */}
      <div className="mt-2 flex gap-2 flex-wrap">
        {selectedColors.map((color, index) => (
          <div key={index} className="flex items-center bg-gray-200 px-3 py-1 rounded-lg text-sm">
            {color}
            <button
              onClick={() => removeTag(color)}
              className="ml-2 text-red-600 font-bold"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
        

            {/* Description */}
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-lg font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChangeAddProduct}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter product description"
                rows="4"
              ></textarea>
            </div>
      </div>
      <button type='submit' className=' w-full bg-[#927DFC] text-white font-semibold py-3 rounded mt-6 transition-colors ' onClick={handleformdata}>Submit</button>
      </div>
      <button type="reset" ref={resetBtn} hidden></button>
    </form>
    </div>
    </div>
    </>

  )
}
