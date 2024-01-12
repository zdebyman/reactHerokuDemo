import { useNavigate } from "react-router-dom";
import { createGratitude } from "../../services/gratitudeService";
import GratitudeForm from "./GratitudeForm";
import { objectToFormData } from "../../utils/formDataHelper";
import { API_URL } from "../../constants";
function NewGratitudeForm() {
  const navigate = useNavigate();

  const handleCreateSubmit = async (rawData) => {
    try {
      console.log("handleCreateSubmit + " + API_URL )
      const formData = objectToFormData({ gratitude: rawData });
      const response = await createGratitude(formData);
      navigate(`/gratitudes/${response.id}`);
    } catch (e) {
      console.error("Failed to create gratitude: ", e);
    }
  };

  return (
    <GratitudeForm
      headerText="Today's Gratitude"
      onSubmit={handleCreateSubmit}
      buttonText="Add"
    />
  );
}

export default NewGratitudeForm;
