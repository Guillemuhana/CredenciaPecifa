// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/carnet-digital'); // Redirige después del registro exitoso
    } catch (err) {
      console.error('Error al registrar:', err.code, err.message);

      let errorMessage;
      switch (err.code) {
        case 'auth/invalid-email':
          errorMessage = 'El correo electrónico proporcionado no es válido.';
          break;
        case 'auth/email-already-in-use':
          errorMessage = 'El correo electrónico ya está en uso.';
          break;
        case 'auth/weak-password':
          errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
          break;
        default:
          errorMessage = 'Ocurrió un error inesperado al intentar registrar. Por favor, intenta nuevamente.';
      }

      setError(errorMessage);
    }
  };

  return (
    <Container>
      <Header>Registro de Usuario</Header>
      <Form onSubmit={handleRegister}>
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
        <Button type="submit">Registrarse</Button>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

const Header = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  background-color: #fff;
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
  padding: 15px 30px;
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

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
`;

export default Register;
