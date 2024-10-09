const ButtonBoard = ({ onClick }: { onClick: () => void }) => {
    return (
        <>
            {/* Botão de "Create new board" */}
            <div style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
            }}>
                <div style={{ marginBottom: '10px', fontSize: '18px' }}>
                    Create new board
                </div>
                <div
                    style={{
                        width: '60px',
                        height: '60px',
                        backgroundColor: '#ffd51c',
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
                    onClick={onClick} // Função passada via props para abrir o modal
                >
                    +
                </div>
            </div>
        </>
    );
};

export default ButtonBoard;
