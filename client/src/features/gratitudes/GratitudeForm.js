import { useState } from "react";
import PropTypes from "prop-types";
import '../../assets/css/GratitudeForm.css';
import getRandomPrompt from '../../services/promptsService';


function GratitudeForm({ gratitude, headerText, onSubmit, buttonText }) {
  const generateUniquePrompts = () => {
    let uniquePrompts = [];
    while (uniquePrompts.length < 3) {
      const newPrompt = getRandomPrompt();
      if (!uniquePrompts.includes(newPrompt)) {
        uniquePrompts.push(newPrompt);
      }
    }

    return { prompt1: uniquePrompts[0], prompt2: uniquePrompts[1], prompt3: uniquePrompts[2] }
  };

  const [formData, setFormData] = useState(
    gratitude || {
      title: new Date(Date.now()).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }),
      ...generateUniquePrompts(),
      answer1: "",
      answer2: "",
      answer3: "",
      image: null,
    }
  );

  const [imagePreviewUrl, setImagePreviewUrl] = useState(''); 

  const handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFormData({ ...formData, image: file });
      setImagePreviewUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <h2>{headerText}</h2>
      <form
        className="form-container"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(formData);
        }}
      >
        <div className="prompt-container">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            className="text-input"
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
          />
        </div>

        <div className="prompt-container">
          <label htmlFor="answer1">{formData.prompt1}</label>
          <textarea
            id="answer1"
            cols="60"
            rows="5"
            value={formData.answer1}
            onChange={(e) =>
              setFormData({
                ...formData,
                answer1: e.target.value,
              })
            }
          />
        </div>

        <div className="prompt-container">
            <label htmlFor="answer2">{formData.prompt2}</label>
            <textarea
              id="answer2"
              cols="60"
              rows="5"
              value={formData.answer2}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  answer2: e.target.value,
                })
              }
            />
        </div>
        <div className="prompt-container">
            <label htmlFor="answer3">{formData.prompt3}</label>
            <textarea
              id="answer3"
              cols="60"
              rows="5"
              value={formData.answer3}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  answer3: e.target.value,
                })
              }
            />
        </div>

        <div className="prompt-container">
          <label htmlFor="image">Picture of the day (optional)</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreviewUrl && (
            <img src={imagePreviewUrl} alt="Preview" className="gratitude-image" />
          )}
        </div>
        <div>
          <button type="submit" className="btn-submit">{buttonText}</button>
        </div>
      </form>
    </div>
  );
}

GratitudeForm.propTypes = {
  gratitude: PropTypes.shape({
    title: PropTypes.string.isRequired,
    answer1: PropTypes.string.isRequired,
    answer2: PropTypes.string.isRequired,
    answer3: PropTypes.string.isRequired,
  }),
  headerText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

GratitudeForm.defaultProps = {
  gratitude: null,
};

export default GratitudeForm;
