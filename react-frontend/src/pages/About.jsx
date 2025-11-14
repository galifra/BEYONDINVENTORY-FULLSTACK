import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page p-4 max-w-3xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-4">About This App</h2>

      {/* 🖼️ Official Beyond Inventory Logo */}
      <img
        src="/images/beyond-inventory-logo.png"
        alt="Beyond Inventory logo symbol representing organized storage and item tracking"
        style={{ width: "180px", margin: "20px auto", display: "block" }}
      />

      <p className="mb-2">
        Welcome to Beyond Inventory — a sleek and dynamic application designed to help you add, track,
        and manage your inventory items with ease.
      </p>

      <p className="mb-2">
        This app helps you organize your inventory efficiently by using intuitive design and
        interactive features, making inventory management simple and effective.
      </p>

      <p>
        Designed to help save you time and never lose anything again!
      </p>
    </div>
  );
};

export default About;
