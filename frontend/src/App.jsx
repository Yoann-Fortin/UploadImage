import { useState } from "react";

function App() {
  const [image, setImage] = useState(null); // Initialisez le state à null pour indiquer l'absence d'image sélectionnée

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (image) {
      // Vérifiez si une image a été sélectionnée
      const formData = new FormData();
      formData.append("image", image); // Utilisez le même clé 'image' que celle attendue par le back-end

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
          {
            method: "POST",
            body: formData, // Pas besoin d'en-tête 'Content-Type', il est défini automatiquement par le navigateur, autrement il faut gérer des Boundary
          }
        );

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();
        console.info("Upload success", result);
      } catch (err) {
        console.error("Upload error", err);
      }
    } else {
      console.info("No image selected");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="image">Upload image</label>
      <input
        id="image"
        onChange={(e) => setImage(e.target.files[0])}
        type="file"
        accept="image/*"
      />
      <button type="submit">Upload</button>
    </form>
  );
}

export default App;
