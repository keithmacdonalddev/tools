// features/cases/components/CaseFieldManager.jsx

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addCustomField,
    removeCustomField,
    selectFieldDefinitions,
} from '../slice/casesSlice';

const CaseFieldManager = () => {
    const dispatch = useDispatch();
    const allFields = useSelector(selectFieldDefinitions);
    const [showAddField, setShowAddField] = useState(false);
    const [newField, setNewField] = useState({
        id: '',
        label: '',
        type: 'text',
        required: false,
    });

    // Handle input changes for new field
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewField((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
            // Generate ID from label (lowercase, no spaces)
            id:
                name === 'label'
                    ? value.toLowerCase().replace(/\s+/g, '_')
                    : prev.id,
        }));
    };

    // Handle form submission for new field
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate that we don't already have a field with this ID
        if (allFields.some((field) => field.id === newField.id)) {
            alert('A field with this name already exists');
            return;
        }

        dispatch(addCustomField(newField));
        setNewField({ id: '', label: '', type: 'text', required: false });
        setShowAddField(false);
    };

    // Handle removing a custom field
    const handleRemoveField = (fieldId) => {
        if (confirm('Are you sure you want to remove this field?')) {
            dispatch(removeCustomField(fieldId));
        }
    };

    return (
        <div className="mb-6 p-4 bg-gray-800 rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">
                    Custom Fields
                </h3>
                <button
                    onClick={() => setShowAddField(!showAddField)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 
                             transition-colors duration-200"
                >
                    {showAddField ? 'Cancel' : 'Add New Field'}
                </button>
            </div>

            {showAddField && (
                <form
                    onSubmit={handleSubmit}
                    className="mb-4 p-4 bg-gray-700 rounded-lg"
                >
                    <div className="grid gap-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-200">
                                Field Label
                            </label>
                            <input
                                type="text"
                                name="label"
                                value={newField.label}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg 
                                         text-white focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-200">
                                Field Type
                            </label>
                            <select
                                name="type"
                                value={newField.type}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg 
                                         text-white focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="text">Text</option>
                                <option value="textarea">Text Area</option>
                            </select>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="required"
                                checked={newField.required}
                                onChange={handleInputChange}
                                className="w-4 h-4 text-purple-600 border-gray-600 rounded 
                                         focus:ring-purple-500"
                            />
                            <label className="ml-2 text-sm font-medium text-gray-200">
                                Required Field
                            </label>
                        </div>
                    </div>

                    <div className="mt-4">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 
                                     transition-colors duration-200"
                        >
                            Add Field
                        </button>
                    </div>
                </form>
            )}

            {/* Display custom fields */}
            <div className="space-y-2">
                {allFields
                    .filter((field) => !field.isDefault)
                    .map((field) => (
                        <div
                            key={field.id}
                            className="flex justify-between items-center p-3 bg-gray-700 rounded-lg"
                        >
                            <div>
                                <span className="text-white font-medium">
                                    {field.label}
                                </span>
                                <span className="ml-2 text-sm text-gray-400">
                                    ({field.type})
                                </span>
                            </div>
                            <button
                                onClick={() => handleRemoveField(field.id)}
                                className="px-3 py-1 text-sm text-red-400 hover:text-red-300 
                                     transition-colors duration-200"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default CaseFieldManager;
