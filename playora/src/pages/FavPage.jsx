import { useEffect, useState } from "react";
import axios from "axios";
import { useFav } from "../context/FavContext";
import { useNavigate } from "react-router-dom";

const FavPage = () => {
  const { favItems, removeFromFav } = useFav();
  const [products, setProducts] = useState([]);
  const [artists, setArtists] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, artistsRes] = await Promise.all([
          axios.get("http://localhost:3003/albums"),
          axios.get("http://localhost:3003/artists"),
        ]);
        setProducts(productsRes.data);
        setArtists(artistsRes.data);
      } catch (error) {
        console.error("Ошибка загрузки избранных:", error);
      }
      finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getProductById = (id) => products.find((p) => p.id === id);

  const getArtistByProduct = (product) => {
    if (!product) return null;
    return artists.find(
      (artist) => Number(artist.id) === Number(product.artistId)
    );
  };
  if (loading) {
    return (
      <div className="container-fluid py-4 fav-section" style={{ height: "100vh" }}>
      </div>
    );
  }
  return (
    <section className="container-fluid py-4 fav-section">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h2 fw-bold mb-0">Favorites</h1>
          </div>

          {favItems.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-heart fa-3x mb-3 text-muted"></i>
              <h3 className="text-black">Your favorites list is empty</h3>
              <p className="text-muted">Add albums to your favorites</p>
            </div>
          ) : (
            <div className="fav-items">
              {favItems.map((id) => {
                const product = getProductById(id);
                const artist = getArtistByProduct(product);

                if (!product) return null;

                return (
                  <div key={id} className="card mb-3 border-0 shadow-sm rounded-4">
                    <div className="card-body d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <img
                          src={product.photos}
                          className="img-fluid rounded-4 me-3"
                          alt={product.title}
                          style={{ width: "120px", height: "120px" }}
                        />
                        <div>
                          <h4 className="fw-bold mb-1">{product.title}</h4>
                          <p className="mb-1">{artist ? artist.name : "Unknown Artist"}</p>
                          <div>
                            <i className="fa-solid fa-star text-warning"></i>
                            <i className="fa-solid fa-star text-warning"></i>
                            <i className="fa-solid fa-star text-warning"></i>
                            <i className="fa-solid fa-star text-warning"></i>
                            <i className="fa-solid fa-star text-warning"></i>
                          </div>
                        </div>
                      </div>

                      <button
                        className="btn btn-link text-danger p-0"
                        onClick={() => removeFromFav(id)}
                        title="Remove from favorites"
                      >
                        <i className="fa-solid fa-heart fs-3"></i>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FavPage;



