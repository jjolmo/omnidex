// src/repos/UserRepo.ts

import {IUser} from '@src/models/User';
import pool from '@src/common/dbConnection';
import {v4 as uuidv4} from 'uuid';


async function getUserById(insertId: number) {
    // TBD

}

/**
 * Crear un nuevo jugador.
 */
async function addUser(username: string, password: string): Promise<IUser> {
    const query = `
    INSERT INTO users (uuid, name, user_name, password)
    VALUES (?, ?, ?, ?)
  `;
    const uuid = uuidv4();  // Generar el UUID del jugador en el servidor

    const values = [uuid, username, password];

    const [result] = await pool.execute(query, values);
    const insertId = (result as { insertId: number }).insertId;

    const user = await getUserById(insertId);

    // @ts-ignore
    if (!user) {
        throw new Error('User not found');
    }

    return user;
}


async function deleteUser(uuid: string): Promise<void> {
    await pool.execute('DELETE FROM users WHERE uuid = ?', [uuid]);
}




export default {
    addUser,
    deleteUser,
} as const;
