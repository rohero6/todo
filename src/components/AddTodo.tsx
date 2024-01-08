import { useEffect, useRef, useState } from "react"
import { useTodo } from "../context/useTodo"
import { toast } from 'react-hot-toast'

export const AddTodo = () => {
    const [input, setInput] = useState<string>('')
    const inputRef = useRef<HTMLInputElement>(null)
    const { addTodo } = useTodo()

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (input.trim() !== '') {
            addTodo(input)
            setInput('')
            console.log('Todo added successfully');
            toast.success('Todo added successfully')
        } else {
            console.log('Todo field cannot be empty');

            toast.error('Todo field cannot be empty')
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex items-center w-full max-w-lg gap-2 p-5 m-auto">
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    type="text"
                    className="w-full px-5 py-2 bg-transparent border-2 outline-none border-zinc-600 rounded-xl placeholder:text-zinc-500 focus:border-white"
                    placeholder="start typing ..."
                />
                <button
                    type="submit"
                    className="px-5 py-2 text-sm font-normal text-blue-300 bg-blue-900 border-2 border-blue-900 active:scale-95 rounded-xl"
                >
                    Submit
                </button>
            </div>
        </form>
    )
}