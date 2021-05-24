import { Knex } from 'knex';

export async function seed(knex: Knex) {
    await knex('company').insert({
        name: 'Prefeitura Municipal de Cunha',
        address: 'Praça Conego Siqueira, 27',
        neighbourhood: 'Centro',
        cep: '12530-000',
        city: 'Cunha',
        uf: 'SP',
        statual_inscription: 'Isento',
        cnpj: '45.704.053/0001-21',
        phone: '(12)3111-3062',
    });
}