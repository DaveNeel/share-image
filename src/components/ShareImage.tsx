import React from "react";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";

interface ShareImageProps {
  imageUrl: string;
}

const imageUrls = [
    'https://res.cloudinary.com/deas6gla3/image/upload/v1736341550/cld-sample-3.jpg'
// "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
// "https://jb-glass-webapp2.s3.ap-south-1.amazonaws.com/website/glass-catalogue-assets/common/waltz-logo.png"
];

const ShareImage: React.FC<ShareImageProps> = ({ imageUrl }) => {
  const shareUrl = imageUrl; // Change this to your app's URL

  return (
    <div className="container text-center mt-4">
      <h3>Share this Image</h3>
      <img
        src={imageUrl}
        alt="To Share"
        className="img-fluid mb-3"
        style={{ maxWidth: "300px", borderRadius: "8px" }}
      />
      <div className="d-flex justify-content-center gap-3">
        <FacebookShareButton url={shareUrl} quote="Check out this image!">
          <FacebookIcon size={40} round />
        </FacebookShareButton>
        <WhatsappShareButton url={shareUrl} title="Check out this image!">
          <WhatsappIcon size={40} round />
        </WhatsappShareButton>
        <TwitterShareButton url={shareUrl} title="Check out this image!">
          <TwitterIcon size={40} round />
        </TwitterShareButton>
        <LinkedinShareButton url={shareUrl}>
          <LinkedinIcon size={40} round />
        </LinkedinShareButton>
      </div>

    </div>
  );
};

export default ShareImage;
