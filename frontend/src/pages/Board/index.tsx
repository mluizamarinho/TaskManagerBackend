import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa'; // Importa o ícone da seta

const Board = () => {
    const { projectName } = useParams(); // Pega o nome do projeto da URL
    const navigate = useNavigate(); // Hook para navegação
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [taskFormData, setTaskFormData] = useState({
        name: '',
        description: '',
        status: 'unstarted'
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setTaskFormData({
            ...taskFormData,
            [e.target.name]: e.target.value
        });
    };

    const handleCreateTask = () => {
        setIsTaskModalOpen(true);
    };

    const handleCloseTaskModal = () => {
        setIsTaskModalOpen(false);
    };

    const handleGoBack = () => {
        navigate('/home'); // Navega de volta para a página Home
    };

    // Mocked tasks
    const tasks = [
        { name: 'Prova ATAL', status: 'done' },
        { name: 'Correções do PTCC', status: 'unstarted' },
        { name: 'Finalizar frontend de web', status: 'done' },
        { name: 'Visitar minha mãe', status: 'inprogress' },
        { name: 'Ir para academia', status: 'unstarted' },
        { name: 'Finalizar currículo', status: 'inprogress' },
        {name: 'Ir no dentista', status: 'backlog'}
    ];

    return (
        <>
            {/* Barra do topo com nome do projeto e botão de voltar */}
            <div style={{
                width: '100%',
                backgroundColor: '#ffd51c',
                height: '70px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 20px',
                fontSize: '24px',
                fontWeight: 'bold'
            }}>
                <button 
                    onClick={handleGoBack} 
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '15px'
                    }}>
                    <FaArrowLeft size={20} /> {/* Ícone da seta */}
                </button>
                <div style={{
                    display: 'flex',
                alignItems: 'center',
                marginRight: '500px'}}>{projectName}</div>
            </div>

            {/* Gerenciador de Tarefas */}
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px', padding: '0 20px', gap: '10px' }}>
                {['Unstarted', 'In Progress', 'Done', 'Backlog'].map((status) => (
                    <div key={status} style={{ width: '25%', textAlign: 'center' }}>
                        <h3>{status}</h3>
                        {/* Filtra e exibe as tarefas com o status correspondente */}
                        {tasks.filter(task => task.status === status.toLowerCase().replace(' ', '')).map((task, index) => (
                            <div key={index} style={{
                                backgroundColor: '#f0f0f0',
                                margin: '10px 0',
                                padding: '15px',
                                borderRadius: '5px',
                                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                                fontSize: '18px'
                            }}>
                                {task.name}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Botão de "Create new task" */}
            <div style={{
                position: 'fixed',
                bottom: '20px',
                left: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
            }}>
                <div style={{ marginBottom: '10px', fontSize: '18px' }}>
                    Create new task
                </div>
                <div
                    style={{
                        width: '60px',
                        height: '60px',
                        backgroundColor: 'red',
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '30px',
                        color: '#fff',
                        cursor: 'pointer',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                        transition: 'transform 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                    onClick={handleCreateTask} // Abrir o modal de criar task
                >
                    +
                </div>
            </div>

            {/* Modal para criação de nova task */}
            {isTaskModalOpen && (
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
                        <h2>Create New Task</h2>
                        <form>
                            <div style={{ marginBottom: '10px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Task Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={taskFormData.name}
                                    onChange={handleInputChange}
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
                                />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Description</label>
                                <textarea
                                    name="description"
                                    value={taskFormData.description}
                                    onChange={handleInputChange}
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
                                />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Status</label>
                                <select
                                    name="status"
                                    value={taskFormData.status}
                                    onChange={handleInputChange}
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
                                >
                                    <option value="unstarted">Unstarted</option>
                                    <option value="inprogress">In Progress</option>
                                    <option value="done">Done</option>
                                    <option value="backlog">Backlog</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <button type="button" onClick={handleCloseTaskModal} style={{
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
        </>
    );
};

export default Board;
