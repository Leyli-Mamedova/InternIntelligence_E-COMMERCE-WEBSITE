const Footer = () => {
  return (
    <footer className="bg-black container-fluid px-2 px-md-5 pt-5 pb-4">
      <div className="">
        <div className="d-flex pb-4 flex-column flex-md-row d-flex gap-5 gap-sm-0">
          <div className="col-12 col-md-3">
            <h4 className="text-white mb-4 fs-4 fw-semibold">About Playora</h4>
            <ul className="mb-2 mb-lg-0 list-unstyled w-100 d-flex flex-column gap-3">
              <li className="footer-item py-0">
                <a href='/#home' className="footer-link text-white text-decoration-none">Home</a>
              </li>
              <li className="footer-item py-0">
                <a href='#' className="footer-link text-white text-decoration-none">Albums</a>
              </li>
              <li className="footer-item py-0">
                <a className="footer-link text-white text-decoration-none" href='/aboutUs#music-delivery'>About Us</a>
              </li>
              <li className="footer-item py-0">
                <a className="footer-link text-white text-decoration-none" href="/contacts#contacts">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-3">
            <h4 className="text-white mb-4 fs-4 fw-semibold">My Playora</h4>
            <ul className="mb-2 mb-lg-0 list-unstyled w-100 d-flex flex-column gap-3">
              <li className="footer-item py-0">
                <a href='#' className="footer-link text-white text-decoration-none">My Orders</a>
              </li>
              <li className="footer-item py-0">
                <a href='#' className="footer-link text-white text-decoration-none">Purchase History</a>
              </li>
              <li className="footer-item py-0">
                <a href='#' className="footer-link text-white text-decoration-none">Buying Guides</a>
              </li>
              <li className="footer-item py-0">
                <a href='#' className="footer-link text-white text-decoration-none">Account Settings</a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-3">
            <h4 className="text-white mb-4 fs-4 fw-semibold">Help</h4>
            <ul className="mb-2 mb-lg-0 list-unstyled w-100 d-flex flex-column gap-3">
              <li className="footer-item py-0">
                <a className="footer-link text-white text-decoration-none" href='/aboutUs#music-delivery'>Customer Service</a>
              </li>
              <li className="footer-item py-0">
                <a className="footer-link text-white text-decoration-none" href='/aboutUs#music-delivery'>Shipping</a>
              </li>
              <li className="footer-item py-0">
                <a className="footer-link text-white text-decoration-none" href='/aboutUs#music-delivery'>Returns</a>
              </li>
              <li className="footer-item py-0">
                <a className="footer-link text-white text-decoration-none" href='/aboutUs#music-delivery'>International Shipments</a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-3">
            <h2 className="text-white pe-5 fs-5 mb-4">Playora — your gateway to timeless albums and new releases.</h2>
            <div className="d-flex gap-4">
              <a href="/" className="text-white fs-4 footer-icon"><i className="fa-brands fa-instagram"></i></a>
              <a href="/" className="text-white fs-4 footer-icon"><i className="fa-brands fa-x-twitter"></i></a>
              <a href="/" className="text-white fs-4 footer-icon"><i className="fa-brands fa-facebook"></i></a>
              <a href="/" className="text-white fs-4 footer-icon"><i className="fa-brands fa-whatsapp"></i></a>
              <a href="/" className="text-white fs-4 footer-icon"><i className="fa-brands fa-youtube"></i></a>
              <a href="/" className="text-white fs-4 footer-icon"><i className="fa-brands fa-tiktok"></i></a>
            </div>
          </div>
        </div>
        <div className="text-white d-flex align-items-center justify-content-between border-top pt-3 col-12 flex-column flex-md-row">
          <p className="mb-0 opacity-75 col-12 col-md-6 mb-2 mb-md-0 justify-content-md-start" style={{fontSize: '14px'}}>© 2025 Playora. All rights reserved.</p>
          <div className="d-flex align-items-center justify-content-start justify-content-md-end col-12 col-md-6">
            <div className="" style={{ width: "8%" }}><img className="w-100 h-100" src="https://static.vecteezy.com/system/resources/thumbnails/056/419/953/small/headphones-icon-in-purple-and-pink-button-free-png.png" alt="" /></div>
            <p className="mb-0 opacity-75" style={{fontSize: '14px'}}>Created by Mamedova Leyli</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer