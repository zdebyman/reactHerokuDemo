import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchGratitude, updateGratitude } from "../../services/gratitudeService";
import GratitudeForm from "./GratitudeForm";
import { objectToFormData } from "../../utils/formDataHelper";

function EditGratitudeForm() {
  const [gratitude, setGratitude] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the current gratitude by id
    const fetchCurrentGratitude = async () => {
      try {
        const json = await fetchGratitude(id);
        setGratitude(json);
      } catch (e) {
        console.error("Failed to fetch the gratitude: ", e);
      }
    };
    fetchCurrentGratitude();
  }, [id]);

  const handleUpdateSubmit = async (rawData) => {
    const sanitizedData = {
      title: rawData.title,
      prompt1: rawData.prompt1,
      prompt2: rawData.prompt2,
      prompt3: rawData.prompt3,
      answer1: rawData.answer1,
      answer2: rawData.answer2,
      answer3: rawData.answer3,
      image: rawData.image,
    };
    const formData = objectToFormData({ gratitude: sanitizedData });
    try {
      await updateGratitude(id, formData);
      navigate(`/gratitudes/${id}`);
    } catch (e) {
      console.error("Failed to update the gratitude: ", e);
    }
  };

  if (!gratitude) return <h2>Loading...</h2>;

  return (
    <GratitudeForm
      gratitude={gratitude}
      onSubmit={handleUpdateSubmit}
      headerText="Edit Gratitude"
      buttonText="Update Gratitude"
    />
  );
}

export default EditGratitudeForm;