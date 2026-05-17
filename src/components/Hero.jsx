import React, { useState, useEffect } from 'react'
import './Hero.css'
import Navbar from './Navbar'
import { motion, AnimatePresence } from 'framer-motion'
import Slider from './Slider'

const juices = [
    {
        title: "ORANGE CREAM",
        desc: `Indulge in the smooth, nostalgic fusion of classic Coca-Cola with a rich orange cream twist.
               Bursting with citrusy sweetness and creamy notes, every sip delivers a refreshing yet indulgent experience.
               Perfectly balanced flavors create a velvety finish that feels both playful and bold.`,
        bg: "/images/i1-bg.png",
        img: "/images/i1.png",
        bgColor: "#d95500", 
      },
      {
        title: "COKE LIME",
        desc: `A crisp burst of zesty lime blended with the bold fizz of classic Coca-Cola.
               Each sip delivers a refreshing citrus punch that instantly energizes your senses.
               The sharp tang of lime perfectly cuts through the rich cola notes, creating a clean, balanced finish.`,
        bg: "/images/i2-bg.png",
        img: "/images/i2.png",
        bgColor: "#1b5a2e", 
      },
      {
        title: "COKE RASPBERRY",
        desc: `A bold splash of ripe raspberry infused into the classic fizz of Coca-Cola.
               Sweet, slightly tart, and irresistibly smooth, every sip delivers a vibrant berry burst.
               The juicy raspberry notes elevate the rich cola base, creating a playful yet refined flavor.`,
        bg: "/images/i3-bg.png",
        img: "/images/i3.png",
        bgColor: "#941133", 
      },
      {
        title: "COKE MANGO",
        desc: `A tropical splash of ripe mango blended with the bold fizz of classic Coca-Cola.
               Sweet, juicy, and irresistibly smooth, every sip delivers a burst of sunny mango flavor.
               The rich, pulpy mango notes perfectly balance the crisp cola bite for a refreshing twist.`,
        bg: "/images/i4-bg.png",
        img: "/images/i4.png",
        bgColor: "#e2600c", 
      },
      {
        title: "CHERRY COKE",
        desc: `A timeless blend of bold Coca-Cola fizz with a rich burst of ripe cherry flavor.
               Sweet, smooth, and slightly tart, every sip delivers a nostalgic yet elevated taste.
               The deep cherry notes enhance the classic cola base, creating a perfectly balanced finish.`,
        bg: "/images/i5-bg.png",
        img: "/images/i5.png",
        bgColor: "#940e1b", 
      },
      {
        title: "COKE APPLE",
        desc: `A juicy splash of red apple blended with the bold fizz of classic Coca-Cola.
               Sweet, crisp, and refreshingly smooth, every sip delivers a bright apple-forward taste.
               The rich red apple notes add a playful sweetness that perfectly complements the cola bite.`,
        bg: "/images/i6-bg.png",
        img: "/images/i6.png",
        bgColor: "#a31a1a", 
      }
]

const Hero = ({ onNavigate }) => {
  const [current, setCurrent] = useState(0)

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % juices.length)
  }

  const juice = juices[current]

  return (
    <div className="home-page-container">
      <div className="hero-wrapper">
      <div className="hero-backgrounds">
        {juices.map((j, index) => (
          <motion.div
            key={j.title}
            className="bg-layer"
            initial={{ opacity: 0 }}
            animate={{ opacity: current === index ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ 
              backgroundColor: j.bgColor, 
              zIndex: current === index ? 1 : 0,
              pointerEvents: 'none'
            }}
          />
        ))}
        <div className="bg-noise"></div>
      </div>

      <div className="hero-content">
        <div className="hero-text-section">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${current}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="hero-title">{juice.title}</h1>
              <p className="hero-desc">{juice.desc}</p>
              <button className="buy-btn" onClick={() => onNavigate && onNavigate('products')}>
                <span>Taste the Magic</span>
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="hero-visuals-section">
          <AnimatePresence mode="wait">
             <motion.div
               key={`bg-img-${current}`}
               className="backdrop-image"
               style={{ backgroundImage: `url(${juice.bg})` }}
               initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
               animate={{ opacity: 1, scale: 1, rotate: 0 }}
               exit={{ opacity: 0, scale: 1.1, rotate: 20 }}
               transition={{ duration: 0.8, ease: "easeOut" }}
             />
          </AnimatePresence>
          
          <div className="slider-container">
            <Slider juices={juices} currentIndex={current} onNext={handleNext} />
          </div>
        </div>
      </div>
      </div>
      
      {/* New Scrolling Section on Home Page */}
      <div className="trending-section">
        <div className="trending-content glass-panel">
          <div className="trending-text">
            <h2>The Classic Taste, Reimagined.</h2>
            <p>From the iconic original recipe to our exciting new fruity fusions, discover why Coca-Cola remains the world's favorite refreshment. Scroll down to explore our exclusive merchandise or visit the products page to stock up on your favorites.</p>
            <button className="buy-btn" onClick={() => onNavigate && onNavigate('about')}>
              <span>Learn Our History</span>
            </button>
          </div>
          <div className="trending-image">
            <img src="/images/i5.png" alt="Classic Refreshment" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero