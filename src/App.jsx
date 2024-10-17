import './css/App.css';
import {Home} from './pages/Home.jsx';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {SignUp} from "./pages/auth/SignUp.jsx";
import {SignIn} from "./pages/auth/SignIn.jsx";
import {UserAPI} from "./API/UserAPI.js";
import {useEffect, useState} from "react";

function App() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const user = await UserAPI.get();
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
                        <Route path="*" element={<Navigate to="/" replace/>}/>
                    </>
                ) : (
                    <>
                        <Route path="/sign-up" element={<SignUp/>}/>
                        <Route path="/sign-in" element={<SignIn onSignIn={fetchUser}/>}/>
                        <Route path="*" element={<SignIn onSignIn={fetchUser}/>}/>
                    </>
                )}
            </Routes>
        </Router>
    );
}

export {App};