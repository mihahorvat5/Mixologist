import { firestore } from './firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';


export const addFavorite = async (favorite) => {
  try {
    const docRef = await addDoc(collection(firestore, 'favorites'), favorite);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};


export const getFavorites = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'favorites'));
      let favorites = [];
      querySnapshot.forEach((doc) => {
        // Assuming the documents have a field named 'name'
        const data = doc.data();
        favorites.push({
          id: doc.id, // The ID of the document
          name: data.name, // The 'name' field of the document
          // Add other fields as needed
        });
      });
      return favorites;
    } catch (e) {
      console.error('Error fetching documents: ', e);
      return [];
    }
  };
