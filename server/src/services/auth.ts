import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
dotenv.config();

interface JwtPayload {
  _id: unknown;
  username: string;
  email: string;
}

const secretKey = process.env.JWT_SECRET_KEY || '';

/**
 * Middleware to authenticate and extract the user from the token for GraphQL context.
 */
export const authenticateToken = (authHeader?: string): JwtPayload | null => {
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const user = jwt.verify(token, secretKey) as JwtPayload;
      return user; // Return the decoded token as user
    } catch (err) {
      console.error('Token verification failed:', err);
      return null;
    }
  }
  return null;
};

/**
 * Utility function to sign a JWT token.
 */
export const signToken = (username: string, email: string, _id: unknown): string => {
  const payload = { username, email, _id };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
};
