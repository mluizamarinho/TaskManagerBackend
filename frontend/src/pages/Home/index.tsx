import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importando o hook useNavigate do react-router-dom
import { Barra } from '../../components/Barra';
import ButtonBoard from './buttonBoard';
import { Perfil } from './perfil';

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        members: ''
    });

    const navigate = useNavigate(); // Inicializando o hook useNavigate

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCreateBoard = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleProjectClick = (projectName: string) => {
        // Navega para a página do projeto usando o nome do projeto
        navigate(`/board/${projectName}`);
    };

    return (
        <>
            <div style={{ display: 'flex', gap: '40px', flexDirection: 'column' }}>
                <Barra />
                <div style={{
                    width: '70%', backgroundColor: '#ffd51c', height: '70px', marginLeft: '20px', display: 'flex',
                    alignItems: 'center', padding: '5px', fontSize: '20px'
                }}>
                    Your projects
                </div>

                {/* Renderização dos projetos */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginLeft: '20px', marginTop: '10px' }}>
                    {[
                        { name: 'Atividades VTEX' },
                        { name: 'Organizador de dieta diário' },
                        { name: 'Atividades diárias - geral' },
                        /*{ name: 'Project B' },
                        { name: 'Project C' }*/
                    ].map((project, index) => (
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
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                            onClick={() => handleProjectClick(project.name)} // Navegação ao clicar no projeto
                        >
                            {project.name}
                        </div>
                    ))}
                </div>

                {/* Inclusão do botão "Create new board" */}
                <ButtonBoard onClick={handleCreateBoard} />

                {/* Modal para o formulário de criação de novo board */}
                {isModalOpen && (
                    <div style={{
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000
                    }}>
                        <div style={{
                            backgroundColor: '#fff',
                            padding: '20px',
                            borderRadius: '8px',
                            width: '400px',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'
                        }}>
                            <h2>Create New Board</h2>
                            <form>
                                <div style={{ marginBottom: '10px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px' }}>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
                                    />
                                </div>
                                <div style={{ marginBottom: '10px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px' }}>Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
                                    />
                                </div>
                                <div style={{ marginBottom: '10px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px' }}>Members</label>
                                    <input
                                        type="text"
                                        name="members"
                                        value={formData.members}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
                                    />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <button type="button" onClick={handleCloseModal} style={{
                                        backgroundColor: '#ccc',
                                        padding: '10px 20px',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}>Cancel</button>
                                    <button type="submit" style={{
                                        backgroundColor: '#ffd51c',
                                        padding: '10px 20px',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}>Create</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            <Perfil />
        </>
    );
}

export default Home;
