import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext';

const About = () => {
    const { id } = useParams()
    const [data, setData] = useState(null)
    const [genre, setGenre] = useState({})
    const { currentUser } = useAuth()
    const { fetchCartCount } = useCart();
    const navigate = useNavigate()
    const [artists, setArtists] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Путь к вашему статичному файлу данных
    const DB_URL = '/InternIntelligence_E-COMMERCE-WEBSITE/db.json';

    // ФУНКЦИЯ ДОБАВЛЕНИЯ В КОРЗИНУ (через localStorage)
    const AddToCart = () => {
        if (currentUser?.id) {
            try {
                // 1. Берем текущую корзину из localStorage
                let cart = JSON.parse(localStorage.getItem('cart')) || [];

                // 2. Ищем, есть ли уже этот товар у текущего пользователя
                const existIndex = cart.findIndex(x => x.productId === data.id && x.userId === currentUser.id);

                if (existIndex !== -1) {
                    // Если товар есть, увеличиваем счетчик (макс 10)
                    if (cart[existIndex].count < 10) {
                        cart[existIndex].count += 1;
                    } else {
                        return;
                    }
                } else {
                    // Если товара нет, добавляем новый объект
                    const newItem = {
                        id: Date.now(), // Генерируем временный ID
                        productId: data.id,
                        userId: currentUser.id,
                        count: 1
                    };
                    cart.push(newItem);
                }

                // 3. Сохраняем обновленную корзину обратно
                localStorage.setItem('cart', JSON.stringify(cart));

                // Обновляем счетчик в шапке
                fetchCartCount(currentUser);
                alert('Product added to cart!');
            } catch (error) {
                console.error('Error while adding to cart:', error);
            }
        } else {
            navigate('/login');
        }
    };

    // ЗАГРУЗКА АРТИСТОВ
    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const res = await axios.get(DB_URL)
                setArtists(res.data.artists) // Берем массив из общего файла
            } catch (error) {
                console.error('Error when uploading artists:', error)
                setError('Error uploading artists data')
            }
        }
        fetchArtists()
    }, [])

    // ЗАГРУЗКА ДАННЫХ АЛЬБОМА
    const getData = async () => {
        try {
            const res = await axios.get(DB_URL)
            // Ищем нужный альбом по ID в массиве albums
            const album = res.data.albums.find(a => String(a.id) === String(id));
            setData(album)
        } catch (error) {
            console.error('Error when uploading an album:', error)
            setError('Error loading album data')
        }
    }

    // ЗАГРУЗКА ЖАНРА
    const getGenre = async (genreId) => {
        try {
            const res = await axios.get(DB_URL)
            const foundGenre = res.data.genres.find(g => String(g.id) === String(genreId));
            setGenre(foundGenre)
        } catch (error) {
            console.error('Error loading the genre:', error)
        }
    }

    useEffect(() => {
        getData()
    }, [id])

    useEffect(() => {
        if (data?.genreId) {
            getGenre(data.genreId)
        }

        if (data && artists.length > 0) {
            setLoading(false)
        }
    }, [data, artists])

    const albumArtist = data
        ? (artists || []).find(
            (artist) => String(artist.id) === String(data.artistId)
        )
        : null

    // --- Дальше ваш JSX (return) остается без изменений ---
    if (loading) { return (<div className="spinner-border text-primary"></div>) }
    if (error) { return (<div className="alert alert-danger">{error}</div>) }

    return (
        <section className='container-fluid about-page padding-massive'>
            {/* ... Весь ваш остальной JSX код ... */}
            {/* Кнопка остается такой же, она просто вызовет новую функцию AddToCart */}
            <button onClick={AddToCart} className="btn btn-primary border-0 card-button">Add to the cart</button>
            {/* ... */}
        </section>
    );
}

export default About;