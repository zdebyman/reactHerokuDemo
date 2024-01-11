import { useNavigate } from "react-router-dom";
import { createGratitude } from "../../services/gratitudeService";
import GratitudeForm from "./GratitudeForm";
import { objectToFormData } from "../../utils/formDataHelper";

function NewGratitudeForm() {
  const navigate = useNavigate();

  const handleCreateSubmit = async (rawData) => {
    try {
      const formData = objectToFormData({ gratitude: rawData });
      const response = await createGratitude(formData);
      navigate(`/gratitudes/${response.id}`);
    } catch (e) {
      console.error("Failed to create gratitude: ", e);
    }
  };

  return (
    <GratitudeForm
      headerText="Create a New Gratitude"
      onSubmit={handleCreateSubmit}
      buttonText="Create Gratitude"
    />
  );
}

export default NewGratitudeForm;
