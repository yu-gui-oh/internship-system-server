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
            // booked_seats,
            // vacant_seats,

            //  \/  travel_passengers (arrays)  \/

            // passenger_ids,
            // companions,
            // passengers_destinations,
            // passengers_observations,
        } = request.body;
    
        const trx = await knex.transaction(); 

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
            // booked_seats,
            vacant_seats: total_seats,
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

    // async insertPassengers (request: Request, response: Response) {
    //     const {
    //         travel_id, 
    //         passenger_id,
    //         companion,
    //         destination,
    //         observation,
    //     } = request.body;

    //     const travel_passenger = {
    //         travel_id: travel_id,  
    //         passenger_id: passenger_id,
    //         companion: companion,
    //         destination: destination,
    //         observation: observation,
    //     }

    //     const trx = await knex.transaction(); 

    //     await trx('travel_passengers').insert(travel_passenger);

    //     const seats = 
    //         await trx('travels')
    //             .select([
    //                 {total_seats: Number('total_seats')},
    //                 {vacant_seats: Number('vacant_seats')},
    //                 {booked_seats: Number('booked_seats')}])
    //             .where('id', travel_id)

    //     let newBookedSeats = 0;
    //     let newVacantSeats = 0;

    //     if ( companion === false ) {
    //         seats.map(seat => {
    //             // seat.vacant_seats = seat.total_seats - 1;
    //             // seat.booked_seats = seat.total_seats + 1;
    //             newVacantSeats = seat.total_seats - 1;
    //             newBookedSeats = seat.total_seats + 1;
    //         })
    //     } else {
    //         seats.map(seat => {
    //             // seat.vacant_seats = seat.total_seats - 2;
    //             // seat.booked_seats = seat.total_seats + 2;
    //             newVacantSeats = seat.total_seats - 2;
    //             newBookedSeats = seat.total_seats + 2;
    //         })
    //     }

    //     // seats.map( seat => {
    //     //     newBookedSeats = seat.booked_seats;
    //     //     newVacantSeats = seat.vacant_seats;
    //     // });
        
    //     const newSeats = await trx('travels')
    //         .update({ 'booked_seats': newBookedSeats })
    //         .update({ 'vacant_seats': newVacantSeats })
    //         .where('id', travel_id);
        
    //     await trx.commit();

    //     return response.json({
    //         travel_passenger, 
    //         newSeats
    //     });
    // }

    // async getTravelPassengers ( request: Request, response: Response ) {
    //     const { id } = request.params;

    //     const passengers = await
    //         knex('passengers')
    //         .join('travel_passengers', 'passengers.id', '=', 'travel_passengers.passenger_id')
    //         .where('travel_passengers.travel_id', id)
    //         .select(
    //             {id: 'passengers.id'}, 
    //             {name: 'passengers.name'}, 
    //             {destination: 'travel_passengers.destination'}, 
    //             {companion: 'travel_passengers.companion'}, 
    //             {observation: 'travel_passengers.observation'}
    //         );

    //     const passengersArray = passengers.map( passenger => {
    //         return {
    //             passenger_name: passenger.name,  
    //             passenger_id: passenger.id,
    //             companion: passenger.companion,
    //             destination: passenger.destination,
    //             observation: passenger.observation,
    //         }
    //     });

    //     return response.json(passengersArray);
    // }

    // async deleteTravelPassenger ( request: Request, response: Response ) {
    //     const { id } = request.params;

    //     await knex('travel_passengers')
    //         .where('passenger_id', id)
    //         .del();
    // }

    async listIDs ( request: Request, response: Response ) {
        const travels = await knex('travels')
            .join('destinations', 'travels.destination', '=', 'destinations.id')
            .join('drivers', 'travels.driver', '=', 'drivers.id')
            .join('vehicles', 'travels.vehicle', '=', 'vehicles.id')
            .select(
                'travels.*', 
                { driver_name: 'drivers.name' }, 
                { destination_name: 'destinations.destination' },
                { vehicle_name: 'vehicles.vehicle' },
                { vehicle_plate: 'vehicles.plate' }
            )
            .orderBy("travels.departure_date", "asc");

        const travelsArray = travels.map( travel => {
            return {
                id: travel.id,
                destination: travel.destination_name,
                departure_date: travel.departure_date,
                departure_hour: travel.departure_hour,
                return_date: travel.return_date,
                return_hour: travel.return_hour,
                status: travel.status,
                driver: travel.driver_name,
                vehicle: travel.vehicle_name + ' ' + travel.vehicle_plate,
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
                { vehicle_name: 'vehicles.vehicle' },
                { vehicle_plate: 'vehicles.plate' }
            )
            .orderBy("travels.departure_date", "asc")
            .where("travels.status", "Andamento");

        const travelsArray = travels.map( travel => {
            return {
                id: travel.id,
                destination: travel.destination_name,
                departure_date: travel.departure_date,
                departure_hour: travel.departure_hour,
                status: travel.status,
                driver: travel.driver_name,
                vehicle: travel.vehicle_name + ' ' + travel.vehicle_plate,
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

    async listSearch ( request: Request, response: Response ) {
        const { searchParam } = request.params;

        const travels = await knex('travels')
            .join('destinations', 'travels.destination', '=', 'destinations.id')
            .join('drivers', 'travels.driver', '=', 'drivers.id')
            .join('vehicles', 'travels.vehicle', '=', 'vehicles.id')
            .select(
                'travels.*', 
                { driver_name: 'drivers.name' }, 
                { destination_name: 'destinations.destination' },
                { vehicle_name: 'vehicles.vehicle' },
                { vehicle_plate: 'vehicles.plate' }
            )
            .where('travels.departure_date', 'like', `%${searchParam}%`)
            .orderBy("travels.departure_date", "asc");

        const travelsArray = travels.map( travel => {
            return {
                id: travel.id,
                destination: travel.destination_name,
                departure_date: travel.departure_date,
                departure_hour: travel.departure_hour,
                return_date: travel.return_date,
                return_hour: travel.return_hour,
                status: travel.status,
                driver: travel.driver_name,
                vehicle: travel.vehicle_name + ' ' + travel.vehicle_plate,
                vacant_seats: travel.vacant_seats,
            }
        });

        return response.json(travelsArray);
    }
}

export default TravelsController;