import { Request } from "express";

export default interface IDeterminationController {
    /**
     * Request an upload of determination data
     */
    upload(req: Request): Promise<object | undefined>

    /**
     * Request a calculationof determination data
     */
    calculate(req: Request): Promise<any | undefined>
}