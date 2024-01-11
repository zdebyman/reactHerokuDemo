import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteGratitude, fetchAllGratitudes } from "../../services/gratitudeService";
import "../../assets/css/GratitudeImage.css";

function GratitudesList() {
  const [gratitudes, setGratitudes] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);

  useEffect(() => {
    async function loadGratitudes() {
      try {
        const data = await fetchAllGratitudes();
        setGratitudes(data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
        console.error("Failed to fetch gratitudes");
      }
    }
    loadGratitudes();
  }, []);

  const deleteGratitudeHandler = async (id) => {
    try {
      await deleteGratitude(id);
      setGratitudes(gratitudes.filter((gratitude) => gratitude.id !== id));
    } catch (e) {
      console.error("Failed to delete the gratitude: ", e);
    }
  };

  return (
  <div>
    {gratitudes.map(gratitude => (
        <div key={gratitude.id} className="gratitude-container">
          <h2>
            <Link to={`/gratitudes/${gratitude.id}`} className="gratitude-title">
              {gratitude.title}
            </Link>
          </h2>
          <div className="gratitude-image-container">
            {gratitude.image_url ? (
              <img
                src={gratitude.image_url}
                alt={gratitude.title}
                className="gratitude-image"
              />
            ) : (
              <div className="gratitude-image-stub" />
            )}
          </div>
          <div className="gratitude-links">
            <Link to={`/gratitudes/${gratitude.id}/edit`}>Edit</Link>
            {" | "}
            <button onClick={() => deleteGratitudeHandler(gratitude.id)}>Delete</button>
          </div>
        </div>
    ))} 
  </div>);
}

export default GratitudesList;
