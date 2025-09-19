
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFav } from '../context/FavContext';

const Login = () => {
    const { fetchFavs } = useFav();
    const { currentUser } = useAuth();

    const { login } = useAuth();
    const [formData, setFormData] = useState({ name: '', password: '' });
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();


    const handleCloseCart = () => {
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Проверяем, заполнены ли поля
        if (!formData.name.trim() || !formData.password.trim()) {
            setErrors('Please fill in all fields');
            return; // Прерываем выполнение, пользователь должен заполнить форму
        }

        const isLogin = await login(formData);

        if (isLogin) {
            navigate("/");
        } else {
            setErrors('User does not exist');
        }
    };


    return (
        <section className='container-fluid position-relative login-section' style={{ height: '100vh' }}>
            <button
                className="btn closing-btn text-black bg-white border-0 position-absolute bg-opacity-50 rounded-circle d-flex justify-content-center align-items-center"
                onClick={handleCloseCart}
                style={{ top: '2%', right: '2%', width: '40px', height: ' 40px' }}
            >
                <i className="fas fa-times fs-5"></i>
            </button>

            <div className='d-flex justify-content-center align-items-center h-100 rounded-3'>
                <form
                    className='col-md-3 col-12 ratio-1x1 shadow-lg rounded-2 p-5 text-center login-form'
                    onSubmit={handleSubmit}
                >
                    <div
                        className='m-auto fa-user-div rounded-circle d-flex justify-content-center align-items-center mb-2'
                        style={{ width: '80px', height: '80px' }}
                    >
                        <i className="fa-solid fa-user fs-1 text-white"></i>
                    </div>

                    <h2 className='pb-4 fw-semibold'>Login</h2>
                    {errors && <p className='text-danger'>{errors}</p>}

                    <input
                        type="text"
                        name='inp'
                        className='mb-4 w-100 ps-2 py-2 border rounded-4 shadow login-input'
                        onChange={(e) => setFormData({ ...formData, name: e.target.value.trim() })}
                        placeholder='Username'
                    />

                    <input
                        type="password"
                        name='password'
                        className='mb-4 w-100 border ps-2 py-2 rounded-4 shadow login-input'
                        placeholder="Password"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value.trim() })}
                    />

                    <button className='btn btn-success w-100 rounded-5 mb-4 submit border-0'>Submit</button>

                    <a className='mb-3 d-inline-block text-decoration-none login-forgot' href="">Forgot Password?</a>
                    <p>
                        Don't have an account?
                        <Link to='/register' className='ps-1 btn btn-link sign-up'>Sign up</Link>
                    </p>
                </form>
            </div>
        </section>
    );
};

export default Login;
