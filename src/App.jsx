import './css/App.css';
import {Home} from './pages/Home.jsx';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {SignUp} from "./pages/auth/SignUp.jsx";
import {SignIn} from "./pages/auth/SignIn.jsx";
import {useEffect, useState} from "react";
import NotFound from "./pages/NotFound.jsx";
import {AuthAPI} from "./API/AuthAPI.js";


function App() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const user = await AuthAPI.me();
            setUser(user);
        } catch (error) {
            console.error("Failed to fetch user:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Routes>
                {user ? (
                    <>
                        <Route path="/" element={<Home user={user} />}/>
                        <Route path="/sign-in" element={<Navigate to="/" replace />}/>
                        <Route path="/sign-up" element={<Navigate to="/" replace />}/>
                        <Route path="*" element={<NotFound />} />
                    </>
                ) : (
                    <>
                        <Route path="/sign-up" element={<SignUp/>}/>
                        <Route path="/sign-in" element={<SignIn onSignIn={fetchUser}/>}/>
                        <Route path="/" element={<Navigate to="/sign-in" replace />}/>
                        <Route path="*" element={<NotFound />} />
                    </>
                )}
            </Routes>
        </Router>
    );
}

export {App};