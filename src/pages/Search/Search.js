import React from 'react'
import { useFetchDocuments } from '../../hooks/useFetchDocument'
import { useQuery } from '../../hooks/useQuery'
import PostDetail from '../../componente/PostDetail'
import { Link } from 'react-router-dom'
import styles from './Search.module.css'


const Search = () => {
  const query = useQuery()

  const search = query.get("q")

  const {documents: posts} = useFetchDocuments("posts",search)
  return (
    <div className={styles.search_container}>
      <h2>search</h2>
      <div>
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
          <p>não foram encontrado post a partir da sua busca...</p>
          <Link to="/"className='btn btn-dark' >voltar</Link>
          </div>
        )}
        {posts && posts.map((post)=>(
          <PostDetail key={post.id} post={post}/>
        ))}
      </div>
    </div>
  )
}

export default Search