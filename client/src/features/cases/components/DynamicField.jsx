// features/cases/components/DynamicField.jsx

import PropTypes from 'prop-types';

const DynamicField = ({ field, value, onChange, error }) => {
    // Determine which type of input to render based on the field type
    const renderField = () => {
        switch (field.type) {
            case 'textarea':
                return (
                    <textarea
                        id={field.id}
                        name={field.id}
                        value={value || ''}
                        onChange={(e) => onChange(field.id, e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg bg-gray-800 border-gray-700 
                            text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent
                            ${error ? 'border-red-500' : ''}`}
                        rows={4}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                );

            case 'text':
            default:
                return (
                    <input
                        type="text"
                        id={field.id}
                        name={field.id}
                        value={value || ''}
                        onChange={(e) => onChange(field.id, e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg bg-gray-800 border-gray-700 
                            text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent
                            ${error ? 'border-red-500' : ''}`}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                );
        }
    };

    return (
        <div className="mb-4">
            <label
                htmlFor={field.id}
                className="block mb-2 text-sm font-medium text-gray-200"
            >
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {renderField()}
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
};

DynamicField.propTypes = {
    field: PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        required: PropTypes.bool,
    }).isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
};

export default DynamicField;
