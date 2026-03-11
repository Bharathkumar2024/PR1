import { useState, useRef, useEffect } from "react";

export default function App() {
  const [connectOpen, setConnectOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setConnectOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: 'Inter', sans-serif;
          background: #f8fafc;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ── Background ── */
        .page-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          background: #ffffff;
          overflow: hidden;
        }

        /* Top gradient wash */
        .page-bg::before {
          content: '';
          position: absolute;
          top: -200px;
          left: -100px;
          right: -100px;
          height: 700px;
          background: radial-gradient(ellipse 75% 65% at 50% 0%,
            rgba(219,234,254,0.9) 0%,
            rgba(239,246,255,0.6) 40%,
            transparent 80%);
        }

        /* Subtle grid */
        .page-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        /* Decorative blobs */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }

        .blob-1 {
          width: 600px;
          height: 600px;
          background: rgba(191,219,254,0.45);
          top: -250px;
          left: 50%;
          transform: translateX(-50%);
        }

        .blob-2 {
          width: 350px;
          height: 350px;
          background: rgba(196,181,253,0.2);
          top: 100px;
          right: -80px;
        }

        .blob-3 {
          width: 280px;
          height: 280px;
          background: rgba(186,230,253,0.25);
          top: 150px;
          left: -60px;
        }

        /* ── Navbar ── */
        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 3.5rem;
          height: 68px;
          background: rgba(255,255,255,0.82);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(226,232,240,0.9);
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03);
        }

        /* ── Logo ── */
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          user-select: none;
        }

        .logo-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(37,99,235,0.3);
        }

        .logo-name {
          font-size: 18px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.6px;
        }

        .logo-name span {
          color: #2563eb;
        }

        /* ── Nav actions ── */
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* Ghost nav buttons */
        .nav-btn {
          padding: 8px 18px;
          border-radius: 8px;
          border: none;
          background: transparent;
          color: #475569;
          font-size: 14px;
          font-weight: 500;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: color 0.16s, background 0.16s;
          letter-spacing: -0.1px;
        }

        .nav-btn:hover {
          color: #0f172a;
          background: rgba(15,23,42,0.05);
        }

        /* Connect button */
        .connect-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 20px;
          border-radius: 8px;
          border: 1.5px solid #bfdbfe;
          background: #eff6ff;
          color: #2563eb;
          font-size: 14px;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: all 0.18s;
          letter-spacing: -0.1px;
        }

        .connect-btn:hover,
        .connect-btn.open {
          background: #dbeafe;
          border-color: #93c5fd;
          color: #1d4ed8;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
        }

        .connect-btn svg.arrow {
          transition: transform 0.2s;
        }

        .connect-btn.open svg.arrow {
          transform: rotate(180deg);
        }

        /* ── Dropdown ── */
        .dropdown-wrap {
          position: relative;
          margin-right: 8px;
        }

        .dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          min-width: 220px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 6px;
          box-shadow:
            0 4px 6px rgba(0,0,0,0.04),
            0 16px 40px rgba(0,0,0,0.1);
          animation: dropIn 0.15s cubic-bezier(0.16,1,0.3,1);
          transform-origin: top right;
        }

        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }

        .dropdown-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 13px;
          border-radius: 9px;
          border: none;
          background: transparent;
          color: #1e293b;
          text-align: left;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: background 0.14s;
        }

        .dropdown-item:hover {
          background: #eff6ff;
        }

        .dropdown-icon {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: #dbeafe;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2563eb;
          flex-shrink: 0;
        }

        .item-label {
          font-size: 13.5px;
          font-weight: 600;
          color: #0f172a;
          display: block;
        }

        .item-sub {
          font-size: 11.5px;
          color: #94a3b8;
          margin-top: 1px;
          display: block;
        }

        /* ── Hero section ── */
        .hero {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 120px 2rem 80px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 14px;
          border-radius: 100px;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          color: #2563eb;
          font-size: 12.5px;
          font-weight: 600;
          letter-spacing: 0.2px;
          margin-bottom: 28px;
        }

        .hero-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #2563eb;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.8); }
        }

        .hero-title {
          font-size: clamp(38px, 5vw, 62px);
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -2px;
          line-height: 1.12;
          max-width: 720px;
          margin-bottom: 22px;
        }

        .hero-title .blue {
          color: #2563eb;
          background: linear-gradient(135deg, #2563eb, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          font-size: 17px;
          color: #64748b;
          max-width: 500px;
          line-height: 1.65;
          margin-bottom: 40px;
          font-weight: 400;
        }

        .hero-cta {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .btn-primary {
          padding: 13px 30px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #2563eb, #3b82f6);
          color: #fff;
          font-size: 15px;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          box-shadow: 0 4px 18px rgba(37,99,235,0.35);
          transition: transform 0.18s, box-shadow 0.18s;
          letter-spacing: -0.2px;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(37,99,235,0.4);
        }

        .btn-secondary {
          padding: 13px 28px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background: #fff;
          color: #334155;
          font-size: 15px;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: border-color 0.18s, background 0.18s;
          letter-spacing: -0.2px;
        }

        .btn-secondary:hover {
          border-color: #93c5fd;
          background: #f8fafc;
        }

        /* ── Trust strip ── */
        .trust {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
          padding: 0 2rem 60px;
          flex-wrap: wrap;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #94a3b8;
          font-size: 13.5px;
          font-weight: 500;
        }

        .trust-item svg {
          color: #2563eb;
        }
      `}</style>

      {/* Background */}
      <div className="page-bg">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* ── Navbar ── */}
      <nav className="navbar">
        <a className="logo" href="#">
          <div className="logo-icon">
            <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </div>
          <span className="logo-name">We<span>Connect</span></span>
        </a>

        <div className="nav-actions">
          {/* Connect + dropdown */}
          <div className="dropdown-wrap" ref={dropdownRef}>
            <button
              className={`connect-btn ${connectOpen ? "open" : ""}`}
              onClick={() => setConnectOpen(v => !v)}
              aria-haspopup="true"
              aria-expanded={connectOpen}
            >
              Connect
              <svg className="arrow" width="13" height="13" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>

            {connectOpen && (
              <div className="dropdown" role="menu">
                <button
                  className="dropdown-item"
                  role="menuitem"
                  onClick={() => setConnectOpen(false)}
                >
                  <div className="dropdown-icon">
                    <svg width="15" height="15" fill="none" stroke="currentColor"
                      strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </div>
                  <div>
                    <span className="item-label">Email</span>
                    <span className="item-sub">Send us a message</span>
                  </div>
                </button>
              </div>
            )}
          </div>

          <button className="nav-btn">About Us</button>
          <button className="nav-btn">Contact</button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-badge">
          <div className="hero-badge-dot" />
          Trusted by 10,000+ professionals
        </div>

        <h1 className="hero-title">
          The Smarter Way to<br />
          <span className="blue">Stay Connected</span>
        </h1>

        <p className="hero-sub">
          WeConnect bridges the gap between professionals, teams, and opportunities —
          all in one seamless platform.
        </p>

        <div className="hero-cta">
          <button className="btn-primary">Get Started Free</button>
          <button className="btn-secondary">Learn More →</button>
        </div>
      </section>

      {/* ── Trust strip ── */}
      <div className="trust">
        {[
          { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", label: "No credit card required" },
          { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", label: "Enterprise-grade security" },
          { icon: "M13 10V3L4 14h7v7l9-11h-7z", label: "Setup in minutes" },
        ].map((t) => (
          <div className="trust-item" key={t.label}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d={t.icon}/>
            </svg>
            {t.label}
          </div>
        ))}
      </div>
    </>
  );
}
