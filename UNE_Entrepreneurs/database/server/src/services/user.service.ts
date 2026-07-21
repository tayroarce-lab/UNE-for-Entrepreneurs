import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, UserAttributes } from '../models';

export class UserService {
  public static async register(userData: Omit<UserAttributes, 'id'>): Promise<User> {
    const existingUser = await User.findOne({ where: { email: userData.email } });
    if (existingUser) {
      throw new Error('El correo electrónico ya está registrado.');
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password || '', 10);
    
    const user = await User.create({
      ...userData,
      password: hashedPassword,
    } as any);

    return user;
  }

  public static async login(email: string, password?: string): Promise<{ user: User; token: string }> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Credenciales inválidas.');
    }

    if (!password) {
      throw new Error('Se requiere contraseña.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Credenciales inválidas.');
    }

    // Generate JWT
    const jwtSecret: jwt.Secret = process.env.JWT_SECRET || 'super_secret_jwt_key_une_2026';
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '7d';
    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol },
      jwtSecret,
      { expiresIn: jwtExpiresIn as any }
    );

    return { user, token };
  }

  public static async findById(id: number): Promise<User | null> {
    return await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
  }

  public static async findAll(): Promise<User[]> {
    return await User.findAll({
      attributes: { exclude: ['password'] }
    });
  }

  public static async update(id: number, data: Partial<UserAttributes>): Promise<User | null> {
    const user = await User.findByPk(id);
    if (!user) return null;
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    await user.update(data as any);
    return user;
  }

  public static async delete(id: number): Promise<boolean> {
    const user = await User.findByPk(id);
    if (!user) return false;
    await user.destroy();
    return true;
  }
}
export default UserService;
