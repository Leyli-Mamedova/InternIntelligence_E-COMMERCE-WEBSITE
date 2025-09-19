import ArtistCard from "./ArtistCard";

const albums = [
    {
        title: "I Said I Love You First",
        artist: "Selena Gomez",
        price: "$20.00",
        image: "https://store.selenagomez.com/cdn/shop/files/1stIMAGEIZHO-Music-Product-Mock-06-SB7-02copy.png?v=1739490912&width=800",
    },
    {
        title: "Wishbone",
        artist: "Conan Grey",
        price: "$13.99",
        image: "https://m.media-amazon.com/images/I/71gYO8a58uL._UF1000,1000_QL80_.jpg",
    },
    {
        title: "Mayhem",
        artist: "Lady Gaga",
        price: "$35.50",
        image: "https://d26olvxuieoyaa.cloudfront.net/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/9/7/602475451044.jpg",
    },
    {
        title: "MAGIC MAN 2",
        artist: "Jackson Wang",
        price: "$18.88",
        image: "https://jackson-wang.com/cdn/shop/files/2f1a44e596b142a9f6ecbb199d105d35.png?v=1745877686&width=1946",
    },
    {
        title: "KPop Demon Hunters",
        artist: "Demon Hunters",
        price: "$22.00",
        image: "https://images-na.ssl-images-amazon.com/images/I/513Fdeh2cuL._AC_UL600_SR600,600_.jpg",
    }
];

const TrendingAlbums = () => {
    return (
        <section className="pt-5 pb-2 py-md-5 trends">
            <h1 className="text-center fw-bold text-black mb-4 mt-2 mt-md-5 pt-4 ">
                Featured CD Albums
            </h1>
            <h5 className="text-center mb-5">
                Explore our top trending artists and their hit songs. Keep listening and be with Playora
            </h5>
            <div className="pb-4 pt-3">
                <div className="flex justify-content-center row g-0">
                    {albums.map((albums, index) => (
                        <div
                            key={index}
                            className={`col-md-2 col-12 d-flex flex-column ${index % 2 !== 0 ? "trending-artists" : ""}`}
                        >
                            <ArtistCard
                                title={albums.title}
                                artist={albums.artist}
                                price={albums.price}
                                image={albums.image}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrendingAlbums;