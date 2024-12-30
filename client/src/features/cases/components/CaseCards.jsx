// features/cases/components/CaseCards.jsx

import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { deleteCase } from '../slice/casesSlice';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const CaseCards = ({ cases }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
                    <div className="p-4">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex-1 min-w-0 mr-4">
                                {/* Case number with truncation */}
                                <p className="text-sm text-gray-400 truncate">
                                    Case #{caseItem.caseNumber}
                                </p>
                                {/* Subject with multi-line truncation */}
                                <h3 className="text-lg font-semibold text-white mt-1 line-clamp-2">
                                    {caseItem.subject}
                                </h3>
                            </div>
                            <div className="flex space-x-2 flex-shrink-0">
                                <button
                                    onClick={() =>
                                        navigate(`/cases/edit/${caseItem.id}`)
                                    }
                                    className="p-1 text-blue-400 hover:text-blue-300 
                                             transition-colors duration-200"
                                    title="Edit Case"
                                >
                                    <IconEdit size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(caseItem.id)}
                                    className="p-1 text-red-400 hover:text-red-300 
                                             transition-colors duration-200"
                                    title="Delete Case"
                                >
                                    <IconTrash size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-sm text-gray-400">
                            <span className="truncate max-w-[120px]">
                                {caseItem.department}
                            </span>
                            <span className="truncate max-w-[80px]">
                                {caseItem.status}
                            </span>
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
