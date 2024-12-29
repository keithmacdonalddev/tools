// features/cases/components/CaseTable.jsx

import {
    IconArrowUp,
    IconArrowDown,
    IconEdit,
    IconTrash,
} from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { deleteCase } from '../slice/casesSlice';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const CaseTable = ({ cases, sortField, sortDirection, onSort }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Column definitions
    const columns = [
        { id: 'caseNumber', label: 'Case Number' },
        { id: 'subject', label: 'Subject' },
        { id: 'businessName', label: 'Business Name' },
        { id: 'contactName', label: 'Contact Name' },
        { id: 'createdAt', label: 'Created At' },
    ];

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
        <div className="overflow-x-auto rounded-lg border border-gray-700">
            <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.id}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 
                                         uppercase tracking-wider cursor-pointer hover:bg-gray-700"
                                onClick={() => onSort(column.id)}
                            >
                                <div className="flex items-center space-x-1">
                                    <span>{column.label}</span>
                                    {sortField === column.id &&
                                        (sortDirection === 'asc' ? (
                                            <IconArrowUp size={14} />
                                        ) : (
                                            <IconArrowDown size={14} />
                                        ))}
                                </div>
                            </th>
                        ))}
                        <th
                            className="px-6 py-3 text-right text-xs font-medium text-gray-300 
                                     uppercase tracking-wider"
                        >
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-gray-900 divide-y divide-gray-700">
                    {cases.map((caseItem) => (
                        <tr
                            key={caseItem.id}
                            className="hover:bg-gray-800 transition-colors duration-200"
                        >
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                {caseItem.caseNumber}
                            </td>
                            <td className="px-6 py-4 text-sm text-white">
                                {caseItem.subject}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                {caseItem.businessName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                {caseItem.contactName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                {formatDate(caseItem.createdAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                                <div className="flex justify-end space-x-2">
                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/cases/edit/${caseItem.id}`
                                            )
                                        }
                                        className="p-1 text-blue-400 hover:text-blue-300 
                                                 transition-colors duration-200"
                                        title="Edit Case"
                                    >
                                        <IconEdit size={18} />
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDelete(caseItem.id)
                                        }
                                        className="p-1 text-red-400 hover:text-red-300 
                                                 transition-colors duration-200"
                                        title="Delete Case"
                                    >
                                        <IconTrash size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

CaseTable.propTypes = {
    cases: PropTypes.array.isRequired,
    sortField: PropTypes.string.isRequired,
    sortDirection: PropTypes.string.isRequired,
    onSort: PropTypes.func.isRequired,
};

export default CaseTable;
