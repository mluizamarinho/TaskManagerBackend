import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

interface UserPayload {
  id: string;
  name: string;
  type: string;
}

interface AuthenticatedRequest extends Request {
  user?: UserPayload;
}

// Middleware para autenticar token JWT
function authenticateToken(req: Request, res: Response, next: NextFunction): Response | void {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, SECRET_KEY, (err: VerifyErrors | null, user: any) => {
    if (err) {
      return res.sendStatus(403);
    }

    (req as AuthenticatedRequest).user = user as UserPayload;
    next();
  });
}

// Middleware para autorizar somente usuários com papéis específicos
function authorizeRoles(allowedRoles: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.type)) {
      return res.sendStatus(403);
    }
    next();
  };
}

export { authenticateToken, authorizeRoles };
