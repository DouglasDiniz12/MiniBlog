//css
import styles from'./Home.module.css'

import { useNavigate,Link } from 'react-router-dom'
import { useState } from 'react'
import { useFetchDocuments } from '../../hooks/useFetchDocument'
import PostDetail from '../../componente/PostDetail'

const Home = () => {
  const[query, setQuery] = useState("")
  const{documents:posts, loading} = useFetchDocuments("posts")

  const navigate = useNavigate()

  const handleSubmit =(e)=>{
    e.preventDefault();

    if(query){
      return navigate(`/search?q=${query}`)
    }

  }
  return (
    <div className={styles.home}>
      <h1>Vejas nossos posts mais recentes</h1>
      <form  onSubmit={handleSubmit}>
        <input type="text" placeholder='ou busque por tags'  onChange={(e)=> setQuery(e.target.value) } value={query}/>
        <button className='btn btn-dark'>pesquisar</button>
      </form>

      <div>
        {loading && <p>carregando..</p>}
        {posts && posts.map((post)=> <PostDetail key={post.id} post={post}/>)}
        <h1>Posts...</h1>
        {posts && posts.length ===0 &&(
          <div className={styles.noposts}>
            <p>não foram encontrado posts</p>
            <Link to="posts/create" className="btn">Criar primeiro post</Link>
          </div>
  )}


</div>
</div>
)
}



export default Home
