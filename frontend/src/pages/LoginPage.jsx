import { useState, useContext } from 'react';
import { loginUser } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await loginUser({ email, password });
      login(response.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* background blobs */}
      <div className="blob blob1" />
      <div className="blob blob2" />

      <div className="card">

        {/* header */}
        <div className="header">
          <div className="logo">📋</div>
          <h2>Welcome back</h2>
          <p>Log in to manage your tasks</p>
        </div>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Log in →'}
          </button>
        </form>

        <p className="footer">
          Don't have an account?{' '}
          <Link to="/register">Create one</Link>
        </p>
      </div>

      {/* STYLE */}
      <style>{`
        * {
          box-sizing: border-box;
        }

        html, body {
          margin: 0;
          padding: 0;
          height: 100%;
          overflow: hidden; /* ❌ full page scroll OFF */
          font-family: Arial;
        }

        .login-page {
          height: 100dvh; /* 🔥 mobile safe height */
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 16px;
          background: linear-gradient(135deg, #4f46e5, #7c3aed, #a855f7);
          position: relative;
          overflow: hidden;
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
        }

        .blob1 {
          width: 350px;
          height: 350px;
          top: -120px;
          right: -120px;
        }

        .blob2 {
          width: 280px;
          height: 280px;
          bottom: -100px;
          left: -100px;
        }

        .card {
          width: 100%;
          max-width: 400px;
          background: rgba(255,255,255,0.97);
          padding: 40px 32px;
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.25);
          z-index: 2;
        }

        .header {
          text-align: center;
          margin-bottom: 25px;
        }

        .logo {
          width: 54px;
          height: 54px;
          margin: 0 auto 10px;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: white;
        }

        .header h2 {
          margin: 0;
          font-size: 1.4rem;
        }

        .header p {
          margin: 5px 0 0;
          font-size: 13px;
          color: #888;
        }

        .error {
          background: #fff5f5;
          color: #dc2626;
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 15px;
          text-align: center;
          font-size: 13px;
        }

        label {
          font-size: 13px;
          font-weight: 600;
          display: block;
          margin: 10px 0 6px;
        }

        input {
          width: 100%;
          padding: 11px 12px;
          border-radius: 10px;
          border: 1px solid #ddd;
          background: #fafafa;
          outline: none;
          font-size: 14px;
        }

        input:focus {
          border-color: #7c3aed;
        }

        button {
          width: 100%;
          margin-top: 18px;
          padding: 12px;
          border: none;
          border-radius: 10px;
          font-weight: bold;
          color: white;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          cursor: pointer;
        }

        button:disabled {
          background: #c4b5fd;
          cursor: not-allowed;
        }

        .footer {
          text-align: center;
          margin-top: 18px;
          font-size: 13px;
          color: #888;
        }

        .footer a {
          color: #7c3aed;
          font-weight: 700;
          text-decoration: none;
        }

        /* 📱 MOBILE FIX */
        @media (max-width: 640px) {
          .card {
            padding: 28px 20px;
            border-radius: 16px;
          }

          .header h2 {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;