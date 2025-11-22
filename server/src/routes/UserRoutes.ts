import HttpStatusCodes from '@src/common/HttpStatusCodes';

import {IReq, IRes} from './common/types';
import UserService from '@src/services/UserService';


async function createUser(req: IReq, res: IRes) {
  const { password, username} = req.body;


  // Crear el jugador en la base de datos
  const user = await UserService.createUser(
      username as string,
      password as string,
  );

  const userData = {
    name: user.name,
  };

  res.status(HttpStatusCodes.CREATED).json(userData);
}

export default {
  createUser,
} as const;
