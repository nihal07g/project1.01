import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <h1 style={styles.logo}>Shopway</h1>
        <nav>
          <ul style={styles.navList}>
            <li style={styles.navItem}><a href="/" style={styles.navLink}>Home</a></li>
            <li style={styles.navItem}><a href="/products" style={styles.navLink}>Products</a></li>
            <li style={styles.navItem}><a href="/about" style={styles.navLink}>About</a></li>
            <li style={styles.navItem}><a href="/contact" style={styles.navLink}>Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '1rem 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  navList: {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0
  },
  navItem: {
    marginLeft: '1.5rem'
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    ':hover': {
      color: '#ddd'
    }
  }
};

export default Header; 