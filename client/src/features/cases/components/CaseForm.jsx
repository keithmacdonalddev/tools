// features/cases/components/CaseForm.jsx

// Import necessary dependencies
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addCase, selectFieldDefinitions } from '../slice/casesSlice';
import DynamicField from './DynamicField';
import CaseFieldManager from './CaseFieldManager';
import PropTypes from 'prop-types';

const CaseForm = ({ onCreated }) => {
    // Initialize Redux dispatch and get field definitions from the store
    const dispatch = useDispatch();
    const fieldDefinitions = useSelector(selectFieldDefinitions);

    // Set up local state for form management
    const [formData, setFormData] = useState({
        status: 'open', // Set default status
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showFieldManager, setShowFieldManager] = useState(false);

    // Handle changes in form fields
    const handleFieldChange = (fieldId, value) => {
        // Log field change for debugging
        console.log(`Field ${fieldId} changed to:`, value);

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

    // Validate form data before submission
    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        // Log validation start
        console.log('Validating form data:', formData);

        fieldDefinitions.forEach((field) => {
            if (
                field.required &&
                (!formData[field.id] || !formData[field.id].trim())
            ) {
                newErrors[field.id] = `${field.label} is required`;
                isValid = false;
            }

            // Validate case number format
            if (field.id === 'caseNumber' && formData[field.id]) {
                const caseNumberPattern = /^[A-Za-z0-9-]+$/;
                if (!caseNumberPattern.test(formData[field.id])) {
                    newErrors[field.id] =
                        'Case number can only contain letters, numbers, and hyphens';
                    isValid = false;
                }
            }
        });

        // Log validation results
        console.log('Validation errors:', newErrors);
        console.log('Form is valid:', isValid);

        setErrors(newErrors);
        return isValid;
    };

    // Handle form reset
    const handleReset = () => {
        setFormData({ status: 'open' }); // Reset with default status
        setErrors({});
        toast.info('Form has been reset');
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Don't submit if already processing
        if (isSubmitting) return;

        // Log form submission attempt
        console.log('Attempting to submit form with data:', formData);

        if (!validateForm()) {
            toast.error('Please fill in all required fields correctly');
            return;
        }

        try {
            setIsSubmitting(true);

            // Create case data object matching server model
            const caseData = {
                ...formData,
                status: formData.status || 'open',
                createdAt: new Date().toISOString(),
            };

            // Log the final data being sent to the server
            console.log('Sending case data to server:', caseData);

            // Dispatch addCase action
            const response = await dispatch(addCase(caseData)).unwrap();

            // Log successful response
            console.log('Server response:', response);

            toast.success('Case created successfully!');
            handleReset(); // Reset form after successful submission
            // Call onCreated callback after successful creation
            if (onCreated) {
                onCreated();
            }
        } catch (error) {
            // Log detailed error information
            console.error('Case creation error:', error);

            // Display user-friendly error message
            toast.error(
                error.message || 'Failed to create case. Please try again.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white whitespace-nowrap">
                    Create New Case
                </h2>
                <button
                    onClick={() => setShowFieldManager(!showFieldManager)}
                    className="px-3 py-1 text-xs bg-gray-700 text-white rounded-lg 
                             hover:bg-gray-600 transition-colors duration-200"
                >
                    {showFieldManager ? 'Hide Fields' : 'Manage Fields'}
                </button>
            </div>

            {showFieldManager && <CaseFieldManager />}

            <form onSubmit={handleSubmit} className="space-y-4">
                {fieldDefinitions.map((field) => (
                    <DynamicField
                        key={field.id}
                        field={field}
                        value={formData[field.id] || ''}
                        onChange={handleFieldChange}
                        error={errors[field.id]}
                        disabled={isSubmitting}
                    />
                ))}

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={handleReset}
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-gray-700 text-white rounded-lg 
                                 hover:bg-gray-600 transition-colors duration-200
                                 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg 
                                 hover:bg-purple-700 transition-colors duration-200
                                 disabled:opacity-50 disabled:cursor-not-allowed
                                 flex items-center"
                    >
                        {isSubmitting ? (
                            <>
                                <span className="animate-spin mr-2">⚪</span>
                                Creating...
                            </>
                        ) : (
                            'Create Case'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

CaseForm.propTypes = {
    onCreated: PropTypes.func,
};

CaseForm.defaultProps = {
    onCreated: undefined,
};

export default CaseForm;
