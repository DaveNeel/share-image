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
    const fileName = `file.${extension}`; 
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
       'https://jb-glass-webapp2.s3.ap-south-1.amazonaws.com/frameColors/6635369fa7a9abf6de3ad4f5/WhatsApp%20Image%202024-05-07%20at%206-1715086242722.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA6ODU4UIR7KGJNQJR%2F20250121%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20250121T050921Z&X-Amz-Expires=432000&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmFwLXNvdXRoLTEiRjBEAiB0yPZWHB9LyP%2BndJMba6ILYfjCgRIEJFlCihNreZGg9QIgG3YDJfYSpjSxRH9x11tJkq3Lgkj%2BT9Afx7CoDm1Yjz4qyAUItv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw5OTIzODI1OTE1MjMiDG701pnF88ANlNQoeCqcBefjRRa8g7Gh58oMNLDEN6GggLWJ1LCYic6amVuVdslazeDnwlEUs2%2FFDTY%2BNvH2SZnztToBI1Rw4cQ1%2BEtVIDUe%2FxIz1m9LbSPFBOuxkuxj0QOsxRvVRVf8u7Flg2NIJAwovjk%2BUMJ%2B1l%2FWx1RRdEgjvbs4oOy2prKyPAI1Wc3jPSHCxGV9cDisZ2WD%2B0Aq147ApdiRMO7acqyBsyvwbR9ZrqL6Hv6BwfzVOx%2FSaJUni3iray5bEuhPPUTrKSogkZ0vE4uayo%2BKlLhocxTrX03ckg4DzATTxCuInoSOEYIrjJNI2LZnLMdNPgBg5n0%2BCRb7LwyI7sXPtgGtNiFqHQMYhIncG%2Fq1O6e99zc7UvLuYikR6CJYfgRX1z1MtRRqylrWfFv36zhYG2OWrpZFzY4XSDsJqa2%2Bev%2Fe80Upty%2Fes1e7LCVW1tOFTpj0RyZhXEDyUr%2BhRP8pdWJ6Duy%2BJGdWtFvh89mXeCpTFMYA3Sc6ffU%2BT8y0lJn4uuuYGfULkcGOGa%2BWJOxxR5SxcT7gXXEuMOUBt2a6nVdgsxdEFOIBtH6c%2Bol7249B0v7oSx9EXpvdTm8JWVUA4vynLBFUgiHLBG9pJyZmbYDHBfBURZHvOFsUWc37NvSKPZMnU2Oda27UdzsC6fxcyi0TDFI%2BQhYc3iiiQLtwKT%2BgZTDB8LJ5vqsHhX71Tw3e5QtAwSDJVSuX9MmuUbgHSRLaCZ%2BzaLV1T2%2F%2BmHsW3XYzp%2BSmoM7u%2BOcpJcuIyJWHHfDsAAYCpnRf%2FlBc0pcxcKjYplT2xQSfQmSKJiTNFvioQt6mGSCPfI7AuwV36qaR6bzstEiwAJV71g%2FmW0hVHvAOHYwbLGi1AlvbhWW%2FAxPn6hGlsCU2kSRu6iBT1pxk6xJyMInXvLwGOrIBIvkPHHfB43UwCoIQhPQZO%2BWkET1YZDljabUfpSGHeSKgqP1QfEnTWchM94AgeEnHudQ%2FbHRAjyCsL7ez6CP7uy648MUU2BdSIeWyyLCebcbcLEvKwvnOvoGKMSwEs8iiprWnLOwS6%2FqTWKhIxJjAKxapdUtjRdhObpB8JCi05IgPOb7ZYS%2FSatx9b7z6%2B0l1Pluch7EhPGqqt3tobIMmN4Yr1uYTXfrhgdyaGvPrWdPQCA%3D%3D&X-Amz-Signature=745bad5a37cdb9973f970f0e0eb62ec735123a366b3c45cf8118c5cd0c7523af&X-Amz-SignedHeaders=host&x-id=GetObject',
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
