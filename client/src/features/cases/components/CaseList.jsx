// features/cases/components/CaseList.jsx

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllCases } from '../slice/casesSlice';
import CaseTable from './CaseTable';
import CaseCards from './CaseCards';
import { IconTable, IconLayoutGrid } from '@tabler/icons-react';

const CaseList = () => {
    // State for view type (table/cards) and search/filter
    const [viewType, setViewType] = useState('table');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('createdAt');
    const [sortDirection, setSortDirection] = useState('desc');

    // Get cases from Redux store
    const cases = useSelector(selectAllCases);

    // Filter cases based on search term
    const filteredCases = cases.filter((caseItem) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            caseItem.caseNumber?.toLowerCase().includes(searchLower) ||
            caseItem.subject?.toLowerCase().includes(searchLower) ||
            caseItem.businessName?.toLowerCase().includes(searchLower) ||
            caseItem.contactName?.toLowerCase().includes(searchLower)
        );
    });

    // Sort cases based on sort field and direction
    const sortedCases = [...filteredCases].sort((a, b) => {
        const aVal = a[sortField] ?? '';
        const bVal = b[sortField] ?? '';
        const direction = sortDirection === 'asc' ? 1 : -1;

        return aVal.toString().localeCompare(bVal.toString()) * direction;
    });

    // Toggle sort direction and field
    const handleSort = (field) => {
        if (field === sortField) {
            setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Header with controls */}
            <div className="mb-6 space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white">Cases</h2>
                    <div className="flex space-x-4">
                        {/* View toggle buttons */}
                        <button
                            onClick={() => setViewType('table')}
                            className={`p-2 rounded-lg transition-colors duration-200 
                                ${
                                    viewType === 'table'
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                            title="Table View"
                        >
                            <IconTable size={20} />
                        </button>
                        <button
                            onClick={() => setViewType('cards')}
                            className={`p-2 rounded-lg transition-colors duration-200
                                ${
                                    viewType === 'cards'
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                            title="Card View"
                        >
                            <IconLayoutGrid size={20} />
                        </button>
                    </div>
                </div>

                {/* Search input */}
                <div className="flex">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search cases..."
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg 
                                 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 
                                 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Display either table or card view */}
            {viewType === 'table' ? (
                <CaseTable
                    cases={sortedCases}
                    sortField={sortField}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                />
            ) : (
                <CaseCards cases={sortedCases} />
            )}

            {/* No results message */}
            {sortedCases.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-400">
                        {searchTerm
                            ? 'No cases match your search criteria'
                            : 'No cases have been created yet'}
                    </p>
                </div>
            )}
        </div>
    );
};

export default CaseList;
