import React, { useState } from 'react';
import axios from 'axios';

const AdminSlideUpload = () => {
    const [imageFiles, setImageFiles] = useState([]); // Store image files instead of names
    const [links, setLinks] = useState([]);
    const [section, setSection] = useState("Hero");
    const [message, setMessage] = useState("");
    const [loading,setLoading]=useState(false);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles(files); // Store actual files for upload
    };

    const handleLinksChange = (e) => {
        setLinks(e.target.value.split(','));
    };

    const uploadToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'slides_preset');// Replace with your Cloudinary upload preset

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/dphocopji/image/upload', formData);
            return response.data.secure_url; 
        } catch (error) {
            console.error("Error uploading image: ", error);
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (!imageFiles.length || !links.length || !section) {
            console.log("All fields are required.", imageFiles.length, links.length, section);
            return;
        }

        try {
            // Upload each image to Cloudinary and get its URL
            const uploadedImageUrls = await Promise.all(imageFiles.map(file => uploadToCloudinary(file)));

            const data = { links, images: uploadedImageUrls, section };

            const response = await axios.post('http://localhost:3000/api/v1/home', data, {
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmNjOWVmMGU5OThiNzIyODAzMGJmZjUiLCJpYXQiOjE3MjU0MjYzNDl9.VhkU0harZMN7a650709DO4G1VS0GbjmAyKsokfplfyE" // Replace with your actual JWT token
                }
            });

            setMessage("Slide uploaded successfully!");
            console.log(response.data);
        } catch (error) {
            setMessage("Error uploading slide: " + (error.response ? error.response.data.message : error.message));
        }
        finally{
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-xl font-bold mb-4">Upload New Slide</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">
                            Slide Images (Upload multiple)
                        </label>
                        <input
                            type="file"
                            multiple
                            onChange={handleImageChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="links">
                            Links (Comma-separated)
                        </label>
                        <input
                            type="text"
                            onChange={handleLinksChange}
                            placeholder="Enter comma-separated links"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="section">
                            Section
                        </label>
                        <select
                            value={section}
                            onChange={(e) => setSection(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="Hero">Hero</option>
                            <option value="Grand Global">Grand Global</option>
                            <option value="Medal Worthy">Medal Worthy</option>
                        </select>
                    </div>

                    <div className="flex items-center justify-between">
                       {
                            !loading?
                            <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Upload Slide
                        </button>:
                         <button
                         disabled
                         type="submit"
                         className="bg-slate-500  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                     >
                         Upload Slide
                     </button>
                       }
                    </div>
                </form>

                {message && <p className="text-red-500 mt-4">{message}</p>}
            </div>
        </div>
    );
};

export default AdminSlideUpload;
