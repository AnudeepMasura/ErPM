import React, { useEffect, useState } from "react";

const navItems = [
  ["dashboard", "Dashboard", "fa-chart-pie"],
  ["analytics", "Analytics", "fa-chart-line"],
  ["sale-history", "Sale History", "fa-clock-rotate-left"],
  ["customer-data", "Customer Data", "fa-address-book"],
  ["products", "Products", "fa-box-open"],
  ["inventory", "Inventory", "fa-warehouse"],
  ["manage-store", "Manage Store", "fa-store"],
  ["manage-employees", "Manage Employees", "fa-users-gear"],
  ["recruitment", "Recruitment", "fa-user-plus"],
  ["operating", "Operating", "fa-gears"],
  ["hr", "HR", "fa-id-badge"],
  ["customer-support", "Customer Support", "fa-headset"],
  ["wallet", "Wallet", "fa-wallet"],
  ["finance-suite", "Finance Suite", "fa-vault"],
  ["settings", "Settings", "fa-gear"],
];

const simplePages = {
  analytics: ["Analytics", "Deep dive performance metrics and trends.", "Performance Metrics", "Comprehensive analytics reporting suite."],
  "sale-history": ["Sale History", "Review past completed transactions and orders.", "Transactions Ledger", "Full historical log of sales records."],
  "customer-data": ["Customer Data", "Client profiles and contact databases.", "Registered Clients", "Customer database and CRM information."],
  products: ["Products", "Catalog items and pricing controls.", "Product Catalog", "Manage product listings and prices."],
  inventory: ["Inventory", "Stock levels and warehouse distribution.", "Stock Management", "Track warehouse supply and stock quantities."],
  "manage-store": ["Manage Store", "Branch locations and store configurations.", "Store Locations", "Manage physical and digital storefronts."],
  "manage-employees": ["Manage Employees", "Staff directory, roles, and permissions.", "Employee Directory", "Assign roles and monitor staff activity."],
  recruitment: ["Recruitment", "Open positions and applicant tracking.", "Candidate Pipeline", "Manage job postings and interviews."],
  operating: ["Operating", "Day-to-day operations and task scheduling.", "Operations Control", "Monitor operational workflows."],
  hr: ["HR", "Human resources administration and payroll.", "HR Management", "Manage employee benefits and compliance."],
  "customer-support": ["Customer Support", "Support tickets and client assistance.", "Active Helpdesk Tickets", "Resolve client support requests."],
  "finance-suite": ["Finance Suite", "Advanced financial analytics, ledgers, and budgeting.", "Financial Overview", "Enterprise financial planning tools."],
  settings: ["Settings", "Manage your account preferences and system parameters.", "Preferences", "Configure notifications, security, and profile details here."]
};

function go(path) {
  window.location.hash = path;
}

function getPage() {
  const h = window.location.hash.replace("#", "");
  return h || "login";
}

