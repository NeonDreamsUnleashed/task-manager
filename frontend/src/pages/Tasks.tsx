import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import { useTasks } from "../hooks/useTasks";
import { showToast } from "../components/Toast";

const columns = [
  { id: "TODO",        label: "To Do",       cls: "col-todo" },
  { id: "IN_PROGRESS", label: "In Progress",  cls: "col-inprogress" },
  { id: "DONE",        label: "Done",         cls: "col-done" },
];

export default function Tasks() {
  const { tasks, loading, addTask, deleteTask, editTask, moveTask, getByStatus } = useTasks();

  const handleAdd = async (data: { title: string; description: string; priority: string }) => {
    try {
      await addTask(data);
      showToast("Задача добавлена", "success");
    } catch {
      showToast("Ошибка при добавлении", "error");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      showToast("Задача удалена", "info");
    } catch {
      showToast("Ошибка при удалении", "error");
    }
  };

  const onDragEnd = async (result: any) => {
    if (!result.destination) return;
    const { draggableId, destination } = result;
    await moveTask(draggableId, destination.droppableId);
  };

  return (
    <div className="page-tasks">
      <div className="page-header">
        <div>
          <h1 className="page-title">Task Board</h1>
          <p className="page-sub">{tasks.length} задач всего</p>
        </div>
      </div>

      <TaskForm onAdd={handleAdd} />

      {loading ? (
        <div className="loading-state">
          <div className="spinner" />
          <p>Загрузка задач...</p>
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="board">
            {columns.map((col) => {
              const colTasks = getByStatus(col.id);
              return (
                <Droppable droppableId={col.id} key={col.id}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={"column " + col.cls}
                    >
                      <div className="column-header">
                        <span className="column-title">{col.label}</span>
                        <span className="column-count">{colTasks.length}</span>
                      </div>

                      <div className="column-body">
                        {colTasks.map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={"draggable" + (snapshot.isDragging ? " dragging" : "")}
                                style={provided.draggableProps.style}
                              >
                                <TaskCard
                                  task={task}
                                  onDelete={handleDelete}
                                  onStatus={async (id, status) => moveTask(id, status)}
                                  onEdit={async (id, data) => { await editTask(id, data); showToast("Задача обновлена", "success"); }}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}

                        {colTasks.length === 0 && (
                          <div className="column-empty">Нет задач</div>
                        )}
                      </div>
                    </div>
                  )}
                </Droppable>
              );
            })}
          </div>
        </DragDropContext>
      )}
    </div>
  );
}
