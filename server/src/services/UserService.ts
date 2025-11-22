// src/services/UserService.ts

import UserRepo from '@src/repos/UserRepo';
import {IUser} from '@src/models/User';
import bcrypt from 'bcrypt';

/**
 * Crear un nuevo jugador.
 */

async function createUser(username: string, password: string): Promise<IUser> {

  // password should be hashed
  const hashedPassword = await bcrypt.hash(password, 10);
  const playerId = await UserRepo.addUser(username, hashedPassword);
  return playerId;
}

async function deleteUser(uuid: string): Promise<void> {
  // delete also from redis
  // await UserService.unregisterUser(uuid);
  return UserRepo.deleteUser(uuid);
}


export default {
  createUser,
  deleteUser,
} as const;
