import { useState, useEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import UserPage from "./pages/UserPage/UserPage";
import { storage } from "./services/firebaseStore";
import { Skeleton } from "@mui/material";

const getImageUrl = (imageName: string) => {
  const imageRef = ref(storage, imageName);
  return getDownloadURL(imageRef);
};
function App() {
  // const [imageUrl, setImageUrl] = useState<string | undefined>();

  // useEffect(() => {
  //   getImageUrl(
  //     "productos/categorias/alimento soya bebible/3-300x300.png",
  //   ).then((value) => setImageUrl(value));
  // }, []);

  return (
    <>
      <UserPage />
      {/* <div>
        {imageUrl ? (
          <img src={imageUrl} alt="" width={300} height={300} />
        ) : (
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={300}
            height={300}
          />
        )}
      </div> */}
    </>
  );
}

export default App;
