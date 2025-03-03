import TodoList from "@/components/todo-list";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen py-10 gap-16 sm:px-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <h1 className="text-3xl font-bold text-center mb-8">Todo List</h1>
        <div className="z-10 md:w-3xl items-center justify-between text-sm">
          <TodoList />
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://hadihajali.de"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by Hadi Al Hajali
        </a>
      </footer>
    </div>
  );
}
