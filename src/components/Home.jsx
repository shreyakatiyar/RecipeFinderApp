import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHeart, FaSearch, FaTimes } from "react-icons/fa";

function SkeletonCard() {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden' }}>
      <div className="skeleton-box" style={{ height: '180px', borderRadius: 0 }} />
      <div style={{ padding: '14px 16px 16px' }}>
        <div className="skeleton-box" style={{ height: '16px', marginBottom: '8px' }} />
        <div className="skeleton-box" style={{ height: '14px', width: '60%', marginBottom: '14px' }} />
        <div className="skeleton-box" style={{ height: '38px', borderRadius: '10px' }} />
      </div>
    </div>
  );
}

function Home({ handleCount }) {
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchVal, setSearchVal] = useState("");
  const [singleCategory, setSingleCategory] = useState("");
  const [wishList, setWishList] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishList(saved);
    handleCount(saved.length);
  }, [handleCount]);

  useEffect(() => {
    handleCount(wishList.length);
  }, [wishList, handleCount]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
        setCategories(res.data.categories.map(c => c.strCategory));
      } catch (e) {
        console.error(e);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchMeals() {
      setLoading(true);
      try {
        const url = singleCategory
          ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${singleCategory}`
          : "https://www.themealdb.com/api/json/v1/1/search.php?s=";
        const res = await axios.get(url);
        setMeals(res.data.meals || []);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }
    fetchMeals();
  }, [singleCategory]);

  async function searchMeals(term) {
    setSearchVal(term);
    if (term.trim() === "") {
      setSingleCategory("");
      return;
    }
    setSingleCategory("");
    try {
      const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
      setMeals(res.data.meals || []);
    } catch (e) {
      console.error(e);
    }
  }

  function handleWishList(meal) {
    let updated = [...wishList];
    if (wishList.some(i => i.idMeal === meal.idMeal)) {
      updated = updated.filter(i => i.idMeal !== meal.idMeal);
    } else {
      updated.push(meal);
    }
    setWishList(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  }

  const isInWishList = (id) => wishList.some(i => i.idMeal === id);

  function selectCategory(cat) {
    setSingleCategory(cat);
    setSearchVal("");
  }

  return (
    <div style={{ backgroundColor: '#F7F7F7', minHeight: '100vh' }}>
      {/* Hero / Search Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #FC8019 0%, #e07314 100%)',
        padding: '52px 24px 88px',
        textAlign: 'center',
      }}>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>
          🍴 Thousands of recipes
        </p>
        <h1 style={{ color: 'white', fontSize: '36px', fontWeight: 800, marginBottom: '8px', lineHeight: 1.2 }}>
          What would you like to cook today?
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', marginBottom: '32px', fontWeight: 400 }}>
          Search dishes, explore cuisines, save your favourites
        </p>

        {/* Search box */}
        <div style={{ maxWidth: '560px', margin: '0 auto', position: 'relative' }}>
          <FaSearch style={{
            position: 'absolute', left: '18px', top: '50%',
            transform: 'translateY(-50%)', color: '#93959F', fontSize: '16px', zIndex: 1,
          }} />
          <input
            type="text"
            placeholder="Search for recipes or ingredients..."
            value={searchVal}
            onChange={e => searchMeals(e.target.value)}
            style={{
              width: '100%',
              padding: '17px 52px',
              borderRadius: '14px',
              border: 'none',
              fontSize: '15px',
              outline: 'none',
              boxShadow: '0 8px 28px rgba(0,0,0,0.18)',
              color: '#3D4152',
              fontFamily: 'Poppins, sans-serif',
            }}
          />
          {searchVal && (
            <FaTimes
              onClick={() => searchMeals("")}
              style={{
                position: 'absolute', right: '18px', top: '50%',
                transform: 'translateY(-50%)', color: '#93959F',
                cursor: 'pointer', fontSize: '16px',
              }}
            />
          )}
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 48px' }}>

        {/* Category chip bar — lifted up to overlap hero */}
        <div style={{ margin: '-40px 0 32px' }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            padding: '20px 24px',
          }}>
            <p style={{
              fontSize: '11px', fontWeight: 700, color: '#93959F',
              marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '1.2px',
            }}>
              Browse by Category
            </p>
            <div className="categories-scroll">
              <button
                onClick={() => selectCategory("")}
                style={pillStyle(singleCategory === "")}
              >
                All
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => selectCategory(cat)}
                  style={pillStyle(singleCategory === cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section heading */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#3D4152' }}>
            {singleCategory
              ? `${singleCategory} Recipes`
              : searchVal
              ? `Results for "${searchVal}"`
              : 'All Recipes'}
          </h2>
          {!loading && (
            <span style={{ fontSize: '13px', color: '#93959F', fontWeight: 500 }}>
              {meals.length} {meals.length === 1 ? 'recipe' : 'recipes'} found
            </span>
          )}
        </div>

        {/* Loading skeletons */}
        {loading ? (
          <div className="meal-card-grid">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : meals.length === 0 ? (
          /* Empty state */
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🍽️</div>
            <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#3D4152', marginBottom: '8px' }}>
              No recipes found
            </h3>
            <p style={{ color: '#93959F', fontSize: '15px' }}>
              Try a different search term or pick another category
            </p>
          </div>
        ) : (
          /* Recipe grid */
          <div className="meal-card-grid fade-in">
            {meals.map(meal => (
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
                  cursor: 'pointer',
                }}
              >
                {/* Image with overlay controls */}
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <Link to={`/details/${meal.idMeal}`}>
                    <img
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      style={{
                        width: '100%',
                        height: '180px',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.35s ease',
                        transform: hoveredCard === meal.idMeal ? 'scale(1.06)' : 'scale(1)',
                      }}
                    />
                  </Link>

                  {/* Favourite toggle */}
                  <button
                    onClick={() => handleWishList(meal)}
                    title={isInWishList(meal.idMeal) ? 'Remove from favourites' : 'Add to favourites'}
                    style={{
                      position: 'absolute', top: '10px', right: '10px',
                      width: '36px', height: '36px', borderRadius: '50%',
                      border: 'none', backgroundColor: 'white',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease',
                    }}
                  >
                    <FaHeart
                      size={15}
                      color={isInWishList(meal.idMeal) ? '#FC8019' : '#D4D5D9'}
                    />
                  </button>

                  {/* Category badge (only available from search results) */}
                  {meal.strCategory && (
                    <div style={{
                      position: 'absolute', bottom: '10px', left: '10px',
                      backgroundColor: 'rgba(0,0,0,0.55)',
                      color: 'white', padding: '3px 10px',
                      borderRadius: '20px', fontSize: '11px', fontWeight: 600,
                    }}>
                      {meal.strCategory}
                    </div>
                  )}
                </div>

                {/* Card body */}
                <div style={{ padding: '14px 16px 16px' }}>
                  <h3 style={{
                    fontSize: '14px', fontWeight: 600, color: '#3D4152',
                    marginBottom: '12px', lineHeight: '1.45',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {meal.strMeal}
                  </h3>
                  <Link
                    to={`/details/${meal.idMeal}`}
                    style={{
                      display: 'block', textAlign: 'center',
                      padding: '10px', borderRadius: '10px',
                      backgroundColor: '#FFF3E0', color: '#FC8019',
                      fontWeight: 600, fontSize: '13px',
                      transition: 'background 0.2s',
                    }}
                  >
                    View Recipe →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function pillStyle(active) {
  return {
    flexShrink: 0,
    padding: '8px 18px',
    borderRadius: '20px',
    border: '2px solid',
    borderColor: active ? '#FC8019' : '#E9E9EB',
    backgroundColor: active ? '#FFF3E0' : 'white',
    color: active ? '#FC8019' : '#686B78',
    fontWeight: 600,
    fontSize: '13px',
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap',
  };
}

export default Home;
