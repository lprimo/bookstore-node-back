module.exports = {
    testEnvironment: 'node',
    verbose: true,
    testMatch: [
        '**/tests/**/*.test.js',
        '**/__tests__/**/*.js'
    ],

    // Configura a transformação de arquivos usando Babel.
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest', // Transforma arquivos JS e JSX usando 'babel-jest'.
    },

    // Configura a cobertura de código.
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{js,jsx}', // Coleta cobertura para todos os arquivos JS e JSX no diretório 'src'.
    ],
    coverageDirectory: 'coverage', // Diretório onde os relatórios de cobertura serão armazenados.
    coverageReporters: ['text', 'html'], // Tipos de relatórios de cobertura: 'text' e 'html'.

    // Permite a configuração global para as variáveis de ambiente.
    globals: {
        'process.env': {
        },
    },

    // Define os módulos de configuração para garantir que as importações sejam tratadas corretamente.
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    },
    testTimeout: 10000, // Tempo limite para a execução de testes em milissegundos.
};
