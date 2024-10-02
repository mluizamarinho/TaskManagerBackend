import React from 'react';

const Login = () => {
    return (
      <>
      <div style={{width: '100%', backgroundColor: '#d41616', height: '50px'}}>.
      </div>
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
            gap: '10px', 
            marginRight: '60px', // Alinha o formulário à direita
            marginTop: '80px', // Ajusta a distância entre o título e o formulário
            alignSelf: 'flex-end', // Mantém o formulário no lado direito
            width: '30%'
          }}
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

        <div style={{backgroundColor: '#ffd51c', height: '400px', width: '30%', borderRadius: '3000px'}}>.</div>

      </>
    );
}

export default Login;
