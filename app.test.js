const { showTasks } = require("./app");

describe('showTasks', () => {
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

    consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => {});
  });
// 初期化test関数が呼び出された後に処理される
  afterEach(() => {
    consoleLogMock.mockRestore();
  });

  test('タスク一覧が正常に表示される', () => {
    // アクション
    showTasks(tasks);

    // 結果
    tasks.forEach(task => {
      expect(consoleLogMock).toHaveBeenCalledWith(`[ID:${task.id}], [タイトル:${task.title}],[詳細:${task.details}],[締切日:${task.dueDate.toLocaleDateString()}], [優先度:${task.priority}]`);
    });
  });
});