import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        &copy; {new Date().getFullYear()} Made by Alexey Rudoy. Designed by Yandex.Praktikum.
      </p>
    </footer>
  );
}

export default Footer;