import "../styles.css";
const Banner = ({ images, speed = 90000 }) => {
    return (
        <div className="inner position-relative w-100 overflow-hidden banner">
            <div className="wrapper position-absolute d-flex">
                <section className='d-flex' style={{ "--speed": `${speed}ms` }}>
                    {images.map(({ id, image }) => (
                        <div className="image" key={id}>
                            <img src={image} alt={id} />
                        </div>
                    ))}
                </section>
                <section className='d-flex' style={{ "--speed": `${speed}ms` }}>
                    {images.map(({ id, image }) => (
                        <div className="image" key={id}>
                            <img src={image} alt={id} />
                        </div>
                    ))}
                </section>
                <section className='d-flex' style={{ "--speed": `${speed}ms` }}>
                    {images.map(({ id, image }) => (
                        <div className="image" key={id}>
                            <img src={image} alt={id} />
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
};

export { Banner };
