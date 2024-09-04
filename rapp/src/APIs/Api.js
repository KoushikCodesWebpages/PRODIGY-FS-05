import axios from 'axios';

export const searchProducts = async (query) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/products/?search=${query}`);
    return response.data.results; // Assuming your API returns an object with a 'results' key
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error;
  }
};


export const getProductById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/products/${id}/`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};


// You can add other API functions as needed, such as createProduct, updateProduct, deleteProduct, etc.
