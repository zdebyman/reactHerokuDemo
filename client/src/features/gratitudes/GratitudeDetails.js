import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { deleteGratitude, fetchGratitude } from "../../services/gratitudeService";

function GratitudeDetails() {
  const [gratitude, setGratitude] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentGratitude = async () => {
      try {
        const json = await fetchGratitude(id);
        setGratitude(json);
      } catch (error) {
        console.error("Failed to fetch the gratitude: ", error);
      }
    };
    fetchCurrentGratitude();
  }, [id]);

  const deleteGratitudeHandler = async () => {
    try {
      await deleteGratitude(gratitude.id);
      navigate("/");
    } catch (error) {
      console.error("Failed to delete the gratitude: ", error);
    }
  };

  if (!gratitude) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>{gratitude.title}</h2>
      <img src={gratitude.image_url} alt={gratitude.title} className="gratitude-image" />
      <p>{gratitude.prompt1 + " " + gratitude.answer1}</p>
      <p>{gratitude.prompt2 + " " + gratitude.answer2}</p>
      <p>{gratitude.prompt3 + " " + gratitude.answer3}</p>
      <Link to={`/gratitudes/${gratitude.id}/edit`}>Edit</Link>
      {" | "}
      <Link to="/">Back to Gratitudes</Link>
      {" | "}
      <button onClick={deleteGratitudeHandler}>Delete</button>
    </div>
  );
}

export default GratitudeDetails;
