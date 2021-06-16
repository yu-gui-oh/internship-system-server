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

            // passenger_ids,
            // companions,
            // passengers_destinations,
            // passengers_observations,
        } = request.body;
    
        const trx = await knex.transaction(); // transaction não está mais funcionando assim
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

        const insertedIds = await trx('travels').insert(travel);
    
        const travel_id = insertedIds[0];
        
        // const travelPassengers = passenger_ids.map((passenger_id: number, index: number) => {
        //     return {
        //         travel_id: travel_id,
        //         passenger_id,
        //         companion: companions[index],
        //         destination: passengers_destinations[index],
        //         observation: passengers_observations[index],
        //     }
        // });

        // await trx('travel_passengers').insert(travelPassengers);
    
        await trx.commit();

        return response.json({
            travel,
            // ...travelPassengers,
        });
    }

    async listIDs ( request: Request, response: Response ) {
        const travels = await knex('travels')
            .join('destinations', 'travels.destination', '=', 'destinations.id')
            .join('drivers', 'travels.driver', '=', 'drivers.id')
            .join('vehicles', 'travels.vehicle', '=', 'vehicles.id')
            .select(
                'travels.*', 
                { driver_name: 'drivers.name' }, 
                { destination_name: 'destinations.destination' },
                { vehicle_name: 'vehicles.vehicle' }
            )
            .orderBy("travels.departure_date", "desc")
            .where("travels.status", "Andamento");

        const travelsArray = travels.map( travel => {
            return {
                id: travel.id,
                destination: travel.destination_name,
                departure_date: travel.departure_date,
                status: travel.status,
                driver: travel.driver_name,
                vehicle: travel.vehicle_name,
            }
        });

        return response.json(travelsArray);
    }

    async listActive ( request: Request, response: Response ) {
        const travels = await knex('travels')
            .join('destinations', 'travels.destination', '=', 'destinations.id')
            .join('drivers', 'travels.driver', '=', 'drivers.id')
            .join('vehicles', 'travels.vehicle', '=', 'vehicles.id')
            .select(
                'travels.*', 
                { driver_name: 'drivers.name' }, 
                { destination_name: 'destinations.destination' },
                { vehicle_name: 'vehicles.vehicle' }
            )
            .orderBy("travels.departure_date", "desc")
            .where("travels.status", "Andamento");

        const travelsArray = travels.map( travel => {
            return {
                id: travel.id,
                destination: travel.destination_name,
                departure_date: travel.departure_date,
                status: travel.status,
                driver: travel.driver_name,
                vehicle: travel.vehicle_name,
                vacant_seats: travel.vacant_seats,
            }
        });

        return response.json(travelsArray);
    }

    async show ( request: Request, response: Response ) {
        const { id } = request.params;

        const travels = await 
            knex('travels')
            .join('destinations', 'travels.destination', '=', 'destinations.id')
            .join('drivers', 'travels.driver', '=', 'drivers.id')
            .join('vehicles', 'travels.vehicle', '=', 'vehicles.id')
            .select(
                'travels.*', 
                { driver_name: 'drivers.name' }, 
                { destination_name: 'destinations.destination' }, 
                { vehicle_name: 'vehicles.vehicle' },
            )            
            .where('travels.id', id)
            .first();

        // const passengers = await
        //     knex('passengers')
        //     .join('travel_passengers', 'passengers.id', '=', 'travel_passengers.passenger_id')
        //     .where('travel_passengers.travel_id', id)
        //     .select(
        //         'passengers.id', 
        //         'name', 
        //         'travel_passengers.destination', 
        //         'companion', 
        //         'travel_passengers.observation'
        //     );

        return response.json({
            travels,
            // ...passengers
        });
    }

    async update (request: Request, response: Response ) {
        const { id } = request.params;

        const newTravel = await knex('travels')
                                    .update(request.body)
                                    .where('id', id);

        return response.json(newTravel);
    }
}

export default TravelsController;