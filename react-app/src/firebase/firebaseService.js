import { firestore } from './firebaseConfig';
import { collection, addDoc, getDocs, query, doc, deleteDoc, where } from 'firebase/firestore';


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



// brisanje določenega
export const deleteFavoriteById = async (favoriteId) => {
  try {
    const favoriteDocRef = doc(firestore, 'favorites', favoriteId);
    await deleteDoc(favoriteDocRef);
    console.log(`Izdelek s ID-jem ${favoriteId} je uspešno izbrisan`);
  } catch (e) {
    console.error(`Napaka pri brisanju izdelka s ID-jem ${favoriteId}: `, e);
  }
};



// brisanje vsega
export const deleteFavorites = async (collectionName) => {
  try {
    const q = query(collection(firestore, collectionName));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
      console.log(`Document with ID ${doc.id} successfully deleted`);
    });
    console.log(`Collection ${collectionName} successfully emptied`);
  } catch (e) {
    console.error(`Error emptying collection ${collectionName}: `, e);
  }
};
