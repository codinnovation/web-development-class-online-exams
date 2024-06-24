import React, { useState } from "react";
import { ref, push, update } from "firebase/database";
import { db } from "../../firebase.config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddQuestionDb() {
  const [formData, setFormData] = useState({
    questionNumber: "",
    question: "",
    correctAnswer: "",
  });

  const [answerOptions, setAnswerOptions] = useState([""]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAnswerChange = (index, value) => {
    const updatedOptions = [...answerOptions];
    updatedOptions[index] = value;
    setAnswerOptions(updatedOptions);
  };

  const handleAddOption = () => {
    setAnswerOptions([...answerOptions, ""]);
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = answerOptions.filter((_, i) => i !== index);
    setAnswerOptions(updatedOptions);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newQuestionData = {
      ...formData,
      answers: answerOptions,
    };

    try {
      const newQuestionRef = push(ref(db, "examsQuestions"), newQuestionData);
      const newQuestionKey = newQuestionRef.key;
      toast.success("Question Submitted");
      // Optionally clear the form after submission
      setFormData({
        questionNumber: "",
        question: "",
        correctAnswer: "",
      });
      setAnswerOptions([""]);
      return newQuestionKey;
    } catch (error) {
      console.error("Error submitting question:", error);
      toast.error("Error Occurred");
    }
  };

  return (
    <>
      <div>
        <h2>Add New Question</h2>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="questionNumber">Question Number:</label>
            <input
              type="text"
              id="questionNumber"
              name="questionNumber"
              value={formData.questionNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="question">Question:</label>
            <input
              type="text"
              id="question"
              name="question"
              value={formData.question}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label>Answers:</label>
            {answerOptions.map((option, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  required
                />
                <button type="button" onClick={() => handleRemoveOption(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddOption}>
              Add Option
            </button>
          </div>

          <div>
            <label htmlFor="correctAnswer">Correct Answer:</label>
            <input
              type="text"
              id="correctAnswer"
              name="correctAnswer"
              value={formData.correctAnswer}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Submit Question</button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default AddQuestionDb;
