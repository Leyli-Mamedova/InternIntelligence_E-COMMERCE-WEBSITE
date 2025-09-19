const ArtistCard = ({ image, title, price, artist }) => {
    return (
        <div className="pt-4 text-center shadow-lg card trend-artist m-auto m-md-0" style={{width: '290px'}}>
            <img
                src={image}
                alt={title}
                className="mx-auto card-img-top rounded-circle w-75"
                style={{aspectRatio:1/1}}
            />
            <div className="card-body">
                <h3 className="text-black fw-semibold mb-2">{title}</h3>
                <p className="">{artist}</p>
                <p className="fw-semibold pb-4">{price}$</p>
            </div>
        </div>
    );
};

export default ArtistCard;