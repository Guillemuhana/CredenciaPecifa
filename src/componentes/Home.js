import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import escudo2014 from './assets/escudo2014.png';
import fondo06 from './assets/fondo06.jpg';

const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/carnet-digital');
    } catch (err) {
      console.error('Error al iniciar sesión:', err.code, err.message);

      let errorMessage;
      switch (err.code) {
        case 'auth/invalid-email':
          errorMessage = 'El correo electrónico proporcionado no es válido. Verifica el formato.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'La cuenta asociada con este correo electrónico ha sido desactivada. Contacta con el soporte.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No se encontró una cuenta con este correo electrónico. Asegúrate de que el correo sea correcto.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'La contraseña ingresada es incorrecta. Verifica e intenta nuevamente.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Demasiados intentos fallidos. Por favor, intenta de nuevo más tarde.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'No se pudo completar la solicitud. Verifica tu conexión a Internet.';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'El método de inicio de sesión no está habilitado para este proyecto.';
          break;
        case 'auth/requires-recent-login':
          errorMessage = 'Para realizar esta acción, debes haber iniciado sesión recientemente. Por favor, vuelve a iniciar sesión.';
          break;
        case 'auth/credential-already-in-use':
          errorMessage = 'Esta credencial ya está en uso. Utiliza otra dirección de correo electrónico o contraseña.';
          break;
        default:
          errorMessage = 'Ocurrió un error inesperado al intentar iniciar sesión. Por favor, intenta nuevamente.';
      }

      setError(errorMessage);
    }
  };

  const handleRegister = () => {
    navigate('/registro'); // Cambia esta ruta a la de tu página de registro
  };

  return (
    <Container>
      <LogoWrapper>
        <Logo src={escudo2014} alt="Logo" />
        <Tooltip>LA UNIÓN ES EL CAMINO</Tooltip>
      </LogoWrapper>
      <Header>Credencial Digital</Header>
      <Form onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">Iniciar Sesión</Button>
        <RegisterButton type="button" onClick={handleRegister}>Crear Cuenta</RegisterButton>
      </Form>
    </Container>
  );
};

// Definiciones de animaciones
const coinFlip = keyframes`
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(360deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Estilos del contenedor y componentes
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url(${fondo06});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const LogoWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Logo = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
  border-radius: 50%;
  border: 2px solid #00796b;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  animation: ${coinFlip} 20s linear infinite;
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.75);
  color: #fff;
  padding: 10px 15px;
  border-radius: 5px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s;
  animation: ${fadeIn} 0.3s ease-in;

  ${LogoWrapper}:hover & {
    opacity: 1;
  }
`;

const Header = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  color: #00796b;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 8px 26px;
  font-size: 1.2rem;
  color: #fff;
  background-color: #00796b;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #004d40;
  }
`;

const RegisterButton = styled(Button)`
  background-color: #009688; // Color diferente para distinguir el botón
  margin-top: 10px;

  &:hover {
    background-color: #00796b; // Color en hover
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
`;

export default Home;
