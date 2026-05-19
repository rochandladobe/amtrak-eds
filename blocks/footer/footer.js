export default async function decorate(block) {
  const resp = await fetch('/footer.plain.html');

  if (!resp.ok) {
    // fallback footer
    block.innerHTML = `
      <div class="footer-content">
        <div class="footer-columns">
          <div class="footer-col">
            <h4>About Amtrak</h4>
            <ul>
              <li><a href="/about-amtrak">About Amtrak</a></li>
              <li><a href="/new-era-of-rail">A New Era of Rail</a></li>
              <li><a href="/news-media">News &amp; Media</a></li>
              <li><a href="/careers">Careers</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Traveling with Us</h4>
            <ul>
              <li><a href="/baggage-policy">Baggage Policy &amp; Services</a></li>
              <li><a href="/changing-reservation">Changing Your Reservation</a></li>
              <li><a href="/accessible-travel">Accessible Travel Services</a></li>
              <li><a href="/amtrak-vacations">Amtrak Vacations</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Site Tools</h4>
            <ul>
              <li><a href="/service-alerts">Service Alerts &amp; Notices</a></li>
              <li><a href="/terms">Terms and Conditions</a></li>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
              <li><a href="/contact-us">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <a href="/" class="footer-logo">
            <img src="/icons/amtrak-logo-white.svg" alt="Amtrak" width="100" height="33"/>
          </a>
          <div class="footer-social">
            <a href="https://www.facebook.com/amtrak" target="_blank" rel="noopener" aria-label="Facebook">
              <span class="icon icon-facebook"></span>
            </a>
            <a href="https://twitter.com/amtrak" target="_blank" rel="noopener" aria-label="Twitter">
              <span class="icon icon-twitter"></span>
            </a>
            <a href="https://www.instagram.com/amtrak" target="_blank" rel="noopener" aria-label="Instagram">
              <span class="icon icon-instagram"></span>
            </a>
          </div>
          <p class="footer-copyright">© 2026 National Railroad Passenger Corporation</p>
        </div>
      </div>`;
    return;
  }

  const html = await resp.text();
  block.innerHTML = html;
}
