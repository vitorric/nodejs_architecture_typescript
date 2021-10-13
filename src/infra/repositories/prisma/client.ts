import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: [
    {
      emit: 'stdout',
      level: 'query',
    },
  ],
  errorFormat: 'pretty',
});

export const messagesErrors = {
  bad_params: 'Dados Inválidos!',
};
