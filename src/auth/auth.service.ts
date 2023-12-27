import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';

import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, SignupDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  async signup(request: SignupDto) {
    const date = new Date(request.dob);
    date.toISOString();
    // generate the password hash
    const password = await argon.hash(request.password);
    // save the new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: request.email,
          password,
          firstName: request.firstName,
          lastName: request.lastName,
          role: request.role,
          dob: date.toISOString(),
          phoneNumber: request.phoneNumber,
          parentCompany: {
            connect: {
              id: request.parentCompanyId,
            },
          },
        },
      });
      delete user.password;
      // return the saved user
      return {
        message: 'User has been created',
        data: user,
        access_token: await this.signToken(user.id, user.email, user.role),
      };
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientKnownRequestError) {
        // uniques constraint failed
        if (error.code === 'P2002') {
          // returns status 403
          throw new ForbiddenException('Email already exists');
        }
      }
    }
  }

  async signin(request: LoginDto) {
    // Find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: request.email,
      },
    });
    // If user does not exist throw exception
    if (!user) throw new ForbiddenException('Incorrect Credentials');
    // compare password
    const pwMatches = await argon.verify(user.password, request.password);
    // If password incorrect throw expectation
    if (!pwMatches) throw new ForbiddenException('Incorrect Credentials');
    // send the user back
    delete user.password;
    return {
      message: 'Login Successfull',
      data: user,
      access_token: await this.signToken(user.id, user.email, user.role),
    };
    // return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
    role: string,
  ): Promise<string> {
    const jwtPayload = {
      sub: userId,
      email,
      role,
    };

    return this.jwt.signAsync(jwtPayload, {
      expiresIn: '1d',
      secret: process.env.JWT_SECRET,
    });
  }
}
