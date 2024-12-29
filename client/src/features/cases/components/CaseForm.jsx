// features/cases/components/CaseForm.jsx

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCase, selectFieldDefinitions } from '../slice/casesSlice';
import DynamicField from './DynamicField';
import CaseFieldManager from './CaseFieldManager';

const CaseForm = () => {
    const dispatch = useDispatch();
    const fieldDefinitions = useSelector(selectFieldDefinitions);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [showFieldManager, setShowFieldManager] = useState(false);

    // Handle field value changes
    const handleFieldChange = (fieldId, value) => {
        setFormData((prev) => ({
            ...prev,
            [fieldId]: value,
        }));
        // Clear error for this field if it exists
        if (errors[fieldId]) {
            setErrors((prev) => ({
                ...prev,
                [fieldId]: null,
            }));
        }
    };

    // Validate form data
    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        fieldDefinitions.forEach((field) => {
            if (
                field.required &&
                (!formData[field.id] || !formData[field.id].trim())
            ) {
                newErrors[field.id] = `${field.label} is required`;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Add timestamp and ID to the case data
        const caseData = {
            ...formData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
        };

        dispatch(addCase(caseData));

        // Reset form
        setFormData({});

        // Show success message or redirect
        alert('Case created successfully!');
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">
                    Create New Case
                </h2>
                <button
                    onClick={() => setShowFieldManager(!showFieldManager)}
                    className="px-4 py-2 text-sm bg-gray-700 text-white rounded-lg 
                             hover:bg-gray-600 transition-colors duration-200"
                >
                    {showFieldManager ? 'Hide Field Manager' : 'Manage Fields'}
                </button>
            </div>

            {showFieldManager && <CaseFieldManager />}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {fieldDefinitions.map((field) => (
                        <DynamicField
                            key={field.id}
                            field={field}
                            value={formData[field.id]}
                            onChange={handleFieldChange}
                            error={errors[field.id]}
                        />
                    ))}
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => setFormData({})}
                        className="px-6 py-2 bg-gray-700 text-white rounded-lg 
                                 hover:bg-gray-600 transition-colors duration-200"
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-purple-600 text-white rounded-lg 
                                 hover:bg-purple-700 transition-colors duration-200"
                    >
                        Create Case
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CaseForm;
