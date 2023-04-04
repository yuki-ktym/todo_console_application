const {
    addTask,
    showTasks,
    showJokenTasks,
    showTaskDetails,
    updateTask,
    deleteTask
} = require("./app");
const readline = require('./app');
const rl = require('./app');

// 追加テスト
describe('addTask', () => {
    let consoleSpy;

    beforeAll(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    });

    afterAll(() => {
        consoleSpy.mockRestore();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should log "タスクを追加しました" to console', () => {
        // Arrange
        const mockTask = {
            id: 1,
            title: 'test title',
            details: 'test details',
            dueDate: new Date('2022/01/01'),
            priority: '高'
        };

        jest.spyOn(rl, 'question').mockImplementation((question, callback) => {
            switch (question) {
                case 'タイトル: ':
                    callback(mockTask.title);
                    break;
                case '詳細: ':
                    callback(mockTask.details);
                    break;
                case '締切日 (YYYY/MM/DD)※半角数字: ':
                    callback('2022/01/01');
                    break;
                case `優先度を選んでください:\n1. 高\n2. 中\n3. 低\n`:
                    callback('1');
                    break;
                default:
                    break;
            }
        });
        const expectedMessage = 'タスクを追加しました';

        // Act
        addTask();

        // Assert
        expect(consoleSpy).toHaveBeenCalledWith(expectedMessage);
    });
});

// 一覧テスト
describe('タスク一覧が表示されること', () => {
    let tasks;
    let consoleLogMock;

    //   初期値
    beforeEach(() => {
        tasks = [{
            id: 1,
            title: "タスク1",
            details: "タスク1の詳細",
            dueDate: new Date("2023-04-05"),
            priority: "低"
        },
        {
            id: 2,
            title: "タスク2",
            details: "タスク2の詳細",
            dueDate: new Date("2023-04-06"),
            priority: "中"
        },
        {
            id: 3,
            title: "タスク3",
            details: "タスク3の詳細",
            dueDate: new Date("2023-04-07"),
            priority: "高"
        }];

        consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => { });
    });
    // 初期化test関数が呼び出された後に処理される
    afterEach(() => {
        consoleLogMock.mockRestore();
    });

    test('タスク一覧が正常に表示される', async () => {
        // アクション
        showTasks(tasks);

        // 結果
        tasks.forEach(task => {
            expect(consoleLogMock).toHaveBeenCalledWith(`[ID:${task.id}], [タイトル:${task.title}],[詳細:${task.details}],[締切日:${task.dueDate.toLocaleDateString()}], [優先度:${task.priority}]`);
        });
    });
});

// 条件絞り一覧（締切日が近い順）テスト
describe('締切日が近い順に並び替えられること', () => {
    let tasks;
    let consoleLogMock;

    beforeEach(() => {
        tasks = [{
            id: 1,
            title: "タスク1",
            details: "タスク1の詳細",
            dueDate: new Date("2023-04-05"),
            priority: "低"
        },
        {
            id: 2,
            title: "タスク2",
            details: "タスク2の詳細",
            dueDate: new Date("2023-04-06"),
            priority: "中"
        },
        {
            id: 3,
            title: "タスク3",
            details: "タスク3の詳細",
            dueDate: new Date("2023-04-07"),
            priority: "高"
        }];
        consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => { });
    });

    afterEach(() => {
        consoleLogMock.mockRestore();
    });

    test('並び変えられた一覧が正常に表示できる', () => {
        showJokenTasks(tasks);

        tasks.forEach(task => {
            expect(consoleLogMock).toHaveBeenCalledWith(`[ID:${task.id}], [タイトル:${task.title}],[詳細:${task.details}],[締切日:${task.dueDate.toLocaleDateString()}], [優先度:${task.priority}]`);
        });
    });
});

// 条件絞り一覧（優先度が高い順）テスト
describe('優先度が高い順に並び替えられること', () => {
    let tasks;
    let consoleLogMock;

    beforeEach(() => {
        tasks = [{
            id: 1,
            title: "タスク1",
            details: "タスク1の詳細",
            dueDate: new Date("2023-04-05"),
            priority: "低"
        },
        {
            id: 2,
            title: "タスク2",
            details: "タスク2の詳細",
            dueDate: new Date("2023-04-06"),
            priority: "中"
        },
        {
            id: 3,
            title: "タスク3",
            details: "タスク3の詳細",
            dueDate: new Date("2023-04-07"),
            priority: "高"
        }];
        consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => { });
    });

    afterEach(() => {
        consoleLogMock.mockRestore();
    });

    test('並び変えられた一覧が正常に表示できる', () => {
        showJokenTasks(tasks);

        tasks.forEach(task => {
            expect(consoleLogMock).toHaveBeenCalledWith(`[ID:${task.id}], [タイトル:${task.title}],[詳細:${task.details}],[締切日:${task.dueDate.toLocaleDateString()}], [優先度:${task.priority}]`);
        });
    });
});

// 詳細テスト
describe('タスク詳細が表示されること', () => {
    let tasks;
    let consoleLogMock;

    beforeEach(() => {
        tasks = [{
            id: 1,
            title: "タスク1",
            details: "タスク1の詳細",
            dueDate: new Date("2023-04-07"),
            priority: "低"
        }];
        consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => { });
    });

    afterEach(() => {
        consoleLogMock.mockRestore();
    });

    test('', () => {
        showTaskDetails(tasks);

        tasks.forEach(task => {
            expect(consoleLogMock).toHaveBeenCalledWith(`[ID:${task.id}], [タイトル:${task.title}],[詳細:${task.details}],[締切日:${task.dueDate.toLocaleDateString()}], [優先度:${task.priority}]`);
        });
    });
});


// 更新テスト
describe('タスクが更新されること', () => {
    let tasks;
    let consoleLogMock;

    beforeEach(() => {
        tasks = [{
            id: 1,
            title: "タスク1",
            details: "タスク1の詳細",
            dueDate: new Date("2023-04-07"),
            priority: "低"
        }];
        consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => { });
    });

    afterEach(() => {
        consoleLogMock.mockRestore();
    });

    test('', () => {
        updateTask(tasks);

        tasks.forEach(task => {
            expect(consoleLogMock).toHaveBeenCalledWith(`[ID:${task.id}], [タイトル:${task.title}],[詳細:${task.details}],[締切日:${task.dueDate.toLocaleDateString()}], [優先度:${task.priority}]`);
        });
    });
});


// 削除テスト
describe('タスクが削除されること', () => {
    let tasks;

    beforeEach(() => {
        tasks = [{
            id: 1,
            title: "タスク1",
            details: "タスク1の詳細",
            dueDate: new Date("2023-04-07"),
            priority: "低"
        }];
    });

    test('タスクが正常に削除される', () => {
        const deletedTask = tasks[0];
        const result = deleteTask(deletedTask);

        expect(result).toBe(true);
        expect(tasks.length).toBe(0);
    });
});
