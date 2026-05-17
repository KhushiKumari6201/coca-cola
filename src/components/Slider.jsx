import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Slider.css";

const Slider = ({ juices, currentIndex, onNext }) => {
  return (
    <div className="slider-wrapper">
      <div className="slider-bottles">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={`bottle-${currentIndex}`}
            src={juices[currentIndex].img}
            alt={juices[currentIndex].title}
            className="main-bottle"
            initial={{ opacity: 0, scale: 0.8, x: 200, rotate: 15 }}
            animate={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -200, rotate: -15 }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
          />
        </AnimatePresence>
        
        <div className="next-bottle-wrapper" onClick={onNext}>
          <div className="next-bottle-inner">
            <motion.img
              key={`next-bottle-${(currentIndex + 1) % juices.length}`}
              src={juices[(currentIndex + 1) % juices.length].img}
              alt="Next Flavor"
              className="next-bottle"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 0.6, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            />
          </div>
          <div className="next-indicator">
            <span>Next</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;