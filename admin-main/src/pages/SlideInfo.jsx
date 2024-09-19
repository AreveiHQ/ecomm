import axios from "axios";
import { useEffect, useState } from "react";

const SlideInfo = () => {
  // State to store fetched slides data
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/home");
        setSlides(response.data); // Assuming the data is directly an array of slides
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleDelete=async(id)=>{
     try{
        const response = await axios.delete(`http://localhost:3000/api/v1/home/${id}`,{
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmNjOWVmMGU5OThiNzIyODAzMGJmZjUiLCJpYXQiOjE3MjU0MjYzNDl9.VhkU0harZMN7a650709DO4G1VS0GbjmAyKsokfplfyE" // Replace with your actual JWT token
            }
        });
        alert("deleted Sucessfully");
     }
     catch(err){
        console.log(err);
        
     }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Section Name</th>
            <th className="py-2 px-4 border-b">Images</th>
            <th className="py-2 px-4 border-b">Links</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {slides.length > 0 ? (
            slides.map((slide, index) => (
              <tr key={index} className="text-center">
                <td className="py-2 px-4 border-b">{slide.section}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex flex-wrap space-y-2">
                    {slide.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Slide ${idx + 1}`}
                        className="w-16 h-16 object-contain m-2"
                      />
                    ))}
                  </div>
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex flex-col space-y-2">
                    {slide.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </td>
                <td className="py-2 px-4 border-b">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-2">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" onClick={()=>{handleDelete(slide._id)}}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="py-4 px-4 border-b text-center" colSpan="4">
                No slides available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SlideInfo;
