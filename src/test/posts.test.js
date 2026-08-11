jest.mock('../config/dbConnect', () => ({
    pool: {
        query: jest.fn()
    }
}));

const request = require('supertest');
const { pool } = require('../config/dbConnect');
const app = require('../index.js');

const post = {
    id: 1,
    title: 'Mi post',
    content: 'Contenido',
    author_id: 1,
    published: true
};

describe('Posts API', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('GET /posts -> 200 con la lista', async () => {
        pool.query.mockResolvedValueOnce({ rows: [post] });

        const res = await request(app).get('/posts');

        expect(res.status).toBe(200);
        expect(res.body).toEqual([post]);
    });

    test('GET /posts/:id -> 200 si existe, 404 si no, 400 si id inválido', async () => {
        pool.query.mockResolvedValueOnce({ rows: [post] });

        const found = await request(app).get('/posts/1');
        expect(found.status).toBe(200);
        expect(found.body).toEqual(post);

        pool.query.mockResolvedValueOnce({ rows: [] });

        const notFound = await request(app).get('/posts/999');
        expect(notFound.status).toBe(404);

        const badId = await request(app).get('/posts/abc');
        expect(badId.status).toBe(400);
    });

    test.each([
        [{ content: 'C', author_id: 1 }, 'El título es necesario'],
        [{ title: 'T', author_id: 1 }, 'El contenido es necesario'],
        [{ title: 'T', content: 'C', author_id: 'no-numero' }, 'El author_id es necesario y debe ser válido']
    ])(
        'POST /posts -> 400 con body %o',
        async (body, message) => {
            const res = await request(app)
                .post('/posts')
                .send(body);

            expect(res.status).toBe(400);
            expect(res.body.message).toBe(message);
            expect(pool.query).not.toHaveBeenCalled();
        }
    );

    test('POST /posts -> 201 al crear, 409 si el author_id no existe', async () => {
        pool.query.mockResolvedValueOnce({ rows: [post] });

        const created = await request(app)
            .post('/posts')
            .send(post);

        expect(created.status).toBe(201);
        expect(created.body).toEqual(post);

        pool.query.mockRejectedValueOnce({
            code: '23503'
        });

        const badFk = await request(app)
            .post('/posts')
            .send(post);

        expect(badFk.status).toBe(409);
        expect(badFk.body.message).toBe('El autor indicado no existe');
    });

    test('PUT /posts/:id -> 200 al actualizar, 404 si no existe', async () => {
        pool.query.mockResolvedValueOnce({
            rows: [{ ...post, title: 'Editado' }]
        });

        const updated = await request(app)
            .put('/posts/1')
            .send(post);

        expect(updated.status).toBe(200);
        expect(updated.body.title).toBe('Editado');

        pool.query.mockResolvedValueOnce({ rows: [] });

        const notFound = await request(app)
            .put('/posts/999')
            .send(post);

        expect(notFound.status).toBe(404);
    });

    test('DELETE /posts/:id -> 200 al eliminar, 404 si no existe', async () => {
        pool.query.mockResolvedValueOnce({
            rows: [post]
        });

        const deleted = await request(app)
            .delete('/posts/1');

        expect(deleted.status).toBe(200);
        expect(deleted.body.message).toBe(
            'Post eliminado correctamente'
        );

        pool.query.mockResolvedValueOnce({ rows: [] });

        const notFound = await request(app)
            .delete('/posts/999');

        expect(notFound.status).toBe(404);
    });

});