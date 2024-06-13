import {useState, useEffect} from 'react'

import {db} from "../firebase/config"

import { 
  collection, //coleçao
  query, //pegar o dado
  orderBy, //ordençãp
  onSnapshot ,
  where,
  QuerySnapshot,
} //filtro
  from 'firebase/firestore'

  //docCcollectio coleção onde pego os dados
  //search parametro de busca     ()setado como Null
  //uid setado como null = pegar dados do usuario

  export const useFetchDocuments  =(docCcollectio,search = null, uid = null)=>{
    const[documents, setDocuments] = useState(null)
    const[error,setError] = useState(null)
    const[loading,setLoading] = useState(null)

    //estrutura simples não precisa do REDUCE

    const[cancelled,setCancelled] = useState(false);

    //useEffect consigo mapear algumas coisas que chegam

   useEffect(()=>{

    async function loadData(){
      if(cancelled) return

      setLoading(true) // carregando dados

      const collectionRef = await collection(db,docCcollectio)

      try{ 
        let q

        // busca


       if(search){ //chekar se a busca veio
        q = await query(collectionRef,where("tags","array-contains",search),orderBy("createdAt","desc"));// criando busca de dados por data
        

       }else if(uid){
        q = await query(collectionRef,where("uid","==",uid),orderBy("createdAt","desc"));// criando busca de dados por data


       }
        else{
        q = await query(collectionRef,orderBy("createdAt","desc"))// criando busca de dados por data

       }


       
        await onSnapshot(q,(QuerySnapshot)=>{

          setDocuments(
            QuerySnapshot.docs.map((doc)=>(
              {
                id: doc.id,//chave id
                ...doc.data(),//chaves 
              }
            ))

          )

        })//alterar dados novos dados

       setLoading(false)



      }catch(error){
        console.log(error)
        setError(error.message)

        setLoading(false)

      }


    }
    loadData();

   },[docCcollectio, search,uid,cancelled])

   /// elementos monitorados [docCcollectio,search,uid,cancelled]
   useEffect(()=>{
    return ()=> setCancelled(true)

   },[])
   return {documents,loading,error}
  }