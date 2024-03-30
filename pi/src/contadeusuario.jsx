import React, { useState } from 'react';

export default function Usuario() {
  const [showLoginForm, setShowLoginForm] = useState(true); // Initially show login form

  const handleToggleForm = () => {
    setShowLoginForm(!showLoginForm); // Toggle between login and registration forms
  };

  return (
    <div className="user-account">
      <section className="grid-area-1 / 2; grid-row-start: 1; grid-row-end: 3; display: none;">
        <div id="close-account" onClick={handleCloseAccount}>
          <span>close</span>
        </div>

        <div className="user">
          {isLoggedIn ? (
            <p>Welcome, logged-in user!</p>
          ) : (
            <div>
              {showLoginForm ? (
                <>
                  <h3>Login Now</h3>
                  <form action="" method="post" onSubmit={handleLogin}>
                    <input
                      type="email"
                      name="email"
                      required
                      className="box"
                      placeholder="enter your email"
                      maxLength="50"
                    />
                    <input
                      type="password"
                      name="pass"
                      required
                      className="box"
                      placeholder="enter your password"
                      maxLength="20"
                    />
                    <input type="submit" value="login now" name="login" className="btn" />
                  </form>
                  <button onClick={handleToggleForm}>Register Now</button>
                </>
              ) : (
                <>
                  <h3>Register Now</h3>
                  <form action="" method="post" onSubmit={handleRegister}>
                    <input
                      type="text"
                      name="name"
                      required
                      className="box"
                      placeholder="enter your name"
                      maxLength="20"
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      className="box"
                      placeholder="enter your email"
                      maxLength="50"
                    />
                    <input
                      type="password"
                      name="pass"
                      required
                      className="box"
                      placeholder="enter your password"
                      maxLength="20"
                    />
                    <input
                      type="password"
                      name="cpass"
                      required
                      className="box"
                      placeholder="confirm your password"
                      maxLength="20"
                    />
                    <input type="submit" value="register now" name="register" className="btn" />
                  </form>
                  <button onClick={handleToggleForm}>Login Now</button>
                </>
              )}
            </div>
          )}
        </div>

        {/* ... rest of the component's content ... */}
      </section>
    </div>
  );
}