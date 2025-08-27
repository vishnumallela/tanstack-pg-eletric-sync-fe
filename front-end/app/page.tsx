"use client";
import React, { useEffect, useState } from 'react'
import { electricCollectionOptions } from '@tanstack/electric-db-collection'
import { createCollection } from '@tanstack/react-db'
import { z } from 'zod'
import { useLiveQuery } from '@tanstack/react-db'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const todoSchema = z.object({
  id: z.number(),
  name: z.string()
})

type Todo = z.infer<typeof todoSchema>

const todoCollection = createCollection(
  electricCollectionOptions({
    id: 'sync-todos',
    shapeOptions: {
      url: 'http://localhost:3000/v1/shape',
      params: {
        table: 'todos',
      }
    },
    getKey: (item) => item.id,
    schema: todoSchema,
    onInsert: async ({ transaction }) => {
      console.log('Todo inserted:', transaction)
      return { txid: Date.now() }
    },
    onUpdate: async ({ transaction }) => {
      console.log('Todo updated:', transaction)
      return { txid: Date.now() }
    }
  })
)

const TodoApp = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [newTodoName, setNewTodoName] = useState('')
  
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const { data = [] } = useLiveQuery((query) =>
    query.from({ todo: todoCollection })
  )
  
  const safeData = isMounted ? data : []
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodoName.trim() === '') return
    
    const tempId = Date.now()
    const tempTodo = { id: tempId, name: newTodoName }
    
    todoCollection.insert(tempTodo)
    setNewTodoName('')
    
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: tempTodo.name }),
      })
      
      if (!response.ok) {
        todoCollection.delete(tempId)
        setNewTodoName(tempTodo.name)
        throw new Error('Failed to create todo')
      }
      
      const newTodo = await response.json()
      console.log('Created todo:', newTodo)
      
    } catch (error) {
      console.error('Error creating todo:', error)
    }
  }
    
  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Electric SQL Todo Sync</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <Input
            type="text"
            value={newTodoName}
            onChange={(e) => setNewTodoName(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1"
          />
          <Button type="submit">Add</Button>
        </form>
        
        {safeData.length > 0 ? (
          <div className="border rounded-md divide-y">
            {safeData.map((todo) => (
              <div key={todo.id} className="p-3">
                {todo.name}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No todos yet. Add one above!</p>
        )}
      </CardContent>
    </Card>
  )
}

export default function Home() {
  return <TodoApp />
}
