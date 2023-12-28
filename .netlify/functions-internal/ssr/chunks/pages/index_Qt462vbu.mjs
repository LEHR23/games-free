/* empty css                          */
import { e as createAstro, f as createComponent, r as renderTemplate, h as addAttribute, i as renderHead, j as renderSlot, k as renderComponent } from '../astro_djpS_wdL.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';

const $$Astro$1 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body class="bg-teal-700 flex flex-col items-center h-full w-full pt-5"> <main> ${renderSlot($$result, $$slots["default"])} </main> </body></html>`;
}, "C:/Users/ernes/Archivos/Proyectos/games-free/src/layouts/Layout.astro", void 0);

const Form = () => {
  const [title, setTitel] = useState("");
  async function addTask(event) {
    event.preventDefault();
    await (await fetch("/api/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title })
    })).json();
    setTitel("");
  }
  return /* @__PURE__ */ jsxs("form", { className: "flex justify-between mt-2", children: [
    /* @__PURE__ */ jsx("input", { type: "text", className: "flex-1 rounded-l-lg", value: title, onChange: (event) => {
      setTitel(event.target.value);
    } }),
    /* @__PURE__ */ jsx("input", { type: "submit", value: "Add", onClick: addTask, className: "p-2 bg-black text-white cursor-pointer rounded-r-lg" })
  ] });
};

const Item = ({ idTask, completed, title }) => {
  const [isCompleted, setIsCompleted] = useState(completed);
  const [newTitle, setNewTitle] = useState("new title");
  async function deleteTask() {
    await fetch("/api/task", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ idTask })
    }).then(async (response) => {
    }).catch((error) => console.error(error));
  }
  async function editTask() {
    await fetch("/api/task", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ idTask, newTitle, isCompleted })
    }).then(async (response) => {
      const result = await response.json();
      console.log(result);
    }).catch((error) => console.error(error));
  }
  async function handleCheckbox() {
    await fetch("/api/task", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ idTask, newTitle: title, isCompleted: !isCompleted })
    }).then(async (response) => {
      setIsCompleted(!isCompleted);
    }).catch((error) => console.error(error));
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex justify-between py-2 px-2 rounded-md hover:bg-zinc-900", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-center", children: [
      /* @__PURE__ */ jsx("div", { className: `w-3 h-3 mr-2 border rounded-full cursor-pointer ${isCompleted ? "bg-green-200" : ""}`, onClick: handleCheckbox }),
      /* @__PURE__ */ jsx("p", { className: `text-2md text-white ${isCompleted ? "line-through" : ""}`, children: title })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-center", children: [
      /* @__PURE__ */ jsx(
        "svg",
        {
          className: `w-6 cursor-pointer stroke-1	stroke-white ${isCompleted ? "stroke-green-200" : ""}`,
          width: "24px",
          height: "24px",
          viewBox: "0 0 24 24",
          fill: "none",
          onClick: editTask,
          children: /* @__PURE__ */ jsx("path", { d: "M12.4445 19.6875H20.9445M14.4443 5.68747L5.44587 14.6859C4.78722 15.3446 4.26719 16.1441 4.10888 17.062C3.94903 17.9888 3.89583 19.139 4.44432 19.6875C4.99281 20.236 6.14299 20.1828 7.0698 20.0229C7.98772 19.8646 8.78722 19.3446 9.44587 18.6859L18.4443 9.68747M14.4443 5.68747C14.4443 5.68747 17.4443 2.68747 19.4443 4.68747C21.4443 6.68747 18.4443 9.68747 18.4443 9.68747M14.4443 5.68747L18.4443 9.68747" })
        }
      ),
      /* @__PURE__ */ jsx(
        "svg",
        {
          className: `w-6 cursor-pointer stroke-1	stroke-white ml-2 ${isCompleted ? "stroke-green-200" : ""}`,
          width: "24px",
          height: "24px",
          viewBox: "0 0 24 24",
          fill: "none",
          onClick: deleteTask,
          children: /* @__PURE__ */ jsx("path", { d: "M5 6.77273H9.2M19 6.77273H14.8M9.2 6.77273V5.5C9.2 4.94772 9.64772 4.5 10.2 4.5H13.8C14.3523 4.5 14.8 4.94772 14.8 5.5V6.77273M9.2 6.77273H14.8M6.4 8.59091V15.8636C6.4 17.5778 6.4 18.4349 6.94673 18.9675C7.49347 19.5 8.37342 19.5 10.1333 19.5H13.8667C15.6266 19.5 16.5065 19.5 17.0533 18.9675C17.6 18.4349 17.6 17.5778 17.6 15.8636V8.59091M9.2 10.4091V15.8636M12 10.4091V15.8636M14.8 10.4091V15.8636" })
        }
      )
    ] })
  ] });
};

const TaskList = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    getTodos();
  }, []);
  async function getTodos() {
    await fetch("/api/task").then(async (response) => {
      const result = await response.json();
      setTodos(result.documents);
    }).catch((error) => console.error(error));
  }
  return /* @__PURE__ */ jsx(Fragment, { children: todos.map(function(todo) {
    return /* @__PURE__ */ jsx(Item, { idTask: todo.$id, title: todo.title, completed: todo.isCompleted }, todo.$id);
  }) });
};

function CardCounter() {
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);
  useEffect(() => {
    getTaskCounter();
  }, []);
  const getTaskCounter = async () => {
    const result = await (await fetch("/api/task")).json();
    setTotalRecords(result.total);
    const completed = result.documents.filter((task) => task.isCompleted);
    setTotalCompleted(completed.length);
  };
  return /* @__PURE__ */ jsxs("div", { className: "border rounded-md py-5 px-5 flex flex-col md:flex-row justify-center items-center text-white", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-mono text-2xl md:text-4xl", children: "Tareas realizadas" }),
    /* @__PURE__ */ jsx("div", { className: "py-5 px-5 bg-black md:ml-2 rounded-full mt-2 md:mt-0", children: /* @__PURE__ */ jsxs("p", { children: [
      totalCompleted,
      "/",
      totalRecords
    ] }) })
  ] });
}

const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Todo" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CardCounter", CardCounter, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "C:/Users/ernes/Archivos/Proyectos/games-free/src/components/CardCounter.jsx", "client:component-export": "default" })} ${renderComponent($$result2, "Form", Form, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "C:/Users/ernes/Archivos/Proyectos/games-free/src/components/Form.jsx", "client:component-export": "default" })} ${renderComponent($$result2, "TaskList", TaskList, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/ernes/Archivos/Proyectos/games-free/src/components/TaskList.jsx", "client:component-export": "default" })} ` })}`;
}, "C:/Users/ernes/Archivos/Proyectos/games-free/src/pages/index.astro", void 0);

const $$file = "C:/Users/ernes/Archivos/Proyectos/games-free/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, prerender, $$url as url };
