
window.runGeoPopup = function () {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(async (pos) => {
    const { latitude, longitude } = pos.coords;

    const url =
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

    const response = await fetch(url);
    const data = await response.json();

    const city = data?.address?.city || data?.address?.town || data?.address?.village || "Unknown City";
    const country = data?.address?.country || "Unknown Country";

    alert(`Hello Stranger from ${city}, ${country}!`);
  });
};
