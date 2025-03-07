"use client"

import { useState, useEffect } from "react"
import Post from "./post"
import { getAllPosts } from "../data/posts"

export default function PostList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulamos la carga de datos
    const loadPosts = () => {
      setLoading(true)
      // Obtenemos los posts de nuestro archivo de datos
      const postsData = getAllPosts()
      setPosts(postsData)
      setLoading(false)
    }

    loadPosts()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-md mx-auto">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}

