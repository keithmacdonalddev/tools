// features/cases/components/CaseTable.jsx

import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { deleteCase } from '../slice/casesSlice';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const CaseTable = ({ cases, sortField, sortDirection, onSort }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Column definitions with specific widths for consistent sizing
    const columns = [
        { id: 'caseNumber', label: 'Case #', width: 'w-[100px]' }, // Fixed width for case numbers
        { id: 'subject', label: 'Subject', width: 'w-full' }, // Takes remaining space
        { id: 'department', label: 'Department', width: 'w-[100px]' }, // Fixed width for department
        { id: 'status', label: 'Status', width: 'w-[80px]' }, // Fixed width for status
        { id: 'actions', label: '', width: 'w-[80px]' }, // Fixed width for action icons
    ];

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
                                className={`px-4 py-3 text-left text-xs font-medium text-gray-300 
                                         uppercase tracking-wider ${
                                             column.width
                                         } 
                                         ${
                                             column.id !== 'actions'
                                                 ? 'cursor-pointer hover:bg-gray-700'
                                                 : ''
                                         }`}
                                onClick={() =>
                                    column.id !== 'actions' && onSort(column.id)
                                }
                            >
                                <div className="flex items-center space-x-1">
                                    <span className="truncate">
                                        {column.label}
                                    </span>
                                    {sortField === column.id &&
                                        column.id !== 'actions' && (
                                            <span>
                                                {sortDirection === 'asc'
                                                    ? '↑'
                                                    : '↓'}
                                            </span>
                                        )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-gray-900 divide-y divide-gray-700">
                    {cases.map((caseItem) => (
                        <tr
                            key={caseItem.id}
                            className="hover:bg-gray-800 transition-colors duration-200"
                        >
                            {/* Case Number - truncate if over 10 digits */}
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-white">
                                <span className="inline-block w-[100px] truncate">
                                    {caseItem.caseNumber}
                                </span>
                            </td>

                            {/* Subject - allows wrapping with ellipsis */}
                            <td className="px-4 py-2 text-sm text-white">
                                <div className="line-clamp-2">
                                    {caseItem.subject}
                                </div>
                            </td>

                            {/* Department - fixed width with truncation */}
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-white">
                                <span className="inline-block w-[100px] truncate">
                                    {caseItem.department}
                                </span>
                            </td>

                            {/* Status - fixed width with truncation */}
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-white">
                                <span className="inline-block w-[80px] truncate">
                                    {caseItem.status}
                                </span>
                            </td>

                            {/* Action Icons */}
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-right">
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
                                        <IconEdit size={16} />
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDelete(caseItem.id)
                                        }
                                        className="p-1 text-red-400 hover:text-red-300 
                                                 transition-colors duration-200"
                                        title="Delete Case"
                                    >
                                        <IconTrash size={16} />
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
