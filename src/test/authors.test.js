jest.mock('../config/dbConnect', () => ({
    pool: {
        query: jest.fn()
    }
}));

const request = require('supertest');
const { pool } = require('../config/dbConnect');
const app = require('../index.js');

const author = {
    id: 1,
    name: 'Ana Torres',
    email: 'ana@example.com',
    bio: null
};

describe('Authors API', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('GET /authors -> 200 con la lista', async () => {
        pool.query.mockResolvedValueOnce({ rows: [author] });

        const res = await request(app).get('/authors');

        expect(res.status).toBe(200);
        expect(res.body).toEqual([author]);
    });

    test('GET /authors/:id -> 200 si existe, 404 si no, 400 si id inválido', async () => {
        pool.query.mockResolvedValueOnce({ rows: [author] });

        const found = await request(app).get('/authors/1');
        expect(found.status).toBe(200);
        expect(found.body).toEqual(author);

        pool.query.mockResolvedValueOnce({ rows: [] });

        const notFound = await request(app).get('/authors/999');
        expect(notFound.status).toBe(404);

        const badId = await request(app).get('/authors/abc');
        expect(badId.status).toBe(400);
    });

    test.each([
        [{ email: 'a@a.com' }, 'El nombre es necesario'],
        [{ name: 'Ana' }, 'El email es necesario'],
        [{ name: 'Ana', email: 'no-valido' }, 'El email no tiene un formato válido']
    ])(
        'POST /authors -> 400 con body %o',
        async (body, message) => {
            const res = await request(app)
                .post('/authors')
                .send(body);

            expect(res.status).toBe(400);
            expect(res.body.message).toBe(message);
            expect(pool.query).not.toHaveBeenCalled();
        }
    );

    test('POST /authors -> 201 al crear, 409 si el email ya existe', async () => {
        pool.query.mockResolvedValueOnce({ rows: [author] });

        const created = await request(app)
            .post('/authors')
            .send(author);

        expect(created.status).toBe(201);
        expect(created.body).toEqual(author);

        pool.query.mockRejectedValueOnce({
            code: '23505'
        });

        const duplicated = await request(app)
            .post('/authors')
            .send(author);

        expect(duplicated.status).toBe(409);
        expect(duplicated.body.message).toBe(
            'Este email ya está creado por otro autor'
        );
    });

    test('PUT /authors/:id -> 200 al actualizar, 404 si no existe', async () => {
        pool.query.mockResolvedValueOnce({
            rows: [{ ...author, name: 'Ana Editada' }]
        });

        const updated = await request(app)
            .put('/authors/1')
            .send(author);

        expect(updated.status).toBe(200);
        expect(updated.body.name).toBe('Ana Editada');

        pool.query.mockResolvedValueOnce({ rows: [] });

        const notFound = await request(app)
            .put('/authors/999')
            .send(author);

        expect(notFound.status).toBe(404);
    });

    test('DELETE /authors/:id -> 200 al eliminar, 404 si no existe', async () => {
        pool.query.mockResolvedValueOnce({
            rows: [author]
        });

        const deleted = await request(app)
            .delete('/authors/1');

        expect(deleted.status).toBe(200);
        expect(deleted.body.message).toBe(
            'Autor eliminado correctamente'
        );

        pool.query.mockResolvedValueOnce({ rows: [] });

        const notFound = await request(app)
            .delete('/authors/999');

        expect(notFound.status).toBe(404);
    });

});