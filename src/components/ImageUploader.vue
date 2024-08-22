<template>
  <div class="image-uploader">
    <h2>Upload an Image and Convert to Base64</h2>

    <!-- Input for uploading the image -->
    <input type="file" @change="handleFileUpload" accept="image/*" />

    <!-- Display the Base64 string in a textarea and the image -->
    <div v-if="base64Image" class="preview">
      <h3>Base64 String:</h3>
      <textarea v-model="base64Image" rows="10" cols="50"></textarea>

      <h3>Preview Image:</h3>
      <img :src="base64Image" alt="Uploaded Image" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const base64Image = ref(null); // Base64 encoded image

    const handleFileUpload = (event) => {
      const file = event.target.files[0]; // Get the first file from the input
      if (file) {
        const reader = new FileReader(); // Create a FileReader instance

        reader.onload = (e) => {
          const img = new Image();
          img.src = e.target.result;

          img.onload = () => {
            const MAX_WIDTH = 420;
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Calculate the new height while maintaining the aspect ratio
            const scaleFactor = MAX_WIDTH / img.width;
            const newWidth = MAX_WIDTH;
            const newHeight = img.height * scaleFactor;

            // Set canvas dimensions
            canvas.width = newWidth;
            canvas.height = newHeight;

            // Draw the resized image onto the canvas
            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            // Convert canvas to Base64 string
            base64Image.value = canvas.toDataURL('image/jpeg');
          };
        };

        reader.readAsDataURL(file); // Read the file as a data URL (Base64)
      }
    };

    return {
      base64Image,
      handleFileUpload,
    };
  },
};
</script>

<style scoped>
.image-uploader {
  text-align: center;
  margin-top: 20px;
}

textarea {
  width: 100%;
  margin: 20px 0;
}

img {
  max-width: 300px;
  margin-top: 10px;
}

.preview {
  margin-top: 20px;
}
</style>
