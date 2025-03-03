"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";
import clsx from "clsx";

type Task = {
  id: string;
  title: string;
  content: string;
  completed: boolean;
  createdAt: number;
};

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const addTask = () => {
    if (newTitle.trim() === "") return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTitle,
      content: newContent,
      completed: false,
      createdAt: Date.now(),
    };

    setTasks([newTask, ...tasks]);
    setNewTitle("");
    setNewContent("");
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const sortedTasks = [...tasks].sort((a, b) => b.createdAt - a.createdAt);
  const activeTasks = sortedTasks.filter((task) => !task.completed);
  const completedTasks = sortedTasks.filter((task) => task.completed);

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Task</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && newTitle.trim() !== "") {
                  addTask();
                }
              }}
            />
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Content (optional)"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={addTask}
            className="w-full"
            disabled={newTitle.trim() === ""}
          >
            Add Task
          </Button>
        </CardFooter>
      </Card>

      <div className="space-y-4">
        {activeTasks.length > 0 && (
          <div className="space-y-3">
            {activeTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))}
          </div>
        )}

        {completedTasks.length > 0 && activeTasks.length > 0 && (
          <div className="py-2">
            <Separator />
            <p className="text-sm text-muted-foreground text-center py-2">
              Completed Tasks
            </p>
          </div>
        )}

        {completedTasks.length > 0 && (
          <div className="space-y-3 opacity-60">
            {completedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))}
          </div>
        )}

        {tasks.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No tasks yet. Add one above!
          </p>
        )}
      </div>
    </div>
  );
}

function TaskItem({
  task,
  onToggle,
  onDelete,
}: {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <Card className="transition-all">
      <CardContent className="px-4">
        <div
          className={clsx(
            "flex gap-3",
            task.content ? "items-start" : "items-center"
          )}
        >
          <Checkbox
            id={`task-${task.id}`}
            checked={task.completed}
            onCheckedChange={() => onToggle(task.id)}
            className={clsx(task.content && "mt-1")}
          />
          <div className="flex-1">
            <label
              htmlFor={`task-${task.id}`}
              className={`font-medium block ${
                task.completed ? "line-through text-muted-foreground" : ""
              }`}
            >
              {task.title}
            </label>
            {task.content && (
              <p
                className={`mt-1 text-sm ${
                  task.completed
                    ? "line-through text-muted-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {task.content}
              </p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(task.id)}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
