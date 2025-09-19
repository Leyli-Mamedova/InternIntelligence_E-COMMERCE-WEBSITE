import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const FavContext = createContext();
export const useFav = () => useContext(FavContext);

export const FavProvider = ({ children }) => {
  const { currentUser } = useAuth()
  const [favItems, setFavItems] = useState(() => {
    return JSON.parse(localStorage.getItem('favs') || '[]') // from localstorage when start
  })

  // Загрузка серверных избранных
  const fetchFavs = (async (currentUser) => {

    if (currentUser) {
      try {
        const res = await axios.get('http://localhost:3003/fav');
        const userFavs = res.data.filter(item => item.userId === currentUser);
        const ids = userFavs.map(f => f.productId)
        console.log(userFavs);
        setFavItems(ids)
      } catch (error) {
        console.error("Ошибка загрузки серверных избранных:", error);
      }
    } else {
      setFavItems([])
    }
  });

  useEffect(() => {
    if (currentUser) {
      fetchFavs(currentUser.id);
    }
  }, [currentUser]);

  // Добавление в избранное
  const addToFav = async (albumId) => {
    if (currentUser) {
      try {
        const exists = await axios.get(
          `http://localhost:3003/fav?userId=${currentUser.id}&productId=${albumId}`
        );
        console.log(exists);

        if (exists.data.length === 0) {
          console.log("test");
          await axios.post("http://localhost:3003/fav", {
            userId: currentUser.id,
            productId: albumId,
          });
        }
        fetchFavs(currentUser.id)
      } catch (error) {
        console.error("Ошибка добавления в избранное:", error);
      }
    } else {
      const localFavs = JSON.parse(localStorage.getItem('favs') || '[]')
      if (!localFavs.includes(albumId)) {
        const newFavs = [...localFavs, albumId];
        localStorage.setItem('favs', JSON.stringify(newFavs));
        setFavItems(newFavs);
      }
    }
  };

  // Удаление из избранного
  const removeFromFav = async (albumId) => {
    if (currentUser) {
      try {
        const fav = await axios.get(
          `http://localhost:3003/fav?userId=${currentUser.id}&productId=${albumId}`
        );
        if (fav.data.length > 0) {
          await axios.delete(`http://localhost:3003/fav/${fav.data[0].id}`)
          fetchFavs();
        }
      } catch (error) {
        console.error("Ошибка удаления из избранного:", error);
      }
    } else {
      const localFavs = JSON.parse(localStorage.getItem('favs') || '[]')
      const newFavs = localFavs.filter(id => id !== albumId);
      localStorage.setItem('favs', JSON.stringify(newFavs));
      setFavItems(newFavs);
    }
  };

  // Проверка, есть ли альбом в избранном
  const isFav = (albumId) => favItems.includes(albumId);

  return (
    <FavContext.Provider
      value={{
        favItems,
        addToFav,
        removeFromFav,
        isFav,
        fetchFavs: (x) => fetchFavs(x),
      }}
    >
      {children}
    </FavContext.Provider>
  );
};