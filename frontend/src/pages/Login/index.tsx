import React from 'react';
import { Barra } from "../../components/Barra";
import { useNavigate} from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    navigate('/home');
  }
    return (
      <>
      <Barra></Barra>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <h1 style={{ color: '#d41616', marginTop: '50px', fontSize: '50px' }}>
          Task Manager
        </h1>
        <h2 style={{fontWeight: '10'}}>Manage your teams and tasks with ease and agility</h2>
      </div>

        <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>

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
          <input 
            type='password' 
            style={{ 
              padding: '10px', 
              fontSize: '16px', 
              backgroundColor: '#dfdfdf', 
              border: '1px solid black', 
              borderRadius: '4px' 
            }} 
          />

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
