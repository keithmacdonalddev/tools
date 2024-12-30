// features/cases/components/DynamicField.jsx

// Import PropTypes for type checking our component props
import PropTypes from 'prop-types';

// DynamicField component that renders different types of form inputs
// based on the field configuration passed to it
const DynamicField = ({ field, value, onChange, error, disabled }) => {
    // This function handles rendering different types of input fields
    // It returns the appropriate input element based on the field type
    const renderField = () => {
        // Get the base CSS classes that are common to all field types
        const baseClasses = `
            w-full px-3 py-2 
            border rounded-lg 
            bg-gray-800 
            ${error ? 'border-red-500' : 'border-gray-700'} 
            text-white 
            focus:ring-2 focus:ring-purple-500 focus:border-transparent
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors duration-200
        `;

        // Switch statement to handle different field types
        switch (field.type) {
            // For larger text input areas like descriptions
            case 'textarea':
                return (
                    <textarea
                        id={field.id}
                        name={field.id}
                        value={value}
                        onChange={(e) => onChange(field.id, e.target.value)}
                        className={baseClasses}
                        rows={4}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        disabled={disabled}
                        aria-invalid={error ? 'true' : 'false'}
                        aria-describedby={
                            error ? `${field.id}-error` : undefined
                        }
                    />
                );

            // For dropdown select inputs (department and status)
            case 'select':
                return (
                    <select
                        id={field.id}
                        name={field.id}
                        value={value}
                        onChange={(e) => onChange(field.id, e.target.value)}
                        className={baseClasses}
                        disabled={disabled}
                        aria-invalid={error ? 'true' : 'false'}
                        aria-describedby={
                            error ? `${field.id}-error` : undefined
                        }
                    >
                        {/* Add an empty option if no default value */}
                        {!field.defaultValue && (
                            <option value="">Select {field.label}</option>
                        )}

                        {/* Map through options array to create dropdown options */}
                        {field.options?.map((option) => (
                            <option key={option} value={option}>
                                {/* Capitalize first letter of each option */}
                                {option.charAt(0).toUpperCase() +
                                    option.slice(1)}
                            </option>
                        ))}
                    </select>
                );

            // Default case for regular text inputs
            case 'text':
            default:
                return (
                    <input
                        type="text"
                        id={field.id}
                        name={field.id}
                        value={value}
                        onChange={(e) => onChange(field.id, e.target.value)}
                        className={baseClasses}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        disabled={disabled}
                        aria-invalid={error ? 'true' : 'false'}
                        aria-describedby={
                            error ? `${field.id}-error` : undefined
                        }
                    />
                );
        }
    };

    // Return the complete field component with label and error message
    return (
        <div className="mb-4">
            {/* Field Label */}
            <label
                htmlFor={field.id}
                className={`
                    block mb-2 text-sm font-medium 
                    ${disabled ? 'text-gray-400' : 'text-gray-200'}
                `}
            >
                {field.label}
                {/* Show red asterisk for required fields */}
                {field.required && (
                    <span className="text-red-500 ml-1" aria-hidden="true">
                        *
                    </span>
                )}
            </label>

            {/* Render the appropriate input field */}
            {renderField()}

            {/* Error Message */}
            {error && (
                <p
                    id={`${field.id}-error`}
                    className="mt-1 text-sm text-red-500 animate-fadeIn"
                    role="alert"
                >
                    {error}
                </p>
            )}
        </div>
    );
};

// PropTypes for type checking and documentation
DynamicField.propTypes = {
    // field object must contain these properties
    field: PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        required: PropTypes.bool,
        options: PropTypes.arrayOf(PropTypes.string), // For select fields
        defaultValue: PropTypes.string, // For fields with default values
    }).isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    disabled: PropTypes.bool,
};

// Default props
DynamicField.defaultProps = {
    value: '',
    error: null,
    disabled: false,
};

export default DynamicField;
