import React from "react";

const urlToObject = async (url: string): Promise<File> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }
    // const blob = await response.blob();
    // return new File([blob], "image.jpg", { type: blob.type });
    const blob = await response.blob();
    const mimeType = blob.type; 
    console.log("mimeType:- ",mimeType)
    const extension = mimeType.split("/")[1]; 
    console.log("extension:- ",extension)
    const fileName = `file.${extension}`; // Dynamically set the file name with the correct extension
    return new File([blob], fileName, { type: mimeType });

  } catch (error) {
    console.error("Error converting URL to file:", error);
    throw error;
  }
};

const testWebShare = async (imageUrls: string[], text: string) => {
    console.log("navigator:- ",navigator)
  if (!navigator.share) {
    alert("Web Share API is not supported on this browser.");
    return;
  }

  try {
    const filePromises = imageUrls.map((url) => urlToObject(url));
    const files = await Promise.all(filePromises);

    if (!navigator.canShare || !navigator.canShare({ files })) {
      alert("This device/browser does not support file sharing.");
      return;
    }

    await navigator.share({
      text: text,
      files: files,
    });

    console.log("Files shared successfully!");
  } catch (error) {
    console.error("Error during sharing:", error);
    alert("An error occurred while sharing files.");
  }
};

const ShareButton: React.FC = () => {
  const handleShare = () => {
    const imageUrls = [
       'https://res.cloudinary.com/deas6gla3/image/upload/v1736341550/cld-sample-3.jpg',
       'https://res.cloudinary.com/deas6gla3/image/upload/v1736341550/cld-sample-5.jpg',
       'https://res.cloudinary.com/deas6gla3/image/upload/v1736341550/cld-sample-4.jpg',
       'https://jb-glass-webapp2.s3.ap-south-1.amazonaws.com/website/glass-catalogue-assets/decorative/0.jpg'
    ]; // Add more URLs as needed
    const text = "Check out these images!";
    testWebShare(imageUrls, text);
  };

  return (
    <button onClick={handleShare} className="btn btn-primary">
      Share Images
    </button>
  );
};

export default ShareButton;
