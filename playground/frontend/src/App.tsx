import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchAppBar from './playground/PlaygroundNavBar';
import PlaygroundPage from './playground/PlaygroundPage';

function App() {
    return (
        <Router>
            <SearchAppBar />
            <Routes>
                <Route path="/" element={<PlaygroundPage />} />
            </Routes>
        </Router>
    );
}

export default App;
