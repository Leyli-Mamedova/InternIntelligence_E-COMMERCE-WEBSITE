import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: ''
  });

  const { register, login } = useAuth();
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  const handleCloseCart = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors('');

    // Проверка на пустые поля
    if (!formData.name.trim() || !formData.username.trim() || !formData.password.trim()) {
      setErrors('Please fill in all fields');
      return;
    }

    const isRegistered = await register(formData);
    if (isRegistered) {
      // вместо автоматического логина просто переходим на /login
      navigate('/login');
    } else {
      setErrors('User already exists');
    }
  };

  return (
    <section className='container-fluid position-relative signup-section' style={{ height: '100vh' }}>
      <button
        className="btn closing-btn text-black bg-white border-0 position-absolute bg-opacity-50 rounded-circle d-flex justify-content-center align-items-center"
        onClick={handleCloseCart}
        style={{ top: '2%', right: '2%', width: '40px', height: '40px' }}
      >
        <i className="fas fa-times fs-5"></i>
      </button>

      <div className='d-flex justify-content-center align-items-center h-100 rounded-3'>
        <form
          className='col-md-3 col-12 ratio-1x1 shadow-lg rounded-2 p-5 text-center signup-form'
          onSubmit={handleSubmit}
        >
          <div
            className='m-auto fa-user-div rounded-circle d-flex justify-content-center align-items-center mb-2'
            style={{ width: '80px', height: '80px' }}
          >
            <i className="fa-solid fa-user fs-1 text-white"></i>
          </div>

          <h2 className='pb-4 fw-semibold'>Sign up</h2>
          {errors && <p className='text-danger'>{errors}</p>}

          <input
            type="text"
            name='inp'
            className='mb-4 w-100 ps-2 py-2 border rounded-4 shadow signup-input'
            onChange={(e) => setFormData({ ...formData, name: e.target.value.trim() })}
            placeholder='Name'
          />

          <input
            type="text"
            name='user'
            className='mb-4 w-100 ps-2 py-2 border rounded-4 shadow signup-input'
            onChange={(e) => setFormData({ ...formData, username: e.target.value.trim() })}
            placeholder='Username'
          />

          <input
            type="password"
            name='pass'
            className='mb-4 w-100 ps-2 py-2 border rounded-4 shadow signup-input'
            placeholder="Password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value.trim() })}
          />

          <button className='btn btn-success w-100 rounded-5 mb-4 submit border-0'>Sign up</button>
          <Link to='/login' className='btn btn-link sign-up'>Login</Link>
        </form>
      </div>
    </section>
  );
};

export default Register;