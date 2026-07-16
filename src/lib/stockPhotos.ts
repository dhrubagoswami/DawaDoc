// Free-to-use photos from Unsplash (Unsplash License — free for commercial
// use, no attribution required). Requested at a fixed size via Unsplash's
// image CDN for performance.
function unsplash(id: string, width: number) {
  return `https://images.unsplash.com/${id}?w=${width}&q=75&auto=format&fit=crop`;
}

export const stockPhotos = {
  heroElderlyMan: unsplash("photo-1488820098099-8d4a4723a490", 700),
  elderlyWomanPortrait: unsplash("photo-1695556746353-b45f7a329777", 500),
  elderlyWomanLaughing: unsplash("photo-1616286608358-0e1b143f7d2f", 500),
};
