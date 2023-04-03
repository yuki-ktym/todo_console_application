// Readlineモジュールを使用＝コンソールからの標準出力を処理するため
const readline = require('readline');

// インターフェースの入出力設定（ストリーム指定）
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// タスクのリスト
let tasks = [];

// タスクのID
let taskId = 1;

// 優先度の定義
const priorityOption = ['低', '中', '高'];

// タスク追加
function addTask() {
  console.log('--- 新規タスク作成 ---');
  rl.question('タイトル: ', (title) => {
    rl.question('詳細: ', (detail) => {
      rl.question('締切日 (YYYY/MM/DD)※半角数字: ', (dueDate) => {
        const priorityQuestion = `優先度を選んでください:\n${priorityOption.map((option, index) => `${index + 1}. ${option}`).join('\n')}\n`;
        rl.question(priorityQuestion, (answer) => {
          // parseInt＝文字列を整数へ変換
          const priority = priorityOption[parseInt(answer) - 1];
          tasks.push({
            id: taskId++,
            title: title,
            details: detail,
            dueDate: new Date(dueDate),
            priority: priority
          });
          console.log('タスクを追加しました');
          promptUser();
        });
      });
    });
  });
}

// 一覧表示（空の場合はテキスト表示）
function showTasks() {
  console.log('--- タスク一覧 ---');
  if (tasks.length === 0) {
    console.log('▲タスクはありません');
    promptUser();
  } else {
    tasks.sort((a, b) => a.id - b.id);
    tasks.forEach((task) => {
      console.log(`[ID:${task.id}], [タイトル:${task.title}],[詳細:${task.details}],[締切日:${task.dueDate.toLocaleDateString()}], [優先度:${task.priority}]`);
    });
    promptUser();
  }
}

// 一覧条件表示
// 締め切りが近い順の一覧、優先度が近い順の一覧
function showJokenTasks() {
  console.log('--- タスク条件検索 ---');
  if (tasks.length === 0) {
    console.log('▲タスクはありません');
    promptUser();

  } else {
    const jokenOption = ['締め切りが近い順で表示', '優先度が高い順で表示'];
    const jokenQuestion = `ソート方法を選んでください:\n${jokenOption.map((option, index) => `${index + 1}. ${option}`).join('\n')}\n`;
    rl.question(jokenQuestion, (answer) => {
      const jokenNumber = parseInt(answer);
      if (jokenNumber === 1) {
        tasks.sort((a, b) => a.dueDate - b.dueDate);
        tasks.forEach((task) => {
          console.log(`[ID:${task.id}], [タイトル:${task.title}],[詳細:${task.details}],[締切日:${task.dueDate.toLocaleDateString()}], [優先度:${task.priority}]`);
        });
      } else if (jokenNumber === 2) {
        tasks.sort((a, b) => {
          const priorityA = priorityOption.indexOf(a.priority);
          const priorityB = priorityOption.indexOf(b.priority);
          return priorityB - priorityA;
        });
        tasks.forEach((task) => {
          console.log(`[ID:${task.id}], [タイトル:${task.title}],[詳細:${task.details}],[締切日:${task.dueDate.toLocaleDateString()}], [優先度:${task.priority}]`);
        });
      } else {
        console.log('無効な選択肢です');
      }
      promptUser();
    });

  };
}

// 詳細表示
function showTaskDetails() {
  console.log('--- タスクの詳細 ---');
  rl.question('タスクIDを入力してください:', (id) => {
    const task = tasks.find((t) => t.id === parseInt(id));
    if (task) {
      console.log(`[${task.id}] ${task.title} (due: ${task.dueDate.toLocaleDateString()}, priority: ${task.priority})`);
      console.log(`詳細: ${task.details}`);
    } else {
      console.log('タスクはありません');
    }
    promptUser();
  });
}

// 更新
function updateTask() {
  console.log('--- タスク更新 ---');
  rl.question('タスクIDを入力してください: ', (id) => {
    const task = tasks.find((t) => t.id === parseInt(id));
    if (task) {
      rl.question(`タイトル (${task.title}): `, (title) => {
        rl.question(`詳細 (${task.details}): `, (details) => {
          rl.question(`締切日 (${task.dueDate.toLocaleDateString()}): `, (dueDate) => {
            const priorityQuestion = `優先度を選んでください(${task.priority}):\n${priorityOption.map((option, index) => `${index + 1}. ${option}`).join('\n')}\n`;
            rl.question(priorityQuestion, (answer) => {
              const priority = priorityOption[parseInt(answer) - 1];
              task.title = title || task.title;
              task.details = details || task.details;
              task.dueDate = dueDate ? new Date(dueDate) : task.dueDate;
              task.priority = priority || task.priority;
              console.log('更新完了');
              promptUser();
            });
          });
        });
      });
    } else {
      console.log('タスクはありません');
      promptUser();
    }
  });
}

// 削除
function deleteTask() {
  console.log('--- タスク削除 ---');
  rl.question('タスクIDを入力してください: ', (id) => {
    const index = tasks.findIndex((t) => t.id === parseInt(id));
    if (index !== 0) {
      tasks.splice(index, 1);
      console.log('削除完了');
    } else {
      console.log('タスクはありません');
    }
    promptUser();
  });
}

// ユーザーからの入力を待ち、処理を実行する関数
function promptUser() {
  console.log('');
  console.log('---【 TODO管理アプリケーション 】-----------------------------------------------------');
  console.log('1. タスク追加');
  console.log('2. タスク一覧');
  console.log('3. タスク条件検索');
  console.log('4. 詳細');
  console.log('5. 更新');
  console.log('6. 削除');
  console.log('7. 終了');
  rl.question('--1~7の番号の中から操作方法をお選びください-- 選択項目:', (choice) => {
    switch (choice) {
      case '1':
        addTask();
        break;
      case '2':
        showTasks();
        break;
      case '3':
        showJokenTasks();
        break;
      case '4':
        showTaskDetails();
        break;
      case '5':
        updateTask();
        break;
      case '6':
        deleteTask();
        break;
      case '7':
        rl.close();
        break;
      default:
        console.log('▲もう一度試してください');
        promptUser();
    }
  });
}

promptUser();