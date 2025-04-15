'use client'
import React from 'react';
import Link from 'next/link';

function ErrorPage({ statusCode, message }) {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>
        {statusCode ? `Error ${statusCode}` : 'An error occurred'}
      </h1>
      <p style={styles.message}>{message || 'Something went wrong.'}</p>
      <Link href="/" style={styles.link}>
        Go back to Home
      </Link>
    </div>
  );
}

// Custom error handling for SSR (Server-Side Rendering)
ErrorPage.getInitialProps = async (context) => {
  const { res, err } = context;
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const message = err ? err.message : 'Something went wrong.';

  return { statusCode, message };
};

// Basic styling for the error page
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#f8f9fa',
    color: '#333',
    textAlign: 'center',
    padding: '20px',
  },
  header: {
    fontSize: '3rem',
    marginBottom: '20px',
  },
  message: {
    fontSize: '1.2rem',
    marginBottom: '20px',
  },
  link: {
    fontSize: '1.1rem',
    color: '#0070f3',
    textDecoration: 'none',
  },
};

export default ErrorPage;
