import { Request, Response } from 'express';
import knex from '../database/connection';

class TravelPassengersController {
    async insertPassengers (request: Request, response: Response) {
        const {
            travel_id, 
            passenger_id,
            companion,
            destination,
            observation,
        } = request.body;

        const travel_passenger = {
            travel_id: travel_id,  
            passenger_id: passenger_id,
            companion: companion,
            destination: destination,
            observation: observation,
        }

        const trx = await knex.transaction(); 

        await trx('travel_passengers').insert(travel_passenger);

        // const seats = 
        //     await trx('travels')
        //         .select([
        //             {total_seats: Number('total_seats')},
        //             {vacant_seats: Number('vacant_seats')},
        //             {booked_seats: Number('booked_seats')}])
        //         .where('id', travel_id)

        // let newBookedSeats = 0;
        // let newVacantSeats = 0;

        // if ( companion === false ) {
        //     seats.map(seat => {
        //         // seat.vacant_seats = seat.total_seats - 1;
        //         // seat.booked_seats = seat.total_seats + 1;
        //         newVacantSeats = seat.total_seats - 1;
        //         newBookedSeats = seat.total_seats + 1;
        //     })
        // } else {
        //     seats.map(seat => {
        //         // seat.vacant_seats = seat.total_seats - 2;
        //         // seat.booked_seats = seat.total_seats + 2;
        //         newVacantSeats = seat.total_seats - 2;
        //         newBookedSeats = seat.total_seats + 2;
        //     })
        // }

        // seats.map( seat => {
        //     newBookedSeats = seat.booked_seats;
        //     newVacantSeats = seat.vacant_seats;
        // });
        
        // const newSeats = await trx('travels')
        //     .update({ 'booked_seats': newBookedSeats })
        //     .update({ 'vacant_seats': newVacantSeats })
        //     .where('id', travel_id);
        
        await trx.commit();

        return response.json({
            travel_passenger, 
            // newSeats
        });
    }

    async getTravelPassengers ( request: Request, response: Response ) {
        const { id } = request.params;

        const passengers = await
            knex('passengers')
            .join('travel_passengers', 'passengers.id', '=', 'travel_passengers.passenger_id')
            .where('travel_passengers.travel_id', id)
            .select(
                {id: 'passengers.id'}, 
                {name: 'passengers.name'}, 
                {cpf: 'passengers.cpf'},
                {destination: 'travel_passengers.destination'}, 
                {companion: 'travel_passengers.companion'}, 
                {observation: 'travel_passengers.observation'}
            );

        const passengersArray = passengers.map( passenger => {
            return {
                id: passenger.id,
                name: passenger.name, 
                cpf: passenger.cpf,                 
                companion: passenger.companion,
                destination: passenger.destination,
                observation: passenger.observation,
            }
        });

        const idsArray = passengers.map( passenger => {
            return {
                id: passenger.id,
            }
        });

        return response.json({passengersArray, idsArray});
    }

    async deleteTravelPassenger ( request: Request, response: Response ) {
        const { passenger_id, companion, travel_id } = request.body;

        const trx = await knex.transaction(); 

        // const seats = 
        //     await trx('travels')
        //         .select([
        //             {total_seats: Number('total_seats')},
        //             {vacant_seats: Number('vacant_seats')},
        //             {booked_seats: Number('booked_seats')}])
        //         .where('id', travel_id)

        // let newBookedSeats = 0;
        // let newVacantSeats = 0;

        // if ( companion === false ) {
        //     seats.map(seat => {
        //         // seat.vacant_seats = seat.total_seats - 1;
        //         // seat.booked_seats = seat.total_seats + 1;
        //         newVacantSeats = seat.total_seats + 1;
        //         newBookedSeats = seat.total_seats - 1;
        //     })
        // } else {
        //     seats.map(seat => {
        //         // seat.vacant_seats = seat.total_seats - 2;
        //         // seat.booked_seats = seat.total_seats + 2;
        //         newVacantSeats = seat.total_seats + 2;
        //         newBookedSeats = seat.total_seats - 2;
        //     })
        // }

        // // seats.map( seat => {
        // //     newBookedSeats = seat.booked_seats;
        // //     newVacantSeats = seat.vacant_seats;
        // // });
        
        // const newSeats = await trx('travels')
        //     .update({ 'booked_seats': newBookedSeats })
        //     .update({ 'vacant_seats': newVacantSeats })
        //     .where('id', travel_id);
        
        
        await trx('travel_passengers')
            .where('passenger_id', passenger_id)
            .andWhere('travel_id', travel_id)
            .del();
            
        await trx.commit();

        // return response.json(newSeats);
        return response.json({success: true});
    }
}

export default TravelPassengersController;