import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Cases from './pages/Cases';
import Settings from './pages/Settings';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/cases" element={<Cases />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </Layout>
            <ToastContainer />
        </Router>
    );
}

export default App;
