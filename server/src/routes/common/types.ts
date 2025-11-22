import { Response, Request } from 'express';


// **** Express **** //

type TObj = Record<string, unknown>;
export type IReq<T = TObj> = Request<TObj, void, T, TObj>;
export type IRes = Response<unknown, TObj>
