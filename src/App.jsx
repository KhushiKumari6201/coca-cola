import { useState } from 'react'
import './App.css'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import ProductsPage from './pages/ProductsPage'
import AdminDashboard from './pages/AdminDashboard'
import CartPage from './pages/CartPage'
import SellerDashboard from './pages/SellerDashboard'
import GenericPage from './pages/GenericPage'
import AboutPage from './pages/AboutPage'
import Footer from './components/Footer'
import ContactPage from './pages/ContactPage'
import RewardsPage from './pages/RewardsPage'
import MerchPage from './pages/MerchPage'

import LegalPage from './pages/LegalPage'

// Data for Privacy
const privacyData = {
  title: "Privacy Policy",
  lastUpdated: "May 15, 2026",
  sections: [
    {
      heading: "1. Information We Collect",
      paragraphs: [
        "At Coca-Cola, we collect information that you provide directly to us, such as when you create an account, make a purchase, or subscribe to our newsletter. This may include your name, email address, shipping address, and payment details.",
        "We also automatically collect certain technical data when you interact with our website, including your IP address, browser type, and device information."
      ]
    },
    {
      heading: "2. How We Use Your Information",
      paragraphs: [
        "We use the information we collect to process your transactions, deliver your orders, and provide customer support.",
        "Additionally, we may use your data to personalize your experience, send you promotional offers, and improve our platform's functionality and security."
      ]
    },
    {
      heading: "3. Data Sharing and Security",
      paragraphs: [
        "We do not sell your personal information to third parties. We may share your data with trusted service providers who assist us in operating our website, conducting our business, or servicing you.",
        "We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or disclosure."
      ]
    }
  ]
};

// Data for Terms
const termsData = {
  title: "Terms of Service",
  lastUpdated: "May 15, 2026",
  sections: [
    {
      heading: "1. Acceptance of Terms",
      paragraphs: [
        "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services."
      ]
    },
    {
      heading: "2. User Conduct",
      paragraphs: [
        "You agree to use our website only for lawful purposes. You are prohibited from posting or transmitting to or from this site any unlawful, threatening, libelous, defamatory, obscene, scandalous, inflammatory, pornographic, or profane material."
      ]
    },
    {
      heading: "3. Product Purchases",
      paragraphs: [
        "All purchases through our site are subject to product availability. We reserve the right to limit the quantities of any products or services that we offer. Prices for our products are subject to change without notice."
      ]
    }
  ]
};

// Data for Cookie
const cookieData = {
  title: "Cookie Policy",
  lastUpdated: "May 15, 2026",
  sections: [
    {
      heading: "1. What Are Cookies",
      paragraphs: [
        "Cookies are small text files that are placed on your computer or mobile device when you browse websites. They are widely used to make websites work, or work more efficiently, as well as to provide reporting information to site owners."
      ]
    },
    {
      heading: "2. How We Use Cookies",
      paragraphs: [
        "We use essential cookies to enable core functionality of our website, such as managing your shopping cart and secure checkout.",
        "We also use performance and analytics cookies to understand how visitors interact with our website, which helps us improve our user experience."
      ]
    },
    {
      heading: "3. Managing Cookies",
      paragraphs: [
        "Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience."
      ]
    }
  ]
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Hero onNavigate={setCurrentPage} />;
      case 'products': return <ProductsPage />;
      case 'admin': return <AdminDashboard />;
      case 'seller': return <SellerDashboard />;
      case 'cart': return <CartPage />;
      case 'about': return <AboutPage />;
      case 'rewards': return <RewardsPage onNavigate={setCurrentPage} />;
      case 'merch': return <MerchPage />;
      case 'contact': return <ContactPage />;
      case 'privacy': return <LegalPage {...privacyData} />;
      case 'terms': return <LegalPage {...termsData} />;
      case 'cookie': return <LegalPage {...cookieData} />;
      default: return <Hero onNavigate={setCurrentPage} />;
    }
  }

  return (
    <>
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      {renderPage()}
      <Footer onNavigate={setCurrentPage} />
    </>
  )
}

export default App