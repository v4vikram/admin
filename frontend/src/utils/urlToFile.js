export const urlToFile = async (url, filename, mimeType) => {
  const res = await fetch(url);                   // Fetch the file from the server
  const buffer = await res.arrayBuffer();         // Read it as raw binary data
  return new File([buffer], filename, {           // Create a real File object
    type: mimeType,
  });
};
