// features/cases/components/CaseCards.jsx

import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { deleteCase } from '../slice/casesSlice';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const CaseCards = ({ cases }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Format date for display
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    // Handle delete case
    const handleDelete = (caseId) => {
        if (window.confirm('Are you sure you want to delete this case?')) {
            dispatch(deleteCase(caseId));
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((caseItem) => (
                <div
                    key={caseItem.id}
                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden 
                             hover:border-purple-500 transition-colors duration-200"
                >
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-1">
                                    {caseItem.subject}
                                </h3>
                                <p className="text-sm text-gray-400">
                                    Case #{caseItem.caseNumber}
                                </p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() =>
                                        navigate(`/cases/edit/${caseItem.id}`)
                                    }
                                    className="p-1 text-blue-400 hover:text-blue-300 
                                             transition-colors duration-200"
                                    title="Edit Case"
                                >
                                    <IconEdit size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(caseItem.id)}
                                    className="p-1 text-red-400 hover:text-red-300 
                                             transition-colors duration-200"
                                    title="Delete Case"
                                >
                                    <IconTrash size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div>
                                <label className="text-xs text-gray-400">
                                    Business Name
                                </label>
                                <p className="text-sm text-white">
                                    {caseItem.businessName}
                                </p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-400">
                                    Contact
                                </label>
                                <p className="text-sm text-white">
                                    {caseItem.contactName}
                                </p>
                            </div>
                            {caseItem.description && (
                                <div>
                                    <label className="text-xs text-gray-400">
                                        Description
                                    </label>
                                    <p className="text-sm text-white line-clamp-3">
                                        {caseItem.description}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-700">
                            <p className="text-xs text-gray-400">
                                Created: {formatDate(caseItem.createdAt)}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

CaseCards.propTypes = {
    cases: PropTypes.array.isRequired,
};

export default CaseCards;
