import axios from "axios";
import { useEffect, useState } from "react";

const SlideInfo = () => {
  // State to store fetched slides data
  const [slides, setSlides] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editLoad, setEditLoad] = useState(false);
  const [editSlideData, setEditSlideData] = useState({
    id: "",
    section: "",
    images: [],
    links: [],
  });

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

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/v1/home/${id}`, {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmNjOWVmMGU5OThiNzIyODAzMGJmZjUiLCJpYXQiOjE3MjU0MjYzNDl9.VhkU0harZMN7a650709DO4G1VS0GbjmAyKsokfplfyE" // Replace with your actual JWT token
        }
      });
      alert("deleted Sucessfully");
    }
    catch (err) {
      console.log(err);

    }
  }

  const handleEdit = (slide) => {
    setEditSlideData({
      id: slide._id,
      section: slide.section,
      images: slide.images,
      links: slide.links,
    });
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditSlideData((prev) => ({ ...prev, [name]: value }));
  };

  // Function to update slide on backend
  const handleUpdateSlide = async () => {
    setEditLoad(true);
    try {
      const { id, section, images, links } = editSlideData;
      const response = await axios.put(`http://localhost:3000/api/v1/home/${id}`, {
        section,
        images,
        links,
      }, {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmNjOWVmMGU5OThiNzIyODAzMGJmZjUiLCJpYXQiOjE3MjU0MjYzNDl9.VhkU0harZMN7a650709DO4G1VS0GbjmAyKsokfplfyE" // Replace with your actual JWT token
        }
      });
      alert("Slide updated successfully!");
      setEditMode(false);
      // Optionally, re-fetch slides to refresh UI
    } catch (err) {
      console.log(err);
    }
    finally {
      setEditLoad(false);
    }
  };

  return (

    <div className="overflow-x-auto relative">
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
            slides.map((slide) => (
              <tr key={slide._id} className="text-center">
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
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-2"
                    onClick={() => handleEdit(slide)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(slide._id)}
                  >
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

      {/* Edit Form */}
      {editMode && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg mb-4">Edit Slide</h3>
            <label className="block mb-2">Section Name</label>
            <input
              type="text"
              name="section"
              value={editSlideData.section}
              onChange={handleInputChange}
              disabled
              className="border border-gray-300 px-2 py-1 mb-4 w-full"
            />
            <label className="block mb-2">Links (comma-separated)</label>
            <input
              type="text"
              name="links"
              value={editSlideData.links.join(",")}
              onChange={(e) =>
                setEditSlideData((prev) => ({
                  ...prev,
                  links: e.target.value.split(","),
                }))
              }
              className="border border-gray-300 px-2 py-1 mb-4 w-full"
            />
            <div className="flex justify-between">
              {
                !editLoad ?
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={handleUpdateSlide}
                  >
                    Save
                  </button> :
                  <button
                    className="bg-slate-500 text-white px-4 py-2 rounded hover:bg-slate-600"
                    disabled
                  >
                    Saving...
                  </button>
              }
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlideInfo;
