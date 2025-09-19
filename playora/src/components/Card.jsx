import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext';
import { useFav } from '../context/FavContext';
const Card = ({ data, artists }) => {
    const { currentUser } = useAuth()
    const { fetchCartCount } = useCart();
    const { isFav, addToFav, removeFromFav } = useFav();
    const navigate = useNavigate()
    const albumArtist = artists.find(artist => artist.id == data.artistId);

    const handleFav = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isFav(data.id)) {
            await removeFromFav(data.id);
        } else {
            await addToFav(data.id);
        }
    };


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
                console.error('Error when adding to the cart:', error);
                alert("Couldn't add the product to the cart.");
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
            console.error('Error when updating the quantity:', error);
        }
    };

    const heartClass = `fa-heart fs-5 text-danger ${isFav(data?.id) ? 'fa-solid' : 'fa-regular'}`;
    return (
        <div className="col-6 col-md-3">
            <div className='card rounded-4 border-0' >
                <Link to={`/about/${data.id}`}>
                    <img src={data.photos} className="card-img-top rounded-4 rounded-bottom-0" style={{ aspectRatio: 1 / 1 }} alt={data.title} />
                </Link>
                <div className="card-body position-relative">
                    <Link to={`/about/${data.id}`} className=" text-decoration-none text-black">
                        <h5 className="card-title fw-semibold mb-2">{data.title}</h5>
                    </Link>
                    <p className="card-text mb-3">{albumArtist ? albumArtist.name : "Unknown Artist"}</p>
                    <div className="col-12 mb-2 mb-md-3">
                        <i className="fa-solid fa-star text-warning p-0 m-0"></i><i className="fa-solid fa-star text-warning"></i><i className="fa-solid fa-star text-warning"></i><i className="fa-solid fa-star text-warning"></i><i className="fa-solid fa-star text-warning"></i>
                    </div>
                    <div className='d-flex justify-content-between align-items-center mb-3 mb-md-4'>
                        <p className="card-text fw-semibold mb-0">{data.price}$</p>
                        <i className={heartClass} onClick={handleFav} style={{ top: '21%', right: '5%' }}></i>
                    </div>
                    <button onClick={AddToCart} className="btn btn-primary border-0 card-button rounded-4 w-100 ps-3 py-2">Add to cart</button>
                </div>
            </div>
        </div>
    );
}

export default Card;
