import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaUtensils } from "react-icons/fa6";

function WishList({ handleCount }) {
  const [wishListItems, setWishListItems] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishListItems(saved);
    handleCount(saved.length);
  }, [handleCount]);

  useEffect(() => {
    handleCount(wishListItems.length);
  }, [wishListItems, handleCount]);

  function removeFromWishList(idMeal) {
    const updated = wishListItems.filter(m => m.idMeal !== idMeal);
    setWishListItems(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    handleCount(updated.length);
  }

  return (
    <div style={{ backgroundColor: '#F7F7F7', minHeight: '100vh' }}>
      {/* Page hero */}
      <div style={{
        background: 'linear-gradient(135deg, #FC8019 0%, #e07314 100%)',
        padding: '48px 24px 72px',
        textAlign: 'center',
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <FaHeart size={26} color="white" />
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'white' }}>My Favourites</h1>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', fontWeight: 400 }}>
          {wishListItems.length > 0
            ? `${wishListItems.length} recipe${wishListItems.length !== 1 ? 's' : ''} saved`
            : 'Recipes you love will appear here'}
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px 56px' }}>
        {wishListItems.length === 0 ? (
          /* Empty state */
          <div style={{ textAlign: 'center', padding: '60px 20px', marginTop: '-32px' }}>
            <div style={{
              width: '100px', height: '100px', borderRadius: '50%',
              backgroundColor: 'white',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px',
            }}>
              <FaUtensils size={40} color="#FC8019" />
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#3D4152', marginBottom: '8px' }}>
              No favourites yet
            </h3>
            <p style={{ color: '#93959F', fontSize: '15px', marginBottom: '28px' }}>
              Tap the heart icon on any recipe to save it here
            </p>
            <Link to="/" style={{
              display: 'inline-block',
              padding: '14px 36px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #FC8019, #e07314)',
              color: 'white',
              fontWeight: 700,
              fontSize: '15px',
              boxShadow: '0 4px 16px rgba(252,128,25,0.35)',
            }}>
              Browse Recipes
            </Link>
          </div>
        ) : (
          <div className="meal-card-grid fade-in" style={{ marginTop: '-20px' }}>
            {wishListItems.map(meal => (
              <div
                key={meal.idMeal}
                onMouseEnter={() => setHoveredCard(meal.idMeal)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: hoveredCard === meal.idMeal
                    ? '0 8px 28px rgba(0,0,0,0.16)'
                    : '0 2px 8px rgba(0,0,0,0.06)',
                  transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                  transform: hoveredCard === meal.idMeal ? 'translateY(-5px)' : 'translateY(0)',
                }}
              >
                {/* Image */}
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <Link to={`/details/${meal.idMeal}`}>
                    <img
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      style={{
                        width: '100%', height: '180px', objectFit: 'cover', display: 'block',
                        transition: 'transform 0.35s ease',
                        transform: hoveredCard === meal.idMeal ? 'scale(1.06)' : 'scale(1)',
                      }}
                    />
                  </Link>
                  {/* Orange heart badge */}
                  <button
                    onClick={() => removeFromWishList(meal.idMeal)}
                    title="Remove from favourites"
                    style={{
                      position: 'absolute', top: '10px', right: '10px',
                      width: '36px', height: '36px', borderRadius: '50%',
                      border: 'none', backgroundColor: 'white',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.18)', cursor: 'pointer',
                    }}
                  >
                    <FaHeart size={15} color="#FC8019" />
                  </button>
                </div>

                {/* Body */}
                <div style={{ padding: '14px 16px 16px' }}>
                  <h3 style={{
                    fontSize: '14px', fontWeight: 600, color: '#3D4152',
                    marginBottom: '12px', lineHeight: 1.45,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {meal.strMeal}
                  </h3>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Link to={`/details/${meal.idMeal}`} style={{
                      flex: 1, textAlign: 'center', padding: '10px',
                      borderRadius: '10px', backgroundColor: '#FFF3E0',
                      color: '#FC8019', fontWeight: 600, fontSize: '13px',
                    }}>
                      View Recipe
                    </Link>
                    <button onClick={() => removeFromWishList(meal.idMeal)} style={{
                      padding: '10px 14px', borderRadius: '10px',
                      backgroundColor: '#FFF0F0', border: 'none',
                      color: '#E53E3E', cursor: 'pointer',
                      fontSize: '12px', fontWeight: 600,
                      fontFamily: 'Poppins, sans-serif',
                    }}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default WishList;
