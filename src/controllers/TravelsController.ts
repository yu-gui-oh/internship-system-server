import { Request, Response } from 'express';
import knex from '../database/connection';

class TravelsController {
    async create (request: Request, response: Response) {
        const {
            departure_date,
            departure_hour,
            destination,
            vehicle,
            driver,
            return_date,
            return_hour,
            daily_payout,
            absent_hours,
            status,
            observation,
            total_seats,
            booked_seats,
            vacant_seats,
            //  \/  travel_passengers (arrays)  \/
            passenger_ids,
            companions,
            passengers_destinations,
            passengers_observations,
        } = request.body;
    
        //const trx = await knex.transaction(); // transaction não está mais funcionando assim
        const travel = {
            departure_date,
            departure_hour,
            destination,
            vehicle,
            driver,
            return_date,
            return_hour,
            daily_payout,
            absent_hours,
            status,
            observation,
            total_seats,
            booked_seats,
            vacant_seats,
        };

        const insertedIds = await knex('travels').insert(travel);
    
        const travel_id = insertedIds[0];
        
        const travelPassengers = passenger_ids.map((passenger_id: number, index: number) => {
            return {
                travel_id: travel_id,
                passenger_id,
                companion: companions[index],
                destination: passengers_destinations[index],
                observation: passengers_observations[index],
            }
        });

        await knex('travel_passengers').insert(travelPassengers);
    
        return response.json({
            travel,
            ...travelPassengers,
        });
    }
}

export default TravelsController;