import React from 'react';
import styles from '../styles/Home.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            Powered by{' '} <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </footer>
    );
}

export default Footer
