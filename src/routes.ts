import express from 'express';
import knex from './database/connection';

const routes = express.Router();

routes.get('/', (request, response) => {
    return;
});

routes.post('/create/users', async (request, response) => {
    const {
        name,
        password,
    } = request.body;

    await knex('users').insert({
        name, 
        password,
    })

    return response.json({success: true});
});

routes.post('/create/vehicles', async (request, response) => {
    const {
        plate,
        vehicle,
        due_date,
        type,
    } = request.body;

    await knex('vehicles').insert({
        plate,
        vehicle,
        due_date,
        type,
    })

    return response.json({success: true});
});

routes.post('/create/passengers', async (request, response) => {
    const {
        name,
        cpf,
        rg,
        issuing_body,
        birth_date,
        cep,
        address,
        number,
        neighbourhood,
        city,
        uf,
        complement,
        phone,
        cell_phone,
        observation,
        status,
    } = request.body;

    await knex('passengers').insert({
        name,
        cpf,
        rg,
        issuing_body,
        birth_date,
        cep,
        address,
        number,
        neighbourhood,
        city,
        uf,
        complement,
        phone,
        cell_phone,
        observation,
        status,
    })

    return response.json({success: true});
});

routes.post('/create/drivers', async (request, response) => {
    const {
        name,
        cpf,
        cnh,
        cel_phone,
    } = request.body;

    await knex('drivers').insert({
        name,
        cpf,
        cnh,
        cel_phone,
    })

    return response.json({success: true});
});

routes.post('/create/destinations', async (request, response) => {
    const {
        destination,
    } = request.body;

    await knex('destinations').insert({
        destination,
    })

    return response.json({success: true});
});

routes.post('/create/travels', async (request, response) => {
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
    } = request.body;

    await knex('travels').insert({
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
    })

    return response.json({success: true});
});

routes.post('/create/travels/passengers', async (request, response) => {
    const {
        travel_id,
        passenger_id,
        companion,
        destination,
        observation,
    } = request.body;

    await knex('travel_passengers').insert({
        travel_id,
        passenger_id,
        companion,
        destination,
        observation,
    })

    return response.json({success: true});
});

export default routes;