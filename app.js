const STORAGE_KEY = 'vibe_todos_v1';

const $ = sel => document.querySelector(sel);
const $all = sel => Array.from(document.querySelectorAll(sel));

let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
let filter = 'all';

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2,6);
}

// Demo data (10 example tasks)
const DEMO_TODOS = [
  { text: 'Morning run — 30 minutes', done: false },
  { text: 'Buy groceries: tomatoes, basil, olive oil', done: false },
  { text: 'Finish client proposal and send for review', done: false },
  { text: 'Review PR #42 (frontend)', done: false },
  { text: 'Pay electricity & internet bills', done: false },
  { text: 'Prepare slides for Monday presentation', done: false },
  { text: 'Call Mom / check in', done: false },
  { text: 'Backup laptop and upload to cloud', done: false },
  { text: 'Zero inbox — clear or archive emails older than 2 weeks', done: false },
  { text: 'Plan Saturday hike + pack essentials', done: false }
];

const DEMO_FLAG = STORAGE_KEY + '_demo_loaded';

function loadDemo() {
  if (localStorage.getItem(DEMO_FLAG)) {
    // already loaded once, avoid duplicates
    return;
  }
  const items = DEMO_TODOS.map(d => ({ id: uid(), text: d.text, done: !!d.done }));
  // prepend demo items so they show at the top
  todos = items.concat(todos);
  save();
  localStorage.setItem(DEMO_FLAG, '1');
  render();
}

function render() {
  const list = $('#todo-list');
  list.innerHTML = '';
  const visible = todos.filter(t => {
    if (filter === 'all') return true;
    if (filter === 'active') return !t.done;
    return t.done;
  });

  visible.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.id = todo.id;

    const cb = document.createElement('button');
    cb.className = 'todo-checkbox' + (todo.done ? ' checked' : '');
    cb.setAttribute('aria-pressed', String(!!todo.done));
    cb.title = todo.done ? 'Mark as active' : 'Mark as done';

    cb.addEventListener('click', () => {
      toggleTodo(todo.id);
    });

    const span = document.createElement('div');
    span.className = 'todo-text' + (todo.done ? ' completed' : '');
    span.textContent = todo.text;
    span.tabIndex = 0;

    span.addEventListener('dblclick', () => startEdit(li, todo));
    span.addEventListener('keydown', (e) => { if (e.key === 'Enter') startEdit(li, todo); });

    const actions = document.createElement('div');
    actions.className = 'todo-actions';

    const editBtn = document.createElement('button');
    editBtn.className = 'icon-btn';
    editBtn.title = 'Edit';
    editBtn.textContent = '✏️';
    editBtn.addEventListener('click', () => startEdit(li, todo));

    const delBtn = document.createElement('button');
    delBtn.className = 'icon-btn';
    delBtn.title = 'Delete';
    delBtn.textContent = '🗑️';
    delBtn.addEventListener('click', () => removeTodo(todo.id));

    actions.append(editBtn, delBtn);

    li.append(cb, span, actions);
    list.appendChild(li);
  });

  $('#count').textContent = `${todos.filter(t => !t.done).length} items left`;
}

function addTodo(text) {
  const t = { id: uid(), text: text.trim(), done: false };
  if (!t.text) return;
  todos.unshift(t);
  save();
  render();
}

function toggleTodo(id) {
  todos = todos.map(t => t.id === id ? {...t, done: !t.done} : t);
  save();
  render();
}

function removeTodo(id) {
  todos = todos.filter(t => t.id !== id);
  save();
  render();
}

function startEdit(li, todo) {
  const input = document.createElement('input');
  input.value = todo.text;
  input.style.flex = '1';
  input.className = 'edit-input';

  function finish(saveText) {
    if (saveText !== undefined) {
      todo.text = saveText.trim() || todo.text;
      todos = todos.map(t => t.id === todo.id ? todo : t);
      save();
    }
    render();
  }

  const span = li.querySelector('.todo-text');
  span.replaceWith(input);
  input.focus();
  input.select();

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') finish(input.value);
    if (e.key === 'Escape') finish();
  });
  input.addEventListener('blur', () => finish(input.value));
}

function clearCompleted() {
  todos = todos.filter(t => !t.done);
  save();
  render();
}

function setFilter(f) {
  filter = f;
  $all('.filter').forEach(b => b.classList.toggle('active', b.dataset.filter === f));
  render();
}

// UI wiring
$('#add-btn').addEventListener('click', () => {
  const val = $('#todo-input').value;
  addTodo(val);
  $('#todo-input').value = '';
  $('#todo-input').focus();
});

$('#todo-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { $('#add-btn').click(); }
});

$all('.filter').forEach(b => b.addEventListener('click', (e) => setFilter(b.dataset.filter)));

$('#clear-completed').addEventListener('click', () => clearCompleted());
// wire demo loader button (if present)
const loadDemoBtn = document.getElementById('load-demo');
if (loadDemoBtn) loadDemoBtn.addEventListener('click', loadDemo);

// initial render
render();

// expose for debugging
window.vibeTodos = { get: () => todos, addTodo, toggleTodo, removeTodo, clearCompleted };
