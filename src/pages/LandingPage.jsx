import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity, Calendar, Shield, Bell, Users, ClipboardList,
  ArrowRight, Star, CheckCircle, Stethoscope, Heart, Zap
} from 'lucide-react';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { scrolled: false, activeFeature: 0 };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.featureInterval = setInterval(() => {
      this.setState(prev => ({ activeFeature: (prev.activeFeature + 1) % 4 }));
    }, 3000);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    clearInterval(this.featureInterval);
  }

  handleScroll() {
    this.setState({ scrolled: window.scrollY > 20 });
  }

  render() {
    const { scrolled } = this.state;

    const features = [
      {
        icon: <Calendar size={28} />,
        title: 'Smart Appointment Booking',
        desc: 'Book appointments in seconds with real-time slot availability. No double-bookings, no conflicts — ever.',
        color: '#0ea5e9',
      },
      {
        icon: <Stethoscope size={28} />,
        title: 'Doctor Discovery',
        desc: 'Search and filter doctors by specialization, department, and availability to find the perfect match.',
        color: '#8b5cf6',
      },
      {
        icon: <ClipboardList size={28} />,
        title: 'Prescription Management',
        desc: 'Digital prescriptions linked to completed appointments. Access your full medical history anytime.',
        color: '#10b981',
      },
      {
        icon: <Bell size={28} />,
        title: 'Real-Time Notifications',
        desc: 'Get instant alerts for booking confirmations, reminders, and cancellations via email or in-app.',
        color: '#f59e0b',
      },
      {
        icon: <Shield size={28} />,
        title: 'Secure & Role-Based Access',
        desc: 'JWT authentication with granular role controls ensures every user sees only what they should.',
        color: '#ef4444',
      },
      {
        icon: <Users size={28} />,
        title: 'Powerful Admin Dashboard',
        desc: 'Manage users, departments, doctors, and view system-wide reports — all in one place.',
        color: '#0ea5e9',
      },
    ];

    const stats = [
      { value: '10K+', label: 'Patients Served' },
      { value: '500+', label: 'Verified Doctors' },
      { value: '50K+', label: 'Appointments Booked' },
      { value: '99.9%', label: 'Uptime Guarantee' },
    ];

    const roles = [
      {
        icon: <Heart size={24} />,
        title: 'For Patients',
        color: '#0ea5e9',
        points: ['Discover & book doctors instantly', 'Track appointment history', 'View digital prescriptions', 'Get booking reminders'],
      },
      {
        icon: <Stethoscope size={24} />,
        title: 'For Doctors',
        color: '#8b5cf6',
        points: ['Manage weekly availability', 'View upcoming appointments', 'Issue digital prescriptions', 'Handle leave & block dates'],
      },
      {
        icon: <Shield size={24} />,
        title: 'For Admins',
        color: '#10b981',
        points: ['Full user management', 'Department & doctor CRUD', 'System-wide reports', 'Activate / deactivate accounts'],
      },
    ];

    const testimonials = [
      { name: 'Priya Sharma', role: 'Patient', text: 'MedBook made booking my cardiologist appointment so easy. The reminders are a lifesaver!', rating: 5 },
      { name: 'Dr. Arjun Mehta', role: 'Cardiologist', text: 'My schedule is perfectly organized now. I can focus entirely on my patients.', rating: 5 },
      { name: 'Rahul Verma', role: 'Clinic Admin', text: 'Managing 30+ doctors across 5 departments used to be chaos. MedBook changed everything.', rating: 5 },
    ];

    return (
      <div className="landing-page">
        {/* ──────────────── LANDING NAVBAR ──────────────── */}
        <nav className={`landing-nav ${scrolled ? 'landing-nav--scrolled' : ''}`}>
          <div className="landing-nav__inner">
            <div className="logo">
              <Activity size={28} />
              <span>MedBook</span>
            </div>
            <ul className="landing-nav__links">
              <li><a href="#features" className="landing-nav__link">Features</a></li>
              <li><a href="#how-it-works" className="landing-nav__link">How It Works</a></li>
              <li><a href="#testimonials" className="landing-nav__link">Reviews</a></li>
            </ul>
            <div className="landing-nav__actions">
              <Link to="/login" className="btn-nav-secondary" id="nav-login-btn">Log In</Link>
              <Link to="/register" className="btn-nav-primary" id="nav-signup-btn">Get Started <ArrowRight size={16} /></Link>
            </div>
          </div>
        </nav>

        {/* ──────────────── HERO ──────────────── */}
        <section className="hero">
          <div className="hero__bg-orb hero__bg-orb--1" />
          <div className="hero__bg-orb hero__bg-orb--2" />
          <div className="hero__bg-orb hero__bg-orb--3" />

          <div className="hero__content">
            <div className="hero__badge">
              <Zap size={14} />
              <span>Next-Gen Healthcare Platform</span>
            </div>

            <h1 className="hero__title">
              Your Health,<br />
              <span className="hero__title-gradient">Perfectly Managed</span>
            </h1>

            <p className="hero__subtitle">
              MedBook connects patients, doctors, and clinics in one seamless platform.
              Book appointments, manage prescriptions, and never miss a check-up again.
            </p>

            <div className="hero__actions">
              <Link to="/register" className="btn-hero-primary" id="hero-signup-btn">
                Get Started Free
                <ArrowRight size={18} />
              </Link>
              <Link to="/login" className="btn-hero-secondary" id="hero-login-btn">
                Sign In to Dashboard
              </Link>
            </div>

            <div className="hero__trust">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
              ))}
              <span>Trusted by <strong>10,000+</strong> patients nationwide</span>
            </div>
          </div>

          {/* Floating card visuals */}
          <div className="hero__visual">
            <div className="hero__card hero__card--main glass">
              <div className="hero__card-header">
                <div className="hero__avatar" style={{ background: 'linear-gradient(135deg,#0ea5e9,#8b5cf6)' }}>
                  <Stethoscope size={20} color="white" />
                </div>
                <div>
                  <p className="hero__card-name">Dr. Arjun Mehta</p>
                  <p className="hero__card-spec">Cardiologist · Available Now</p>
                </div>
                <span className="hero__status-badge">●&nbsp;Online</span>
              </div>
              <div className="hero__slots">
                {['10:00 AM', '11:30 AM', '2:00 PM', '3:30 PM'].map(t => (
                  <button key={t} className="hero__slot">{t}</button>
                ))}
              </div>
              <button className="btn-primary" style={{ marginTop: '1rem', fontSize: '0.875rem', padding: '0.6rem' }}>
                Book Appointment
              </button>
            </div>

            <div className="hero__card hero__card--stat glass">
              <CheckCircle size={20} color="#10b981" />
              <div>
                <p className="hero__stat-value">Appointment Confirmed!</p>
                <p className="hero__stat-sub">Today at 10:00 AM · Dr. Mehta</p>
              </div>
            </div>

            <div className="hero__card hero__card--notify glass">
              <Bell size={18} color="#f59e0b" />
              <div>
                <p className="hero__stat-value">Reminder</p>
                <p className="hero__stat-sub">Your appointment is in 1 hour</p>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────── STATS ──────────────── */}
        <section className="stats-section">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div key={i} className="stat-item">
                <p className="stat-value">{s.value}</p>
                <p className="stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ──────────────── FEATURES ──────────────── */}
        <section className="features-section" id="features">
          <div className="section-header">
            <div className="section-badge">Features</div>
            <h2 className="section-title">Everything You Need,<br />Nothing You Don't</h2>
            <p className="section-sub">A complete ecosystem built for modern healthcare management.</p>
          </div>

          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card premium-card">
                <div className="feature-icon" style={{ background: `${f.color}18`, color: f.color }}>
                  {f.icon}
                </div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ──────────────── HOW IT WORKS ──────────────── */}
        <section className="how-section" id="how-it-works">
          <div className="section-header">
            <div className="section-badge">For Everyone</div>
            <h2 className="section-title">Built for Every Role</h2>
            <p className="section-sub">Whether you're a patient, a doctor, or an admin — MedBook has you covered.</p>
          </div>

          <div className="roles-grid">
            {roles.map((r, i) => (
              <div key={i} className="role-card glass">
                <div className="role-icon" style={{ background: `${r.color}18`, color: r.color }}>
                  {r.icon}
                </div>
                <h3 className="role-title">{r.title}</h3>
                <ul className="role-points">
                  {r.points.map((p, j) => (
                    <li key={j} className="role-point">
                      <CheckCircle size={16} color={r.color} />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className="role-cta"
                  style={{ color: r.color, borderColor: r.color }}
                  id={`role-cta-${i}`}
                >
                  Get Started <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ──────────────── TESTIMONIALS ──────────────── */}
        <section className="testimonials-section" id="testimonials">
          <div className="section-header">
            <div className="section-badge">Testimonials</div>
            <h2 className="section-title">Loved by Healthcare Professionals</h2>
            <p className="section-sub">Real stories from real people transforming their healthcare experience.</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card premium-card">
                <div className="testimonial-stars">
                  {[...Array(t.rating)].map((_, s) => (
                    <Star key={s} size={14} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="testimonial-name">{t.name}</p>
                    <p className="testimonial-role">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ──────────────── CTA ──────────────── */}
        <section className="cta-section">
          <div className="cta-orb cta-orb--1" />
          <div className="cta-orb cta-orb--2" />
          <div className="cta-content">
            <h2 className="cta-title">Ready to Transform Your Healthcare Experience?</h2>
            <p className="cta-sub">Join thousands of patients and doctors already using MedBook.</p>
            <div className="cta-actions">
              <Link to="/register" className="btn-hero-primary" id="cta-signup-btn">
                Create Free Account <ArrowRight size={18} />
              </Link>
              <Link to="/login" className="btn-cta-secondary" id="cta-login-btn">
                Sign In
              </Link>
            </div>
          </div>
        </section>

        {/* ──────────────── FOOTER ──────────────── */}
        <footer className="landing-footer">
          <div className="footer-inner">
            <div className="logo" style={{ marginBottom: '0.5rem' }}>
              <Activity size={22} />
              <span>MedBook</span>
            </div>
            <p className="footer-copy">© 2025 MedBook. All rights reserved. Built with ❤️ for better healthcare.</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default LandingPage;
