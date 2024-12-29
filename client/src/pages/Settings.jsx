import { useTheme } from '../hooks/useTheme';

const Settings = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-white">Settings</h1>

            <div className="bg-dark-surface rounded-lg p-6 border border-primary/10">
                <h2 className="text-lg font-medium mb-4">Appearance</h2>

                <div className="flex items-center justify-between">
                    <span>Theme</span>
                    <button
                        onClick={toggleTheme}
                        className="px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                    >
                        {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
