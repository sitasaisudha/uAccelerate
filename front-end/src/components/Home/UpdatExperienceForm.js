import React, { useState } from 'react';
import { useContext } from "react"; //using context api
import { MyContext } from "../../context/MyContext";
import "./ProfileForm.css";
function UpdateExperienceForm() {
    const { isProfile, setProfil } = useContext(MyContext);
    const { isExperience, setExperience } = useContext(MyContext);
    const { experienceUpdated, setExperienceUpdated } = useContext(MyContext);
    const [formData, setFormData] = useState({
        companyName: '',
        position: '',
        startDate: '',
        endDate: '',
        industry: '',
        functionAreas: [], // Initialize functionAreas as an empty array
    });

    const [allSelectedFunctionAreas, setAllSelectedFunctionAreas] = useState([]); // State to store all selected function areas

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFunctionAreasChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        const updatedFunctionAreas = [...formData.functionAreas, ...selectedOptions]; // Combine previously selected options with currently selected options
        setAllSelectedFunctionAreas(updatedFunctionAreas); // Update state to store all selected function areas

        setFormData({
            ...formData,
            functionAreas: updatedFunctionAreas
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            setExperience(true);
            setExperienceUpdated(true);
            setFormData({
                companyName: '',
                position: '',
                startDate: '',
                endDate: '',
                industry: '',
                functionAreas: [],
            });
            setAllSelectedFunctionAreas([]); // Clear all selected function areas after form submission
        }
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        // Validation logic remains the same

        setErrors(newErrors);
        return isValid;
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2>Update Experience Form</h2>
            {/* Your other input fields */}
            <label>
                Function Areas (Max 6): 
                <div className='functionAreas'>
        {allSelectedFunctionAreas.map((area, index) => (
            <div key={index} className='farea'>{area}</div>
        ))}
    </div>
                <select
                    name="functionAreas"
                    multiple={true}
                    value={formData.functionAreas}
                    onChange={handleFunctionAreasChange}
                >
                    <option value="HR">HR</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="Finance">Finance</option>
                    <option value="IT">IT</option>
                    <option value="Operations">Operations</option>
                </select>
                {errors.functionAreas && <span className="error-message">{errors.functionAreas}</span>}
            </label>

          
            

            <div className='submit-row'>
                <p> <i className="ri-flashlight-line"></i> You can update details later in profile section</p>
                <div className='btn-grp'>
                    <button className='submit-btn'> Continue</button>
                </div>
            </div>
        </form>
    );
}

export default UpdateExperienceForm;
