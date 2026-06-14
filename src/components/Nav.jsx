import React from 'react'
import { FaHeart, FaUtensils } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Nav({ count }) {
  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: '#FFFFFF',
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      height: '72px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #FC8019, #e07314)',
            borderRadius: '10px',
            width: '42px',
            height: '42px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(252,128,25,0.35)',
          }}>
            <FaUtensils color="white" size={18} />
          </div>
          <div>
            <div style={{ fontSize: '20px', fontWeight: 800, lineHeight: 1.1 }}>
              <span style={{ color: '#FC8019' }}>Recipe</span>
              <span style={{ color: '#3D4152' }}>Finder</span>
            </div>
            <div style={{ fontSize: '11px', color: '#93959F', fontWeight: 500, letterSpacing: '0.4px' }}>
              Discover &amp; Save Recipes
            </div>
          </div>
        </Link>

        {/* Favourites button */}
        <Link to="/wishlist" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 20px',
          borderRadius: '10px',
          border: '2px solid #FC8019',
          color: '#FC8019',
          fontWeight: 600,
          fontSize: '14px',
          backgroundColor: count > 0 ? '#FFF3E0' : 'transparent',
          transition: 'all 0.2s ease',
        }}>
          <FaHeart size={15} />
          <span>Favourites</span>
          {count > 0 && (
            <span style={{
              background: '#FC8019',
              color: 'white',
              borderRadius: '50%',
              width: '22px',
              height: '22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: 700,
            }}>
              {count}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
