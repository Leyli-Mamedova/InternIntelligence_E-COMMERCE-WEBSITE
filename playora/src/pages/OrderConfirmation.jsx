// import React, { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const OrderConfirmation = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const orderDetails = location.state?.orderDetails || { total: '0.00' };

//     // Redirect to home if there's no order data (e.g., direct access)
//     useEffect(() => {
//         if (!location.state?.orderDetails) {
//             navigate('/');
//         }
//     }, [location.state, navigate]);

//     return (
//         <section className="container-fluid py-5" style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
//             <div className="row justify-content-center w-100">
//                 <div className="col-12 col-md-8 col-lg-6">
//                     <div className="card text-center p-5 shadow-lg rounded-4 border-0">
//                         <i className="fas fa-check-circle fa-5x text-success mb-4"></i>
//                         <h2 className="fw-bold mb-3">Thank you for your order!</h2>
//                         <p className="text-muted mb-4">Your payment was successful and your order has been placed.</p>
//                         <div className="text-start p-4 bg-light rounded-3">
//                             <h5 className="fw-bold mb-3">Order Details:</h5>
//                             <p><strong>Order Number:</strong> #{Math.floor(Math.random() * 1000000) + 1}</p>
//                             <p><strong>Total Amount:</strong> ${orderDetails.total}</p>
//                             <p className="mb-0">A confirmation email has been sent to your email address.</p>
//                         </div>
//                         <div className="mt-4">
//                             <button 
//                                 className="btn btn-primary rounded-3 me-2" 
//                                 onClick={() => navigate('/')}
//                             >
//                                 Return to the store
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default OrderConfirmation;