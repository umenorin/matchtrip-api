import { inject, injectable } from "tsyringe";
import ITravelService from "../Interfaces/ITravelService.js";


@injectable()
export default class TravelController {
    private readonly _travelService: ITravelService;

    public constructor(
    @inject("TravelService")
    travelService: ITravelService
    ) {
    this._travelService = travelService;
    }

    public async postTravel(req: Request, res: Response) {
        throw new Error("Method not implemented.");
    }
}