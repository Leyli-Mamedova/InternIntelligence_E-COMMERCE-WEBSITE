import '../aboutUs.css'
const AboutUs = () => {
    return (
        <>
            <section className='about-us'>
                <div className="about-music py-5 px-2 px-md-0">
                    <h1 className="text-white text-center display-4 display-md-3 fw-bold mb-4">About The Music Shop</h1>
                    <div className="overflow-hidden about-us-div">
                        <p className="text-white col-12 col-md-6 left-animation fs-5 text-center text-md-start">Playora is more than a music store — it's a journey. We believe every great story has a soundtrack, and our mission is to help you find yours.
                        </p>
                        <div className="d-flex justify-content-end right-animation second fs-5 my-4 my-md-0"><p className=" text-white col-12 col-md-6 text-center text-md-end mb-0">We created this project because we ourselves are passionate about music and know how important it is to have access to quality albums.</p></div>
                        <p className=" text-white col-12 col-md-6 text-center text-md-start left-animation third fs-5"> We started with a simple idea: to gather everything a true music lover needs in one place. Today, we offer a wide selection of music releases, from legendary recordings to the latest albums that have just come out.
                        </p>
                        <div className="d-flex justify-content-end right-animation forth fs-5"><p className=" text-white col-12 col-md-6 text-center text-md-end mt-2 mt-md-0">Our goal is not just to sell music, but to help people find what they truly love. We believe that music is a part of our daily lives, and we want to make it accessible and convenient for everyone.</p></div>
                        <p className="mt-3 mt-md-4 text-white journey text-center center-animation fs-5">
                            Welcome to Playora. We hope you find something special for yourself here.</p>
                    </div>
                </div>
                <div className="about-albums pt-md-5 pt-3 pb-0">
                    <h1 className="pt-5 mb-5 text-center fw-bold display-3 text-white">Recent CD Releases</h1>
                    <div className="container-fluid">
                        <div className="row row justify-content-center flex-column flex-md-row gap-4 gap-md-0">
                            <div className="col-md-4 col-12 position-relative"><img className="w-100" src="https://cdn11.bigcommerce.com/s-ourux4doxk/images/stencil/1280x1280/products/8345/16015/01481436_Page-1z__58974.1727207412.jpg?c=1" alt="" />
                                <img style={{ aspectRatio: 1 / 1 }} className="spin-picture rounded-circle w-25 position-absolute z-1" src="https://static.insales-cdn.com/r/02lVHAeDD3s/rs:fit:1000:0:1/q:100/plain/images/products/1/1543/874907143/R-30702385-1716288835-6793.jpg@jpg" alt="" />
                            </div>
                            <div className="col-md-4 col-12 position-relative"><img className="w-100" src="https://s3.amazonaws.com/halleonard-closerlook/01865634/01865634_Page-1z.jpg" alt="" />
                                <img style={{ aspectRatio: 1 / 1 }} className="spin-picture rounded-circle w-25 position-absolute z-1" src="https://fr.shopping.rakuten.com/photo/34024094130_ML.jpg" alt="" />
                            </div>
                            <div className="col-md-4 col-12 position-relative"><img style={{ aspectRatio: 3 / 4 }} className="w-100" src="https://i.discogs.com/a29DsPRNc0kH5IbfTixX2SkyQOOkpVpENYN7P-nAU2w/rs:fit/g:sm/q:90/h:600/w:510/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI1NTY5/NTY4LTE2NzgzOTg4/NjYtMzkxNy5qcGVn.jpeg" alt="" />
                                <img style={{ aspectRatio: 1 / 1 }} className="spin-picture rounded-circle w-25 position-absolute z-1" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMWzAOHYH2JXlycSWZcSGGb9fIeLT4TyrR4g&s" alt="" />
                            </div>
                        </div>
                    </div>

                    <div className="px-md-5 px-2 py-5 about-delivery" id='music-delivery'>
                        <h1 className='mb-5 fw-bold display-3 text-white text-center pt-md-5 pt-4'>Delivery and Returns</h1>
                        <h5 className='mb-3 fw-bold text-white '>AZ Delivery:</h5>
                        <ul type='circle' className='ps-3 text-white '>
                            <li className='mb-1 text-white '>Orders $25 and over - FREE*</li>
                            <li className='mb-1 text-white '>Orders under $20 - $2.99 postage fee</li>
                            <li className='mb-1 text-white '>Express Delivery - $5.99</li>
                            <li className=" text-white ">Estimated delivery time: Standard 3–5 working days, Express 1–2 working days</li>
                        </ul>
                        <h5 className='mb-3 mt-5 fw-bold  text-white '>International Delivery:</h5>
                        <ul type='circle' className='ps-3'>
                            <li className='mb-1 text-white '>Delivery times vary depending on destination (usually 10–12 working days)</li>
                            <li className='mb-4 text-white '>International delivery costs will be calculated within the basket according to the size and weight of the parcel required. <a className='delivery-text fw-semibold' href="">Find out more here</a>.</li>
                        </ul>
                        <div>
                            <ul className='ps-0 d-flex align-items-center gap-2 mb-5'>
                                <li className='list-unstyled rounded-4 bg-light d-inline px-3 py-1'><a className=' text-black text-decoration-none fw-semibold' href="">Azerbaijan</a></li>
                                <li className='list-unstyled rounded-4 bg-light d-inline px-3 py-1'><a className=' text-black text-decoration-none fw-semibold' href="">Georgia</a></li>
                                <li className='list-unstyled rounded-4 bg-light d-inline px-3 py-1'><a className=' text-black text-decoration-none fw-semibold' href="">Turkey</a></li>
                            </ul>
                        </div>
                        <h4 className='mb-3 fw-bold text-white '>Returns</h4>
                        <ul type='circle' className='ps-3'>
                            <li className='mb-1 text-white '>We're happy to accept returns for unwanted items provided that they're returned within 14 days of receipt; unopened, unused and in perfect condition.</li>
                            <li className='mb-1 text-white '>Refunds are processed to your original payment method within 5–7 working days after we receive the returned item.</li>
                            <li className='mb-1 text-white '>Exchanges are not available – please place a new order if you’d like a replacement product.</li>
                            <li className=" text-white">Please visit the <a className='delivery-text fw-semibold' href="">Returns</a> section of our <a className='delivery-text fw-semibold' href="">Help Centre</a> for more details. </li>
                        </ul>
                    </div>
                </div>
            </section >

        </>
    )
}

export default AboutUs