import React from 'react';
import { useNavigate } from 'react-router-dom'
import '../Styles/Login.css';
import supabase from '../../Server/Models/model';

const Login = () => {
    const navigate = useNavigate();

    const handleGitHubAuth = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'github',
                options: {
                     skipBrowserRedirect: true
                },
            });

            if (error) {
                throw new Error('Error during GitHub login: ' + error.message);
            }
            navigate('/Homepage');
        } catch (error) {
            console.error('Error during authentication:', error.message);
        }
    };

    return (
        <div>
            <h2 class='login'>Log in with GitHub</h2>
            <button class='loginButton' onClick={handleGitHubAuth}>Log in with GitHub</button>
        </div>
    );
};

export default Login;
