import React, { useEffect, useState } from 'react';

const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';
const BACKEND_URL = 'https://your-backend.onrender.com';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    window.google?.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleCredentialResponse,
    });

    window.google?.accounts.id.renderButton(
      document.getElementById('google-signin-button'),
      { theme: 'outline', size: 'large' }
    );

    window.google?.accounts.id.prompt();
  }, []);

  async function handleCredentialResponse(response) {
    const token = response.credential;
    const res = await fetch(`${BACKEND_URL}/api/google-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    const data = await res.json();
    setUser(data);
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Google Sign-In Demo</h1>
      {!user && <div id="google-signin-button"></div>}
      {user && (
        <div>
          <h2>Welcome, {user.name}</h2>
          <img src={user.picture} alt="profile" style={{ borderRadius: '50%' }} />
          <p>{user.email}</p>
        </div>
      )}
    </div>
  );
}
