import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";

function Details() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMealDetails() {
      try {
        const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        setMeal(res.data.meals ? res.data.meals[0] : null);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchMealDetails();
  }, [id]);

  const ingredients = meal
    ? Array.from({ length: 20 }, (_, i) => i + 1)
        .map(n => ({ ingredient: meal[`strIngredient${n}`], measure: meal[`strMeasure${n}`] }))
        .filter(item => item.ingredient && item.ingredient.trim() !== "")
    : [];

  const steps = meal
    ? meal.strInstructions.split(/\r?\n/).filter(s => s.trim().length > 10)
    : [];

  return (
    <div style={{ backgroundColor: '#F7F7F7', minHeight: '100vh' }}>
      {/* Top breadcrumb bar */}
      <div style={{
        backgroundColor: 'white',
        padding: '14px 24px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Link to="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            color: '#FC8019', fontWeight: 600, fontSize: '14px',
            transition: 'opacity 0.2s',
          }}>
            <FaArrowLeft size={13} /> Back to Recipes
          </Link>
        </div>
      </div>

      {loading ? (
        /* Spinner */
        <div style={{ textAlign: 'center', padding: '120px 20px' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '50%',
            border: '4px solid #FFF3E0', borderTop: '4px solid #FC8019',
            margin: '0 auto 16px',
            animation: 'spin 0.8s linear infinite',
          }} />
          <p style={{ color: '#93959F', fontWeight: 500 }}>Loading recipe...</p>
        </div>
      ) : meal ? (
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px 56px' }}>

          {/* Hero card */}
          <div className="detail-hero">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              style={{ width: '100%', height: '380px', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              padding: '40px 36px',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
            }}>
              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '18px' }}>
                {meal.strCategory && (
                  <span style={tagStyle('#FFF3E0', '#FC8019')}>{meal.strCategory}</span>
                )}
                {meal.strArea && (
                  <span style={tagStyle('#F0F9FF', '#0EA5E9')}>{meal.strArea} Cuisine</span>
                )}
              </div>

              <h1 style={{
                fontSize: '28px', fontWeight: 800, color: '#3D4152',
                lineHeight: 1.3, marginBottom: '16px',
              }}>
                {meal.strMeal}
              </h1>

              <p style={{ color: '#93959F', fontSize: '14px', lineHeight: 1.7, marginBottom: '28px' }}>
                A delicious {meal.strArea ? meal.strArea + ' ' : ''}recipe — follow the step-by-step
                instructions below and enjoy a wonderful meal.
              </p>

              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={statBox}>
                  <span style={{ fontSize: '20px', fontWeight: 800, color: '#FC8019' }}>
                    {ingredients.length}
                  </span>
                  <span style={{ fontSize: '11px', color: '#93959F', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Ingredients
                  </span>
                </div>
                <div style={statBox}>
                  <span style={{ fontSize: '20px', fontWeight: 800, color: '#FC8019' }}>
                    {steps.length}
                  </span>
                  <span style={{ fontSize: '11px', color: '#93959F', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Steps
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Ingredients + Instructions */}
          <div className="detail-body">
            {/* Ingredients */}
            <div style={sectionCard}>
              <h2 style={sectionTitle}>Ingredients</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {ingredients.map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    backgroundColor: i % 2 === 0 ? '#F7F7F7' : 'white',
                    borderLeft: '3px solid #FC8019',
                  }}>
                    <span style={{ fontWeight: 600, color: '#3D4152', fontSize: '13px' }}>
                      {item.ingredient}
                    </span>
                    <span style={{ color: '#93959F', fontSize: '12px', fontWeight: 500, textAlign: 'right', maxWidth: '45%' }}>
                      {item.measure}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div style={sectionCard}>
              <h2 style={sectionTitle}>Instructions</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {steps.map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{
                      flexShrink: 0,
                      width: '28px', height: '28px', borderRadius: '50%',
                      background: 'linear-gradient(135deg, #FC8019, #e07314)',
                      color: 'white',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '12px', fontWeight: 700, marginTop: '2px',
                    }}>
                      {i + 1}
                    </div>
                    <p style={{ fontSize: '14px', color: '#535665', lineHeight: 1.75, margin: 0 }}>
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Not found */
        <div style={{ textAlign: 'center', padding: '100px 20px' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>❓</div>
          <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#3D4152', marginBottom: '8px' }}>
            Recipe not found
          </h3>
          <Link to="/" style={{ color: '#FC8019', fontWeight: 600 }}>← Go back to recipes</Link>
        </div>
      )}
    </div>
  );
}

function tagStyle(bg, color) {
  return {
    padding: '5px 14px', borderRadius: '20px',
    backgroundColor: bg, color,
    fontSize: '12px', fontWeight: 600,
  };
}

const statBox = {
  flex: 1,
  backgroundColor: '#F7F7F7',
  borderRadius: '12px',
  padding: '14px 16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4px',
};

const sectionCard = {
  backgroundColor: 'white',
  borderRadius: '20px',
  padding: '28px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
};

const sectionTitle = {
  fontSize: '18px',
  fontWeight: 700,
  color: '#3D4152',
  marginBottom: '20px',
};

export default Details;
