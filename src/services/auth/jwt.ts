import jwt from 'jsonwebtoken';

export default class JwtService {
  private readonly secret: string = process.env.JWT_SECRET;
  constructor() {}

  async sign(payload: {
    id: number;
    email: string;
    isActive: boolean;
  }): Promise<string> {
    const token = jwt.sign(
      {
        data: payload,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      },
      this.secret,
    );

    return token;
  }

  async verify(token: string): Promise<any> {
    return jwt.verify(token, this.secret);
  }
}
