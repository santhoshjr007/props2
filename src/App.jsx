import React, { useState } from 'react';
import './App.css';

const initialProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "High-quality sound with noise cancellation.",
    image: "https://picsum.photos/300/200?random=1",
    avgRating: 4.2,
    totalRatings: 10
  },
  {
    id: 2,
    name: "Smartwatch",
    description: "Track your fitness and notifications.",
    image: "https://picsum.photos/300/200?random=2",
    avgRating: 3.8,
    totalRatings: 15
  },
  {
    id: 3,
    name: "Portable Speaker",
    description: "Powerful sound in a compact design.",
    image: "https://picsum.photos/300/200?random=3",
    avgRating: 4.5,
    totalRatings: 8
  }
];

function App() {
  const [products, setProducts] = useState(initialProducts);

  const handleRatingSubmit = (productId, newRating) => {
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        const newTotalRatings = product.totalRatings + 1;
        const newAvgRating = ((product.avgRating * product.totalRatings) + newRating) / newTotalRatings;
        return { ...product, avgRating: parseFloat(newAvgRating.toFixed(1)), totalRatings: newTotalRatings };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} className="product-image" />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Rating: {product.avgRating} ({product.totalRatings} ratings)</p>
          <RatingWidget productId={product.id} onRatingSubmit={handleRatingSubmit} />
        </div>
      ))}
    </div>
  );
}

function RatingWidget({ productId, onRatingSubmit }) {
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    if (rating > 0 && rating <= 5) {
      onRatingSubmit(productId, rating);
      setRating(0);
    } else {
      alert('Please select a rating between 1 and 5.');
    }
  };

  return (
    <div className="rating-widget">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} onClick={() => setRating(star)} style={{ cursor: 'pointer', color: rating >= star ? 'gold' : 'gray' }}>
          ★
        </span>
      ))}
      <button onClick={handleSubmit}>Submit Rating</button>
    </div>
  );
}

export default App;