export default function App() {
  const [page, setPage] = useState(getPage());

  useEffect(() => {
    const onHash = () => setPage(getPage());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  if (page === "login") return <Login />;
  if (page === "signup") return <Signup />;
  if (page === "dashboard" || navItems.some(x => x[0] === page)) return <Dashboard page={page} />;
  if (["profile", "announcements", "tc"].includes(page)) return <Dashboard page={page} />;
  return <Login />;
}

function PublicNav({ homeTarget = "login" }) {
  return (
    <nav className="public-navbar">
      <div className="navbar-brand">EvoRES ErPM</div>
      <button className="home-icon-link" title="Home" onClick={() => go(homeTarget)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      </button>
    </nav>
  );
}

function PublicFooter() {
  return <footer className="public-footer">[2026 © All rights reserved with EvoRES Technology]</footer>;
}

function Login() {
  const submit = e => { e.preventDefault(); go("dashboard"); };
  return (
    <div className="public-page">
      <PublicNav />
      <div className="auth-main">
        <div className="left-ad-panel">
          <h2>Welcome Back <br/>Get Logged in to Access World's Best All-in-One Business Management Tool</h2>
        </div>
        <div className="right-signin-panel">
          <div className="signin-box">
            <h3>Client Login</h3>
            <form onSubmit={submit}>
              <div className="auth-form-group">
                <label htmlFor="username">Enter username / gmail:</label>
                <input id="username" type="text" required />
              </div>
              <div className="auth-form-group">
                <label htmlFor="password">Enter Password:</label>
                <input id="password" type="password" required />
              </div>
              <div className="form-actions"><button type="button" onClick={() => alert("Password recovery flow opened.")}>Forgot pwd?</button></div>
              <button className="gold-button full" type="submit">Sign in</button>
            </form>
          </div>
        </div>
      </div>
      <PublicFooter />
    </div>
  );
}

function Signup() {
  const [step, setStep] = useState(1);
  const submit = e => { e.preventDefault(); alert("Signup completed successfully!"); go("login"); };

  return (
    <div className="public-page">
      <PublicNav />
      <div className="auth-main">
        <div className="left-ad-panel">
          <h2>Welcome Back <br/>Get Logged in to Access World's Best All-in-One Business Management Tool</h2>
        </div>
        <div className="right-signup-panel">
          <div className="signup-box">
            <h3>Client Business Setup Sign up</h3>
            <div className="step-indicator">Step {step} of 4</div>
            <form onSubmit={submit}>
              {step === 1 && <SetupStepOne />}
              {step === 2 && <SetupStepTwo />}
              {step === 3 && <SetupStepThree />}
              {step === 4 && <SetupStepFour />}
            </form>
          </div>
        </div>
      </div>
      <PublicFooter />
    </div>
  );

  function buttons(back, nextText = "Next") {
    return <div className="btn-container">
      {back ? <button type="button" className="secondary-button" onClick={() => setStep(step - 1)}>Back</button> : <div/>}
      {step < 4
        ? <button type="button" className="gold-button" onClick={() => setStep(step + 1)}>{nextText}</button>
        : <button type="submit" className="gold-button">Complete Signup &amp; Pay</button>}
    </div>;
  }

  function SetupStepOne() {
    return <>
      <AuthGroup label="Business Type"><select required defaultValue=""><option value="">Select business type</option><option>Sole Proprietor</option><option>LLP</option><option>Pvt Ltd</option><option>Public</option><option>Org</option><option>NGO</option><option>Others</option></select></AuthGroup>
      <AuthGroup label="Business Name"><input placeholder="Enter business name" required /></AuthGroup>
      <AuthGroup label="Business Mail"><input type="email" placeholder="business@company.com" required /></AuthGroup>
      <AuthGroup label="Business Mobile Number"><input type="tel" placeholder="+1234567890" required /></AuthGroup>
      <AuthGroup label="HQ Address">
        <input placeholder="Street Address" required />
        <div className="inline-group"><input placeholder="City / Town" required /><input placeholder="State / Province" required /></div>
        <div className="inline-group"><input placeholder="Pincode / Zipcode" required /><input placeholder="Country" required /></div>
      </AuthGroup>
      {buttons(false)}
    </>;
  }

  function SetupStepTwo() {
    return <>
      <AuthGroup label="Full Name"><input placeholder="Enter full name" required /></AuthGroup>
      <AuthGroup label="Username"><input placeholder="Choose username" required /></AuthGroup>
      <div className="inline-group"><AuthGroup label="Date of Birth"><input type="date" required /></AuthGroup><AuthGroup label="Gender"><select required defaultValue=""><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></select></AuthGroup></div>
      <AuthGroup label="Gmail [Set as Recovery]"><input type="email" placeholder="recovery@gmail.com" required /></AuthGroup>
      <AuthGroup label="Mobile Number [Validate with OTP]"><div className="inline-group"><input type="tel" placeholder="Mobile number" required /><button type="button" className="secondary-button">Send OTP</button></div></AuthGroup>
      <AuthGroup label="Face KYC + Recognition [Optional]"><input type="file" accept="image/*" /></AuthGroup>
      {buttons(true)}
    </>;
  }

  function SetupStepThree() {
    return <>
      <div className="terms-box"><strong>Terms &amp; Conditions</strong><br/><br/>Please read these terms and conditions carefully before using EvoRES ErPM. By signing up, you agree to comply with and be bound by the following terms of use. All business data provided remains strictly confidential and secure under standard operational compliance.</div>
      <label className="terms-check"><input id="terms" type="checkbox" required /> I accept the Terms &amp; Conditions</label>
      {buttons(true)}
    </>;
  }

  function SetupStepFour() {
    return <>
      <AuthGroup label="Payment Gateway Integration">
        <p className="payment-copy">Choose your payment method to complete the business setup subscription.</p>
        <select required defaultValue=""><option value="">Select Payment Gateway</option><option>Credit / Debit Card</option><option>UPI / Net Banking</option><option>PayPal</option></select>
      </AuthGroup>
      {buttons(true)}
    </>;
  }
}

function AuthGroup({ label, children }) {
  return <div className="auth-form-group"><label>{label}</label>{children}</div>;
}

function Dashboard({ page }) {
  const [collapsed, setCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [walletTab, setWalletTab] = useState("added");
  const [filter, setFilter] = useState("Day");
  const [bars, setBars] = useState([35,65,50,85,45,90,70]);

  const walletFilter = f => {
    setFilter(f);
    setBars(bars.map(() => Math.floor(Math.random() * 75) + 20));
  };

  const logout = () => { alert("Logged out successfully!"); go("login"); };

  return (
    <div className="app-shell">
      <header className="navbar">
        <div className="logo">EvoRES ErPM</div>
        <div className="nav-right">
          <div className="user-profile" onClick={() => setProfileOpen(!profileOpen)}>
            <i className="fa-solid fa-bell"/>
            <div className="avatar">EV</div>
            {profileOpen && <div className="profile-dropdown">
              <button onClick={() => go("profile")}><i className="fa-solid fa-user"/> Profile</button>
              <button onClick={() => go("announcements")}><i className="fa-solid fa-bullhorn"/> Announcements</button>
              <button onClick={() => go("tc")}><i className="fa-solid fa-file-contract"/> T&amp;C</button>
              <button className="danger" onClick={logout}><i className="fa-solid fa-right-from-bracket"/> Logout</button>
            </div>}
          </div>
          <button className="hamburger-btn" onClick={() => setCollapsed(!collapsed)} aria-label="Toggle Menu"><i className="fa-solid fa-bars"/></button>
        </div>
      </header>

      <div className="app-container">
        <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
          <ul className="sidebar-menu">
            {navItems.map(([id,label,icon]) => <li key={id}><button className={`nav-link ${page===id ? "active" : ""}`} onClick={() => go(id)}><i className={`fa-solid ${icon}`}/><span>{label}</span></button></li>)}
          </ul>
          <div className="sidebar-footer"><button className="logout-sidebar-btn" onClick={logout}><i className="fa-solid fa-right-from-bracket"/><span>Logout</span></button></div>
        </aside>

        <main className="main-content" onClick={() => profileOpen && setProfileOpen(false)}>
          {page === "dashboard" && <DashboardView />}
          {page === "wallet" && <WalletView walletTab={walletTab} setWalletTab={setWalletTab} filter={filter} bars={bars} walletFilter={walletFilter}/>}
          {simplePages[page] && <SimpleView data={simplePages[page]} />}
          {page === "profile" && <SimpleView data={["User Profile","Manage your personal credentials and avatar.","Alex Morgan","Role: Administrator / Manager\nEmail: alex.morgan@evores.com"]}/>}
          {page === "announcements" && <SimpleView data={["Announcements","Company updates, memos, and broadcast bulletins.","Recent Memos","No new company announcements at this time."]}/>}
          {page === "tc" && <SimpleView data={["Terms & Conditions","Review system usage policies and legal guidelines.","EvoRES ErPM Terms","All rights reserved. Unauthorized access is strictly monitored."]}/>}
        </main>
      </div>
    </div>
  );
}

function DashboardView() {
  const cards = [
    ["Today's Sales", "$14,280", "+8.2% vs yesterday", "fa-cart-shopping", "positive"],
    ["New Leads", "48", "+14 new today", "fa-user-plus", "positive"],
    ["Pending Orders", "12", "Requires action", "fa-box", "negative"],
    ["Support Tickets", "3", "Resolved quickly", "fa-headset", "positive"]
  ];
  return <section>
    <div className="page-header"><h1>Welcome, Alex Morgan</h1><p>Here is your primary quick-glance control center.</p></div>
    <div className="metrics-grid">{cards.map(([name,value,trend,icon,type]) => <div className="metric-card" key={name}>
      <div className="metric-info"><h3>{name}</h3><p className="metric-value">{value}</p><span className={`trend ${type}`}><i className={`fa-solid ${type==="positive" ? "fa-arrow-up" : "fa-clock"}`}/> {trend}</span></div>
      <div className="metric-icon gold"><i className={`fa-solid ${icon}`}/></div>
    </div>)}</div>
    <div className="card"><div className="card-header"><h3>Quick System Overview</h3></div><p className="muted">Use the sidebar to inspect analytics, wallet, manage your store and employees, or access your system suite modules.</p></div>
  </section>;
}

function SimpleView({ data }) {
  return <section><div className="page-header"><h1>{data[0]}</h1><p>{data[1]}</p></div><div className="card"><h3>{data[2]}</h3><p className="muted pre">{data[3]}</p></div></section>;
}

function WalletView({ walletTab, setWalletTab, filter, bars, walletFilter }) {
  return <section>
    <div className="page-header"><h1>Wallet</h1><p>Manage your funds, track spending, and review transaction ledgers.</p></div>
    <div className="wallet-top-card"><div><h3>Available Balance</h3><div className="wallet-balance-amount">$48,290.00</div></div><button className="add-funds-btn" onClick={() => alert("Add Funds gateway opened.")}><i className="fa-solid fa-plus-circle"/> Add Funds</button></div>
    <div className="card"><div className="card-header"><h3>Amount Spent Overview</h3><div className="card-actions">{["Day","Week","Month","Year","Till Date"].map(f => <button key={f} className={`filter-btn ${filter===f ? "active":""}`} onClick={() => walletFilter(f)}>{f}</button>)}</div></div><div className="chart-placeholder">{bars.map((h,i)=><div className="bar" key={i} style={{height:`${h}%`}}/>)}</div></div>
    <div className="wallet-toggle-tabs"><button className={`wallet-tab-btn ${walletTab==="added"?"active":""}`} onClick={()=>setWalletTab("added")}>Funds Added / Withdrawal</button><button className={`wallet-tab-btn ${walletTab==="spent"?"active":""}`} onClick={()=>setWalletTab("spent")}>Funds Spent</button></div>
    {walletTab==="added" ? <WalletTable title="Funds Added / Withdrawal Ledger" headers={["Date","Type","Amount"]} rows={[["Oct 24, 2026","Deposit","+$10,000.00","positive"],["Oct 18, 2026","Withdrawal","-$2,500.00","negative"],["Oct 05, 2026","Deposit","+$15,000.00","positive"]]}/> : <WalletTable title="Funds Spent Ledger" headers={["Date","Category","Spent"]} rows={[["Oct 25, 2026","Ad Campaigns","-$1,420.00","negative"],["Oct 20, 2026","Inventory Restock","-$4,800.00","negative"],["Oct 12, 2026","SaaS Subscriptions","-$650.00","negative"]]}/>}
  </section>;
}

function WalletTable({ title, headers, rows }) {
  return <div className="card table-card"><div className="card-header"><h3>{title}</h3></div><table className="transaction-table"><thead><tr>{headers.map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((r,i)=><tr key={i}><td>{r[0]}</td><td>{r[1]}</td><td><span className={`amount-badge ${r[3]}`}>{r[2]}</span></td></tr>)}</tbody></table></div>;
}