import { useEffect, useState } from "react";

const profileImages = [
  {
    src: "https://media.licdn.com/dms/image/v2/D4E03AQE1Z3yGLa8zdA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1706864952290?e=1764201600&v=beta&t=67enqewtAyN12PkkJWS7kSBwlj8Dj-fL0jVhtd9Yoco",
    alt: "1",
  },
  {
    src: "https://avatars.githubusercontent.com/u/77072160?v=4",
    alt: "1",
  },
];

const PROFILE_IMAGE_ROTATION_MS = 5000;

const ProfileImage = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (profileImages.length < 2) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveImageIndex((previous) => (previous + 1) % profileImages.length);
    }, PROFILE_IMAGE_ROTATION_MS);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="relative h-44 w-44 overflow-hidden rounded-2xl">
      {profileImages.map((image, index) => (
        <img
          key={image.src}
          src={image.src}
          alt={image.alt}
          className={`absolute inset-0 h-full w-full rounded-2xl object-cover transition-opacity duration-700 ease-in-out ${
            index === activeImageIndex ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={index !== activeImageIndex}
          loading={index === 0 ? "eager" : "lazy"}
        />
      ))}
    </div>
  );
};

export default ProfileImage;
