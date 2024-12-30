// pages/Cases.jsx

// Import required dependencies from React and Redux
// useDispatch allows us to send actions to Redux store
// useSelector allows us to get data from Redux store
import { useDispatch, useSelector } from 'react-redux';

// Import React hooks for managing component state and lifecycle
import { useEffect, useState } from 'react';

// Import navigation hook from react-router-dom
import { useNavigate } from 'react-router-dom';

// Import icon components for our action buttons
import { IconEdit, IconTrash } from '@tabler/icons-react';

// Import all necessary Redux actions and selectors
import {
    selectFilteredCases,
    selectViewType,
    selectSearchQuery,
    selectCasesStatus,
    selectCasesError,
    setViewType,
    setSearchQuery,
    fetchCases,
    deleteCase,
} from '../features/cases/slice/casesSlice';

// Import the CaseForm component
import CaseForm from '../features/cases/components/CaseForm';

const Cases = () => {
    // Initialize hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get data from Redux store using selectors
    const cases = useSelector(selectFilteredCases);
    const viewType = useSelector(selectViewType);
    const searchQuery = useSelector(selectSearchQuery);
    const status = useSelector(selectCasesStatus);
    const error = useSelector(selectCasesError);

    // Local state for controlling form visibility
    const [showForm, setShowForm] = useState(false);

    // Fetch cases when component mounts
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCases());
        }
    }, [dispatch, status]);

    // Handler for changing view type
    const handleViewChange = (type) => {
        dispatch(setViewType(type));
    };

    // Handler for search input changes
    const handleSearch = (e) => {
        dispatch(setSearchQuery(e.target.value));
    };

    // Toggle form visibility
    const toggleForm = () => setShowForm((prev) => !prev);

    // Handler for successful case creation
    const handleCaseCreated = () => {
        setShowForm(false); // Close the form
    };

    // Handler for deleting cases
    const handleDelete = (caseId) => {
        if (window.confirm('Are you sure you want to delete this case?')) {
            dispatch(deleteCase(caseId));
        }
    };

    // Show loading state while fetching data
    if (status === 'loading') {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-primary">Loading cases...</div>
            </div>
        );
    }

    // Show error state if something went wrong
    if (status === 'failed') {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-red-500">Error: {error}</div>
            </div>
        );
    }

    // Function to render cases based on selected view type
    const renderCases = () => {
        switch (viewType) {
            case 'table':
                return (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left border-b border-primary/10">
                                    <th className="p-4 w-[100px]">Case #</th>
                                    <th className="p-4">Subject</th>
                                    <th className="p-4 w-[100px]">
                                        Department
                                    </th>
                                    <th className="p-4 w-[80px]">Status</th>
                                    <th className="p-4 w-[80px]">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cases.map((case_) => (
                                    <tr
                                        key={case_.id}
                                        className="border-b border-primary/10 hover:bg-primary/5"
                                    >
                                        <td className="p-4">
                                            <span className="truncate block">
                                                {case_.caseNumber}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="truncate">
                                                {case_.subject}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="truncate block">
                                                {case_.department}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className="truncate block">
                                                {case_.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex justify-end space-x-2">
                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/cases/edit/${case_.id}`
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
                                                        handleDelete(case_.id)
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

            case 'card':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {cases.map((case_) => (
                            <div
                                key={case_.id}
                                className="p-4 rounded-lg border border-primary/10 hover:border-primary/30 
                                         transition-colors"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-sm text-gray-400 truncate max-w-[100px]">
                                        Case #: {case_.caseNumber}
                                    </span>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/cases/edit/${case_.id}`
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
                                                handleDelete(case_.id)
                                            }
                                            className="p-1 text-red-400 hover:text-red-300 
                                                     transition-colors duration-200"
                                            title="Delete Case"
                                        >
                                            <IconTrash size={16} />
                                        </button>
                                    </div>
                                </div>
                                <h3 className="font-semibold mb-2 truncate">
                                    {case_.subject}
                                </h3>
                                <div className="flex justify-between text-sm text-gray-400">
                                    <span className="truncate max-w-[100px]">
                                        {case_.department}
                                    </span>
                                    <span className="truncate max-w-[80px]">
                                        {case_.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                );

            case 'list':
                return (
                    <div className="space-y-3">
                        {cases.map((case_) => (
                            <div
                                key={case_.id}
                                className="flex items-center p-4 rounded-lg 
                                         border border-primary/10 hover:border-primary/30 
                                         transition-colors bg-gray-800"
                            >
                                <div className="w-[100px] shrink-0">
                                    <span className="text-sm text-gray-400 truncate block">
                                        Case #{case_.caseNumber}
                                    </span>
                                </div>

                                <div className="flex-1 min-w-0 px-4">
                                    <h3 className="text-white truncate">
                                        {case_.subject}
                                    </h3>
                                </div>

                                <div className="w-[100px] shrink-0 text-right">
                                    <span className="text-sm text-gray-400 truncate block">
                                        {case_.department}
                                    </span>
                                </div>

                                <div className="w-[80px] shrink-0 text-right">
                                    <span className="text-sm text-gray-400 truncate block">
                                        {case_.status}
                                    </span>
                                </div>

                                <div className="w-[80px] shrink-0 ml-4 flex justify-end space-x-2">
                                    <button
                                        onClick={() =>
                                            navigate(`/cases/edit/${case_.id}`)
                                        }
                                        className="p-1 text-blue-400 hover:text-blue-300 
                                                 transition-colors duration-200"
                                        title="Edit Case"
                                    >
                                        <IconEdit size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(case_.id)}
                                        className="p-1 text-red-400 hover:text-red-300 
                                                 transition-colors duration-200"
                                        title="Delete Case"
                                    >
                                        <IconTrash size={16} />
                                    </button>
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
            <div className="flex flex-col lg:flex-row justify-between gap-4 items-start lg:items-center">
                <h1 className="text-2xl font-semibold text-white">Cases</h1>

                <div className="w-full lg:w-auto">
                    <input
                        type="text"
                        placeholder="Search cases..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="w-full lg:w-64 px-4 py-2 rounded-lg bg-dark-surface 
                                 border border-primary/10 focus:border-primary 
                                 focus:outline-none transition-colors"
                    />
                </div>

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
                    <button
                        onClick={toggleForm}
                        className="px-4 py-2 bg-primary text-white rounded-lg 
                                 hover:bg-primary-dark transition-colors"
                    >
                        {showForm ? 'Close Form' : 'Add New Case'}
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 min-h-0">
                {showForm && (
                    <div className="lg:w-1/2 min-w-[300px] max-w-[600px] h-[calc(100vh-12rem)] overflow-y-auto">
                        <div className="bg-dark-surface rounded-lg p-6 border border-primary/10">
                            <CaseForm onCreated={handleCaseCreated} />
                        </div>
                    </div>
                )}

                <div
                    className={`flex-1 ${
                        showForm ? 'lg:w-1/2' : 'w-full'
                    } h-[calc(100vh-12rem)] overflow-y-auto`}
                >
                    <div className="bg-dark-surface rounded-lg p-6 border border-primary/10">
                        {cases.length === 0 ? (
                            <p className="text-center text-gray-400">
                                No cases found. Add your first case to get
                                started.
                            </p>
                        ) : (
                            renderCases()
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cases;
