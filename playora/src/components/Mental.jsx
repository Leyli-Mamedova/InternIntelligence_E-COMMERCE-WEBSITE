import { useState } from "react";

function Mental() {
    const [rotated, setRotated] = useState(false);
    const handleClick = () => {
        setRotated(true);
        setTimeout(() => setRotated(false), 700)
    };

    return (
        <section className='mental py-2 pt-md-3 pb-md-5'>
            <div className="container d-flex py-5 flex-column flex-md-row">
                <div className='col-md-6 col-12 text-center'><img id='mental-image' style={{ width: '25rem', cursor:"pointer" }} src="https://muscharity.wordpress.com/wp-content/uploads/2020/10/music-for-charity-circular.png?w=1024"
                    alt="demo"
                    className={`${rotated ? "rotate" : ""}`}
                    onClick={handleClick} />
                </div>
                <div className='col-md-6 col-12 d-flex justify-content-center flex-column gap-1'>
                    <h1 className="text-black text-md-start text-center mt-4 mt-md-0">Change <i>lives</i> with every purchase</h1>
                    <h5 className='text-black text-md-start text-center mt-4 mt-md-0 mb-md-3 mb-0'>2% of Playora's annual sales is donated to charities supporting orphanages and children in need.</h5>
                    <div className="mt-3 text-black m-auto m-md-0"><a href="https://www.azuf.az/" className='btn d-inline mental-btn rounded-5'>Learn more</a></div>
                </div>
            </div>
        </section>

    );
}

export default Mental;