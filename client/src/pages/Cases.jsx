// Import standard Redux hooks instead of custom hooks
import { useDispatch, useSelector } from 'react-redux';

// Import Redux state and actions
import {
    selectFilteredCases,
    selectViewType,
    selectSearchQuery,
    setViewType,
    setSearchQuery,
} from '../features/cases/slice/casesSlice';

// Main Cases component
const Cases = () => {
    // Use standard Redux hooks
    const dispatch = useDispatch();
    const cases = useSelector(selectFilteredCases);
    const viewType = useSelector(selectViewType);
    const searchQuery = useSelector(selectSearchQuery);

    // Handler to change view type (table, card, or list)
    const handleViewChange = (type) => {
        dispatch(setViewType(type));
    };

    // Handler for search input changes
    const handleSearch = (e) => {
        dispatch(setSearchQuery(e.target.value));
    };

    // Rest of the component remains the same...
    const renderCases = () => {
        switch (viewType) {
            case 'table':
                return (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left border-b border-primary/10">
                                    <th className="p-4">Case Number</th>
                                    <th className="p-4">Subject</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Priority</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cases.map((case_) => (
                                    <tr
                                        key={case_.id}
                                        className="border-b border-primary/10 hover:bg-primary/5"
                                    >
                                        <td className="p-4">
                                            {case_.caseNumber}
                                        </td>
                                        <td className="p-4">{case_.subject}</td>
                                        <td className="p-4">{case_.status}</td>
                                        <td className="p-4">
                                            {case_.priority}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );

            case 'card':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {cases.map((case_) => (
                            <div
                                key={case_.id}
                                className="p-4 rounded-lg border border-primary/10 hover:border-primary/30 
                                         transition-colors"
                            >
                                <h3 className="font-semibold mb-2">
                                    {case_.subject}
                                </h3>
                                <p className="text-sm text-gray-400">
                                    Case #: {case_.caseNumber}
                                </p>
                                <p className="text-sm text-gray-400">
                                    Status: {case_.status}
                                </p>
                                <p className="text-sm text-gray-400">
                                    Priority: {case_.priority}
                                </p>
                            </div>
                        ))}
                    </div>
                );

            case 'list':
                return (
                    <div className="space-y-4">
                        {cases.map((case_) => (
                            <div
                                key={case_.id}
                                className="flex justify-between items-center p-4 rounded-lg 
                                         border border-primary/10 hover:border-primary/30 
                                         transition-colors"
                            >
                                <div>
                                    <h3 className="font-semibold">
                                        {case_.subject}
                                    </h3>
                                    <p className="text-sm text-gray-400">
                                        Case #: {case_.caseNumber}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-400">
                                        Status: {case_.status}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        Priority: {case_.priority}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header section with title, search, and view toggles */}
            <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
                <h1 className="text-2xl font-semibold text-white">Cases</h1>

                {/* Search input */}
                <div className="w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="Search cases..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="w-full md:w-64 px-4 py-2 rounded-lg bg-dark-surface 
                                 border border-primary/10 focus:border-primary 
                                 focus:outline-none transition-colors"
                    />
                </div>

                {/* View toggle buttons */}
                <div className="flex gap-2">
                    <button
                        onClick={() => handleViewChange('table')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            viewType === 'table'
                                ? 'bg-primary text-white'
                                : 'bg-dark-surface hover:bg-primary/10'
                        }`}
                    >
                        Table
                    </button>
                    <button
                        onClick={() => handleViewChange('card')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            viewType === 'card'
                                ? 'bg-primary text-white'
                                : 'bg-dark-surface hover:bg-primary/10'
                        }`}
                    >
                        Cards
                    </button>
                    <button
                        onClick={() => handleViewChange('list')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            viewType === 'list'
                                ? 'bg-primary text-white'
                                : 'bg-dark-surface hover:bg-primary/10'
                        }`}
                    >
                        List
                    </button>
                </div>
            </div>

            {/* Cases content container */}
            <div className="bg-dark-surface rounded-lg p-6 border border-primary/10">
                {cases.length === 0 ? (
                    <p className="text-center text-gray-400">
                        No cases found. Add your first case to get started.
                    </p>
                ) : (
                    renderCases()
                )}
            </div>
        </div>
    );
};

export default Cases;