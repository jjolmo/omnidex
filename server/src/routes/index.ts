import {Router} from 'express';
import UserRoutes from "@src/routes/UserRoutes";

const apiRouter = Router();

// Init routers
const playerRouter = Router();

// servers
playerRouter.post('/users', UserRoutes.createUser); // POST /players - crear jugador


// **** Export default **** //
export default apiRouter;
