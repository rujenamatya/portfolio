
window.runGeoPopup = function () {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(async (pos) => {
    const { latitude, longitude } = pos.coords;

    const url =
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Portfolio-Rujen-Amatya/1.0 (https://portfolio-rujen-amatya.vercel.app)',
          'Referer': 'https://portfolio-rujen-amatya.vercel.app'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();

      const city = data?.address?.city || data?.address?.town || data?.address?.village || "Unknown City";
      const country = data?.address?.country || "Unknown Country";

      alert(`Hello Stranger from ${city}, ${country}!`);
    } catch (error) {
      console.error('Geolocation fetch failed:', error);
    }
  }, (error) => {
    console.error('Geolocation error:', error);
  });
};
