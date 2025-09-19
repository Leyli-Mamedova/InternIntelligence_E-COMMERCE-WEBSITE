const Contacts = () => {
    return (
        <section id="contact">
            <div className="number6 text-center text-light py-4 py-md-5">
                <div className="container">
                    <h1 className="fw-bold mt-5 mb-4">CONTACT US</h1>
                    <h5 className="mb-5 fs-6 fs-md-5"><em>Your feedback is important to us. Whether you have a question or a comment, please reach out.</em></h5>
                    <div className="general d-md-flex m-auto gap-4 d-flex-column">
                        <div className="inps w-75 m-auto">
                            <input className="w-100 fw-bold px-3 py-2 py-md-3 my-2 rounded-5" type="text" placeholder="Your Name" name="input"/>
                            <input className="w-100 fw-bold px-3 py-2 py-md-3 my-2 rounded-5" type="text" placeholder="Your Email" name="input"/>
                            <input className="w-100 fw-bold  px-3 py-2 py-md-3 my-2 rounded-5" type="tel" placeholder="Your Phone"  name="input"/>
                        </div>
                        <div className="inps1 w-75 pb-md-3 p-0 m-auto m-md-0">
                            <textarea className="h-100 w-100 text-dark fw-bold m-0 px-3 py-2 py-md-3 my-2 rounded-5 round" placeholder="Your Message" name="textarea"></textarea>
                        </div>
                    </div>
                    <button className="fw-bold my-md-5 my-2 contacts-btn rounded-5 rounded-md-2 px-5 py-2 py-md-3 px-md-4">SEND MESSAGE</button>
                </div>
            </div>
        </section>
    )
}

export default Contacts