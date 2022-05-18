const GOOGLE_API_KEY = "AIzaSyBTDhzNNs6-Bc3JNAcDJeCJpuAIxtKNKtc";
// const lat = -20;
// const lon = -40;
//const zoom = 14;
const dim1 = 600;
const dim2 = 300;
const maptype = "roadmap";

// function getMapPreview (lat, lon, zoom, dim1, dim2, maptype) {
export function getMapPreview(lat, lon, zoom) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=${zoom}&size=${dim1}x${dim2}&maptype=${maptype}&markers=color:red%7Clabel:S%7C${lat},${lon}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
}

export async function getAddress(lat, lon) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GOOGLE_API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Não foi possível obter o endereço");
  }
  const data = await response.json();
  const address = data.results[0].formatted_address;

  return address;
}
