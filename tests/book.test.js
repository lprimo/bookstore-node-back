const request = require('supertest');
const app = require('../src/app'); // Substitua pelo caminho para o seu arquivo de configuração do Express
const Book = require('../src/models/book'); // Substitua pelo caminho correto

describe('Book API', () => {
    beforeEach(async () => {
        // Configura o banco de dados antes de cada teste, se necessário
    });

    afterEach(async () => {
        // Limpa o banco de dados após cada teste, se necessário
        await Book.deleteMany({});
    });

    test('should create a new book', async () => {
        const response = await request(app)
            .post('/books')
            .send({
                title: 'Test Book',
                author: 'Test Author',
                isbn: '123456789X',
                publishedDate: '2024-01-01',
                pages: 200
            });

        expect(response.status).toBe(201);
        expect(response.body.title).toBe('Test Book');
    });

    // Adicione mais testes conforme necessário
});
