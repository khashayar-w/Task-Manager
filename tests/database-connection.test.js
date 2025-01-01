const TasksModel = require('../Backend/Models/Tasks-model');
const pool = require('../Backend/server');

jest.mock('../Backend/server', () => ({
    query: jest.fn(),
}));

describe('TasksModel', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should connect to the database and retrieve tasks', async () => {
        pool.query.mockResolvedValue([[{ id: 1, name: 'Test Task' }]]);

        const consoleSpy = jest.spyOn(console, 'log');
        await TasksModel.getTasks();

        expect(pool.query).toHaveBeenCalledWith('select * from practice.tasks');
        expect(consoleSpy).toHaveBeenCalledWith('yes');
    });

    it('should handle empty result set', async () => {
        pool.query.mockResolvedValue([[]]);

        const consoleSpy = jest.spyOn(console, 'log');
        await TasksModel.getTasks();

        expect(pool.query).toHaveBeenCalledWith('select * from practice.tasks');
        expect(consoleSpy).not.toHaveBeenCalled();
    });
});