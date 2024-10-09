
export function validateUserInput(name: string, password: string): void {
    if (!name || !password) {
      throw new Error('Nome de usuário e senha são obrigatórios');
    }
    
  }
  