import React, { useState } from 'react';
import { Barra } from "../../components/Barra";
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importa os ícones de olho

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    navigate('/home');
  }

  return (
    <>
      <Barra />
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <h1 style={{ color: '#d41616', marginTop: '50px', fontSize: '50px' }}>
          Task Manager
        </h1>
        <h2 style={{ fontWeight: '10' }}>Manage your teams and tasks with ease and agility</h2>
      </div>

      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <form 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            marginTop: '80px', 
            alignSelf: 'flex-end', 
            width: '30%',
            marginRight: '35px',
            gap: '10px'
          }}
          onSubmit={handleSubmit}
        >
          <label style={{ fontSize: '18px', marginBottom: '5px' }}>Username:</label>
          <input 
            type='text' 
            style={{ 
              padding: '10px', 
              fontSize: '16px', 
              backgroundColor: '#dfdfdf', 
              border: '1px solid black', 
              borderRadius: '4px' 
            }} 
          />

          <label style={{ fontSize: '18px', marginBottom: '5px' }}>Password:</label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input 
              type={showPassword ? 'text' : 'password'} // Altera o tipo do input com base no estado
              style={{ 
                padding: '10px', 
                fontSize: '16px', 
                backgroundColor: '#dfdfdf', 
                border: '1px solid black', 
                borderRadius: '4px', 
                flex: 1 // Permite que o input ocupe o espaço restante
              }} 
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)} // Alterna a visibilidade da senha
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                marginLeft: '10px'
              }}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />} {/* Ícone de olho ou olho cortado */}
            </button>
          </div>

          <input 
            type="submit" 
            value='Submit' 
            style={{ 
              padding: '10px', 
              fontSize: '16px',
              color: 'white',
              backgroundColor: '#d41616', 
              border: '1px solid black', 
              cursor: 'pointer', 
              borderRadius: '4px', 
              marginTop: '10px' 
            }} 
          />
        </form>
      </div>
    </>
  );
}

export default Login;
