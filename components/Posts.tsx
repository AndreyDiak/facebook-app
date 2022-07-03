import {collection, onSnapshot, orderBy} from "firebase/firestore"
import {db} from "../firebase";
import {Post} from "./Post";
import {useEffect, useState} from "react";
import {query} from "@firebase/database";

export const Posts = () => {

  const [posts, setPosts] = useState([])
  console.log(posts)
  useEffect(
      () =>
          onSnapshot(
              // @ts-ignore
              query(collection(db, 'posts'), orderBy("timestamp", "desc")),
              // @ts-ignore
              (snapshot) => {
                setPosts(snapshot.docs);
              }
          ),
      [db]
  )

  // const [realTimePosts, loading, error] = useCollection(
  //   collection(getFirestore(db.app), "posts")
  // )
  // console.log(realTimePosts);

  return <div>
    {/*{error && <strong>{JSON.stringify(error)}</strong>}*/}
    {/*{loading && <div>Collection: Loading...</div>}*/}
    {posts
        ? posts.map((post, index) => <div key={index}>
            <Post
              //@ts-ignore
              key={post.id}
              //@ts-ignore
              {...post.data()}
            />
        </div>)
        : <> </>}
  </div>
}