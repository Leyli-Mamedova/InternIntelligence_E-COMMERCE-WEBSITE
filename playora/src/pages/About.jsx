import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext';
import { useFav } from '../context/FavContext';

const About = () => {
    const { id } = useParams()
    const [data, setData] = useState(null)
    const [genre, setGenre] = useState({})
    const { currentUser } = useAuth()
    const { fetchCartCount } = useCart();
    const { favItems, addToFav, removeFromFav, isFav } = useFav();
    const navigate = useNavigate()
    const [artists, setArtists] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const AddToCart = async () => {
        if (currentUser?.id) {
            try {
                let cart = (await axios.get(`http://localhost:3003/cart`)).data;
                cart = cart.filter(x => x.userId == currentUser?.id);
                const exist = cart.find(x => x.productId == data.id);

                if (exist) {
                    if (exist.count < 10) {
                        await Plus(exist.id);
                    } else {
                        return; // Прекращаем выполнение функции
                    }
                } else {
                    const cartData = {
                        productId: data.id,
                        userId: currentUser.id,
                        count: 1
                    };
                    await axios.post("http://localhost:3003/cart", cartData);
                }

                fetchCartCount(currentUser);
            } catch (error) {
                console.error('Ошибка при добавлении в корзину:', error);
                alert('Не удалось добавить товар в корзину.');
            }
        } else {
            navigate('/login');
        }
    };
    const Plus = async (id) => {
        try {
            const res = (await axios.get(`http://localhost:3003/cart/${id}`)).data;
            res.count = res?.count + 1;
            await axios.put(`http://localhost:3003/cart/${id}`, res);
        } catch (error) {
            console.error('Ошибка при обновлении количества:', error);
        }
    };

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const res = await axios.get('http://localhost:3003/artists')
                setArtists(res.data)
            } catch (error) {
                console.error('Ошибка при загрузке артистов:', error)
                setError('Ошибка загрузки данных артистов')
            }
        }
        fetchArtists()
    }, [])

    const getData = async () => {
        try {
            const res = await axios.get(`http://localhost:3003/albums/${id}`)
            setData(res.data)
        } catch (error) {
            console.error('Ошибка при загрузке альбома:', error)
            setError('Ошибка загрузки данных альбома')
        }
    }

    const getGenre = async (genreId) => {
        try {
            const res = await axios.get(`http://localhost:3003/genres/${genreId}`)
            setGenre(res.data)
        } catch (error) {
            console.error('Ошибка при загрузке жанра:', error)
        }
    }

    useEffect(() => {
        getData()
    }, [id])

    useEffect(() => {
        if (data?.genreId) {
            getGenre(data.genreId)
        }

        // Если данные загружены и artists тоже загружены, убираем загрузку
        if (data && artists.length > 0) {
            setLoading(false)
        }
    }, [data, artists])

    // вычисляем артиста только когда есть data
    const albumArtist = data
        ? (artists || []).find(
            (artist) => String(artist.id) === String(data.artistId)
        )
        : null

    // Показываем индикатор загрузки
    if (loading) {
        return (
            <section className='container-fluid about-page padding-massive'>
                <div className='row justify-content-center'>
                    <div className='col-12 text-center py-5'>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    // Показываем ошибку если есть
    if (error) {
        return (
            <section className='container-fluid about-page padding-massive'>
                <div className='row justify-content-center'>
                    <div className='col-12 text-center py-5'>
                        <div className="alert alert-danger" role="alert">
                            <i className="fa-solid fa-triangle-exclamation me-2"></i>
                            {error}
                        </div>
                        <button
                            className="btn btn-primary mt-3"
                            onClick={() => window.location.reload()}
                        >
                            Try again
                        </button>
                    </div>
                </div>
            </section>
        )
    }
    const favorite = isFav(data?.id)
    const toggleFav = () => {
        if (!data) return
        if (favorite) {
            removeFromFav(data.id)
        } else {
            addToFav(data.id)
        }
    }

    return (
        <section className='container-fluid about-page padding-massive'>
            <div className='row justify-content-center gap-0 gap-md-5'>
                <div className='col-6'>
                    <div className='about-picture' style={{ width: '90%' }}>
                        <img className='w-100 h-100' src={data?.photos} alt='Picture of CD Albums' />
                    </div>
                    <div className='about-more text-black'>
                        <h4 className='mb-3 fw-bold' id='description'>Details</h4>
                        <div className='d-flex gap-md-5 flex-column flex-md-row'>
                            <p className='bold'><i className="fa-solid fa-calendar-days"></i> Released: <strong>{data?.release} </strong>
                            </p>
                            <p> <i className="fa-solid fa-align-justify"></i> Format:
                                <strong> CD Album</strong></p>
                        </div>
                    </div>
                    <div className='mt-4 text-black'>
                        <h3 className='mb-3 fw-bold'>Description</h3>
                        <p className='pe-3' id=''>{data?.desc}</p>
                    </div>
                    <div className='about-more text-black'>
                        <h3 className='mb-5 fw-bold'>Delivery and Returns</h3>
                        <h5 className='mb-3 fw-bold'>AZ Delivery:</h5>
                        <ul type='circle' className='ps-3'>
                            <li className='mb-1'>Orders $25 and over - FREE*</li>
                            <li className='mb-1'>Orders under $20 - $2.99 postage fee</li>
                            <li className='mb-1'>Express Delivery - $5.99</li>
                            <li>Estimated delivery time: Standard 3–5 working days, Express 1–2 working days</li>
                        </ul>
                        <h5 className='mb-3 mt-5 fw-bold text-black'>International Delivery:</h5>
                        <ul type='circle' className='ps-3'>
                            <li className='mb-1'>Delivery times vary depending on destination (usually 7–12 working days)</li>
                            <li className='mb-5'>International delivery costs will be calculated within the basket according to the size and weight of the parcel required. <a className='text-danger fw-semibold' href="">Find out more here</a>.</li>

                        </ul>
                        <h4 className='mb-3 fw-bold text-black'>Returns</h4>
                        <ul type='circle' className='ps-3'>
                            <li className='mb-1'>We're happy to accept returns for unwanted items provided that they're returned within 14 days of receipt; unopened, unused and in perfect condition.</li>
                            <li className='mb-1'>Refunds are processed to your original payment method within 5–7 working days after we receive the returned item.</li>
                            <li className='mb-1'>Exchanges are not available – please place a new order if you'd like a replacement product.</li>
                            <li>Please visit the <a className='text-danger fw-semibold' href="">Returns</a> section of our <a className='text-danger fw-semibold' href="">Help Centre</a> for more details. </li>
                        </ul>
                    </div>
                </div>
                <div className='col-md-4 col-6 text-black p-md-0'>
                    <h4 className='card-text fw-semibold mb-2'>{albumArtist ? albumArtist.name : 'Unknown Artist'}</h4>
                    <h1 className='fw-bold mb-4'>{data?.title}</h1>
                    <div className='d-flex justify-content-between align-items-center'>
                        <span className='fw-semibold fs-4'>${data?.price}</span>
                        <i onClick={toggleFav} className={`fa-heart fs-3 ${favorite ? "fa-solid fa-heart text-danger" : "fa-regular text-danger"}`}></i></div>
                    <div className='about-desc' >
                        <p className="clamp-4 text-gray-700 mb-0"><strong>Released: {data?.release}.</strong> {data?.desc}</p>
                        <a className='text-danger about-more-info' href="#description">More info</a>
                    </div>
                    <button onClick={AddToCart} className="btn btn-primary border-0 card-button py-md-2 py-1 d-flex justify-content-center mb-5 rounded-4">Add to the cart</button>
                    <div className='tracklist-list'> 
                        <h2 className='text-black pb-3 pt-4'>Tracklist:</h2>
                        <ol className='ps-4 pb-4 d-flex flex-column flex-wrap'>
                            {data.tracklist?.map((track, index) => (
                                <li className='text-black' key={index}>{track}</li>
                            ))}
                        </ol>
                    </div>

                    <div className='mt-5 bg-light px-3 pt-4 pb-5 text-black'>
                        <h4 className='fw-bold'>Delivery</h4>
                        <p className='pt-3'>*Free shipping in Azerbaijan for orders over 25 dollars</p>
                        <p className='mb-0' id='delivery'>Delivery is usually carried out within 24 hours.</p>
                        <div id='international'>
                            <h5 className='fw-bold'>Available for International Delivery</h5>
                            <ul className='ps-0 d-flex align-items-center gap-2 py-3 flex-column flex-md-row'>
                                <li className='list-unstyled rounded-4 bg-black d-inline px-3 py-1'><a className=' text-white text-decoration-none' href="">Azerbaijan</a></li>
                                <li className='list-unstyled rounded-4 bg-black d-inline px-3 py-1'><a className=' text-white text-decoration-none' href="">Georgia</a></li>
                                <li className='list-unstyled rounded-4 bg-black d-inline px-3 py-1'><a className=' text-white text-decoration-none' href="">Turkey</a></li>
                            </ul>
                            <span>All items ship directly from the Azerbaijan. Usually dispatched within 24 hours and delivered in 7 days.</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default About