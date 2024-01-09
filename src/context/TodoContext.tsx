import { createContext, useEffect, useState } from "react";
import { nanoid } from 'nanoid'
import { writeTextFile, BaseDirectory, readTextFile, exists } from '@tauri-apps/api/fs';


interface TodoContextProps {
    todos: Todo[],
    addTodo: (text: string) => void
    deleteTodo: (id: string) => void
    editTodo: (id: string, text: string) => void
    updateTodoStatus: (id: string) => void
}

export interface Todo {
    id: string
    text: string
    status: 'undone' | 'completed'
}

export const TodoContext = createContext<TodoContextProps | undefined>(
    undefined,
)

export const TodoProvider = (props: { children: React.ReactNode }) => {
    const [todos, setTodos] = useState<Todo[]>([])
    const [isWriteToFile, setIsWriteToFile] = useState<boolean>(false)
    useEffect(() => {
        writeToFile()
    }, [todos])
    useEffect(() => {
        loadDataFromFile()
    }, [])
    const loadDataFromFile = async () => {
        try {
            const exist = await exists('todos.json', { dir: BaseDirectory.AppData })
            if (exist) {
                const contents = await readTextFile('todos.json', { dir: BaseDirectory.AppData })
                if (contents) {
                    console.log(contents);

                    const parseData: Todo[] = JSON.parse(contents)
                    setTodos(parseData)
                    console.log('load data succ-----todo->', parseData);
                }
            }
        } catch (error) {
            console.error('load data err:', error);

        }
    }

    const writeToFile = async () => {
        try {
            if (isWriteToFile) {
                const todosJson = JSON.stringify(todos)
                console.log(todos);
                // Write a text file to the `$APPCONFIG/app.conf` path
                await writeTextFile({ path: 'todos.json', contents: todosJson }, { dir: BaseDirectory.AppData });
                console.log('write to file succ');
                setIsWriteToFile(false)
            }

        } catch (err) {
            console.error('write to file failed, err:', err);
        }
    }

    const addTodo = (text: string) => {
        const newTodo: Todo = {
            id: nanoid(),
            text,
            status: 'undone'
        }
        setTodos([...todos, newTodo])
        setIsWriteToFile(true)
    }
    const deleteTodo = (id: string) => {
        setTodos(preTodos => preTodos.filter(todo => todo.id !== id))
        setIsWriteToFile(true)
    }

    const editTodo = (id: string, text: string) => {
        setTodos(preTodos => {
            return preTodos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, text }
                }
                return todo
            })
        })
        setIsWriteToFile(true)
    }
    const updateTodoStatus = (id: string) => {
        setTodos(preTodos => {
            return preTodos.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        status: todo.status === 'undone' ? 'completed' : 'undone',
                    }
                }
                return todo
            })
        })
        setIsWriteToFile(true)
    }

    const value: TodoContextProps = {
        todos,
        addTodo,
        deleteTodo,
        editTodo,
        updateTodoStatus
    }
    return (
        <TodoContext.Provider value={value}>
            {props.children}
        </TodoContext.Provider>
    )
}