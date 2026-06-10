import { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await registerUser({ name, email, password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      {/* background blobs */}
      <div className="blob blob1" />
      <div className="blob blob2" />

      <div className="card">

        {/* HEADER */}
        <div className="header">
          <div className="logo">®️</div>
          <h2>Create your account</h2>
          <p>Start managing your tasks today</p>
        </div>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
          />

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
            placeholder="Create a strong password"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create account →'}
          </button>
        </form>

        <p className="footer">
          Already have an account?{' '}
          <Link to="/login">Log in</Link>
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
          overflow: hidden; 
          font-family: Arial;
        }

        .register-page {
          height: 100dvh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 16px;
          /* 🌟 BACKGROUND COLOR TURNED GREEN (EMERALD TO TEAL) */
          background: linear-gradient(135deg, #059669, #10b981, #14b8a6);
          position: relative;
          overflow: hidden;
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
        }

        .blob1 {
          width: 360px;
          height: 360px;
          top: -120px;
          left: -120px;
        }

        .blob2 {
          width: 280px;
          height: 280px;
          bottom: -100px;
          right: -100px;
        }

        .card {
          width: 100%;
          max-width: 420px;
          background: rgba(255,255,255,0.97);
          padding: 38px 32px;
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.25);
          z-index: 2;
        }

        .header {
          text-align: center;
          margin-bottom: 20px;
        }

        .logo {
          width: 54px;
          height: 54px;
          margin: 0 auto 10px;
          /* 🌟 LOGO BACKGROUND TURNED GREEN */
          background: linear-gradient(135deg, #059669, #10b981);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          color: white;
        }

        .header h2 {
          margin: 0;
          font-size: 1.3rem;
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
          display: block;
          margin: 10px 0 6px;
          font-size: 13px;
          font-weight: 600;
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
          /* 🌟 INPUT FOCUS BORDER TURNED GREEN */
          border-color: #10b981;
        }

        button {
          width: 100%;
          margin-top: 18px;
          padding: 12px;
          border: none;
          border-radius: 10px;
          font-weight: bold;
          color: white;
          /* 🌟 BUTTON BACKGROUND TURNED GREEN */
          background: linear-gradient(135deg, #059669, #10b981);
          cursor: pointer;
        }

        button:disabled {
          /* 🌟 DISABLED BUTTON STATE ADJUSTED FOR GREEN THEME */
          background: #a7f3d0;
          cursor: not-allowed;
        }

        .footer {
          text-align: center;
          margin-top: 18px;
          font-size: 13px;
          color: #888;
        }

        .footer a {
          /* 🌟 LOGIN LINK TURNED GREEN */
          color: #059669;
          font-weight: 700;
          text-decoration: none;
        }

        .footer a:hover {
          text-decoration: underline;
        }

        /* 📱 MOBILE FIX */
        @media (max-width: 640px) {
          .card {
            padding: 26px 18px;
            border-radius: 16px;
          }

          .header h2 {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;