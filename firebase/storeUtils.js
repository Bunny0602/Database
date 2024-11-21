import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "./firebaseConfig";

export const uploadImageAndSaveData = async (
  imageUri,
  title,
  description,
  cast,
  genre
) => {
  try {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const fileName = "images/" + Date.now();

    const storageRef = ref(storage, fileName);
    await uploadBytes(storageRef, blob);

    const imageUrl = await getDownloadURL(storageRef);

    const docRef = await addDoc(collection(db, "Trailer"), {
      title,
      description,
      cast,
      thumbnailUrl: imageUrl,
      genre,
    });

    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error uploading image and saving data: ", error);
  }
};
