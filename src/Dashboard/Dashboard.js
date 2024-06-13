import styles  from './Dashboard.module.css'

import { Link } from 'react-router-dom'

import { useAuthValue } from '../context/AuthContext'
import { useFetchDocuments } from '../hooks/useFetchDocument'
import React from 'react'
import { useDeleteDocument } from '../hooks/useDeleteDocument'

const Dashboard = () => {
  const{user} = useAuthValue()
  const uid =user.uid

  const {documents:posts, loading} = useFetchDocuments("posts",null,uid)
  const {deleteDocument} = useDeleteDocument('posts')



    if(loading){
      return <p>carregando...</p>
    }



  return (
    <div>
      <h2 className={styles.dashboard}>Dashboard</h2>
         <p>gerencie o seus posts</p>
      {posts &&  posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>não foram encontado posts</p>
          <Link to ="/posts/create" className='btn'>Criar primeiro post</Link>
        </div>
      ):(
      <>
      <div className={styles.post_header}>
        <span>titulo</span>
        <span>Ações</span>
        </div>
         {posts && posts.map((post)=>   <div key={post.id} className={styles.pos_row}>

          <p>{post.title}</p>
          <div>
            <Link to={`/posts/${post.id}`} className='btn btn-outline'>Ver</Link>
        
            <Link to={`/posts/edit/${post.id}` } className='btn btn-outline'>Editar</Link>

            <button onClick={()=> deleteDocument(post.id) } className='btn btn-outline btn-danger'>Excluir</button>
          </div>


         </div>)}

         </>
      )}

    </div>
  )
}

export default Dashboard
