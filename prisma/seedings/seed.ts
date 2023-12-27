import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';
import { Roles } from '../../src/auth/dto/enums';

// to run seed command
// npx prisma db seed
const prisma = new PrismaClient();

const COMPANY = [
  {
    name: 'company1',
    email: 'company1@gmail.com',
    phoneNumber: '251910101010',
    contactPerson: 'manager 1',
    password: '12345678',
  },
  {
    name: 'company2',
    email: 'company2@gmail.com',
    phoneNumber: '251911111111',
    contactPerson: 'manager 2',
    password: '12345678',
  },
];

const USERS = [
  {
    email: 'user1@gmail.com',
    password: '12345678',
    firstName: 'user',
    lastName: '1',
    phoneNumber: '251910101010',
    dob: '1999-04-21T09:14:50+0300',
    parentCompanyId: 10000,
    role: Roles.user,
  },
  {
    email: 'registrar1@gmail.com',
    password: '12345678',
    firstName: 'registrar',
    lastName: 'first',
    phoneNumber: '251910101010',
    dob: '1999-09-21T09:14:50+0300',
    role: Roles.registrar,
  },
  {
    email: 'supervisor1@gmail.com',
    password: '12345678',
    firstName: 'supervisor',
    lastName: '1',
    phoneNumber: '251910101010',
    dob: '1999-04-21T09:14:50+0300',
    role: Roles.supervisor,
  },
  {
    email: 'admin1@gmail.com',
    password: '12345678',
    firstName: 'admin',
    lastName: '1',
    phoneNumber: '251910101010',
    dob: '1999-04-21T09:14:50+0300',
    role: Roles.admin,
  },
];

async function seedCompanies() {
  COMPANY[0].password = await argon.hash(COMPANY[0].password);
  COMPANY[1].password = await argon.hash(COMPANY[1].password);

  Promise.all(
    COMPANY.map((company) =>
      prisma.company.create({
        data: company,
      }),
    ),
  )
    .then(() =>
      console.info('[COMPANY_SEED] Successfully created company records'),
    )
    .catch((error) =>
      console.error('[COMPANY_SEED} Failed to create company records', error),
    );
}

async function seedUsers() {
  for (let i = 0; i < USERS.length; i++) {
    USERS[i].password = await argon.hash(USERS[i].password);
    USERS[i].dob = new Date(USERS[i].dob).toISOString();
  }

  Promise.all(
    USERS.map((user) =>
      prisma.user.create({
        data: user,
      }),
    ),
  )
    .then(() => console.info('[USER_SEED] Successfully created users records'))
    .catch((error) =>
      console.error('[USER_SEED] Failed to create users records', error),
    );
}

seedCompanies();
seedUsers();
