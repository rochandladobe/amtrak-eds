export default function decorate(block) {
  block.innerHTML = `
    <div class="booking-widget-inner">
      <div class="booking-tabs">
        <button class="booking-tab active" data-type="one-way">One-Way</button>
        <button class="booking-tab" data-type="round-trip">Round Trip</button>
        <a href="/rail-passes" class="booking-tab-link">Rail Passes</a>
      </div>
      <form class="booking-form" action="/book" method="get">
        <div class="booking-fields">
          <div class="booking-field">
            <label for="from-station">From</label>
            <input type="text" id="from-station" name="from" placeholder="City or Station" autocomplete="off"/>
          </div>
          <div class="booking-swap">
            <button type="button" aria-label="Swap stations" class="swap-btn">⇄</button>
          </div>
          <div class="booking-field">
            <label for="to-station">To</label>
            <input type="text" id="to-station" name="to" placeholder="City or Station" autocomplete="off"/>
          </div>
          <div class="booking-field">
            <label for="depart-date">Depart</label>
            <input type="date" id="depart-date" name="depart"/>
          </div>
          <div class="booking-field return-field" style="display:none">
            <label for="return-date">Return</label>
            <input type="date" id="return-date" name="return"/>
          </div>
          <div class="booking-field">
            <label for="travelers">Travelers</label>
            <select id="travelers" name="travelers">
              <option value="1">1 Traveler</option>
              <option value="2">2 Travelers</option>
              <option value="3">3 Travelers</option>
              <option value="4">4 Travelers</option>
              <option value="5">5+ Travelers</option>
            </select>
          </div>
          <div class="booking-submit">
            <button type="submit" class="find-trains-btn">FIND TRAINS</button>
          </div>
        </div>
      </form>
    </div>`;

  // Tab switching logic
  const tabs = block.querySelectorAll('.booking-tab');
  const returnField = block.querySelector('.return-field');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      if (tab.dataset.type === 'round-trip') {
        returnField.style.display = '';
      } else {
        returnField.style.display = 'none';
      }
    });
  });

  // Swap stations
  const swapBtn = block.querySelector('.swap-btn');
  const fromInput = block.querySelector('#from-station');
  const toInput = block.querySelector('#to-station');
  swapBtn?.addEventListener('click', () => {
    const temp = fromInput.value;
    fromInput.value = toInput.value;
    toInput.value = temp;
  });
}
