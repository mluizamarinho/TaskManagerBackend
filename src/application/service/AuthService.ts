import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserRepository from '../../infrastructure/repository/UserRepository';

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

interface UserPayload {
  id: string;
  name: string;
  type: string;
}

class AuthService {

  // gerencia o registro de usuários e a autenticação, utilizando bcrypt para hashing de senhas e jwt para geração de tokens JWT.
  // O usuário é criado no banco de dados por meio do UserRepository.
  public async registerUser(name: string, password: string, type: string = 'PADRÃO'): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);
    await UserRepository.createUser({ name, password: hashedPassword, type });
  }

  // método verifica se o usuário existe e se a senha está correta.
  //  cria um token JWT com os detalhes do usuário (id, nome e tipo) que expira em 1 hora.
  public async authenticateUser(id: string, password: string): Promise<string> {
    const user = await UserRepository.findUserById(id);

    console.log(user)

    if (!user) {
      throw new Error();
    }

    const token = jwt.sign({ id: user.id, name: user.name, type: user.type } as UserPayload, SECRET_KEY, {
      expiresIn: '1h'
    });

    return token;
  }
}

export default new AuthService;
