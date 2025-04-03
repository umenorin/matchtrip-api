import TravelDtoRequest from "../DTO/TravelDtoRequest.js"

interface ITravelSevice {
    createTravel(): void
    deleteTravel(travelId: string): void
    editTravel(travel: TravelDtoRequest): void

}


export default ITravelSevice