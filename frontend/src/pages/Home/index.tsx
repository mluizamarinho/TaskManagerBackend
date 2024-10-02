
import { Barra } from '../../components/Barra';

const Home = () => {

    const projects = [
        { name: 'Project X' },
        { name: 'Project Y' },
        { name: 'Project Z' }
    ];

    return (
        <>
        <div style={{display: 'flex', gap: '40px', flexDirection: 'column'}}>
        
        <Barra />
        <div style={{width: '70%', backgroundColor: '#ffd51c', height: '70px', marginLeft: '20px', display: 'flex',
            alignItems: 'center', padding: '5px', fontSize: '20px'
        }}>Your projects</div>

        {/* Renderização dos projetos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginLeft: '20px', marginTop: '10px' }}>
            {projects.map((project, index) => (
                <div 
                    key={index} 
                    style={{
                        backgroundColor: '#d9d9d9',
                        padding: '20px',
                        fontSize: '18px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                        width: '30%'
                    }}
                    // Efeito de hover para mover a div
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    {project.name}
                </div>
            ))}
        </div>
        </div>
        </>
    );
}

export default Home;
