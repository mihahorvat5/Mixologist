import { firestore } from './firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';


export const addFavorite = async (favorite) => {
  try {
    const q = query(collection(firestore, 'favorites'), where('Name', '==', favorite.Name));

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      const docRef = await addDoc(collection(firestore, 'favorites'), favorite);
      console.log('Document written with ID: ', docRef.id);
    } else {
      console.log('Document with the same name already exists');
    }
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};


export const getFavorites = async () => {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'favorites'));
    let favorites = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      favorites.push({
        id: doc.id,
        name: data.Name, 
        ingredients: data.Ingredients, 
        howToMake: data.HowToMake, 
        category: data.Category,
        slike: data.slike
      });
    });
    return favorites;
  } catch (e) {
    console.error('Error fetching documents: ', e);
    return [];
  }
};

