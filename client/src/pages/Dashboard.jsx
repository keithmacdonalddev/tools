const Dashboard = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Placeholder cards for future statistics/features */}
                <div className="p-6 rounded-lg bg-dark-surface border border-primary/10">
                    <h2 className="text-lg font-medium mb-2">Total Cases</h2>
                    <p className="text-3xl font-bold text-primary">0</p>
                </div>
                {/* Add more cards as needed */}
            </div>
        </div>
    );
};

export default Dashboard;
