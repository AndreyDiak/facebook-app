import { useCollection } from "react-firebase-hooks/firestore"
import {getFirestore, collection, onSnapshot, orderBy} from "firebase/firestore"
import {db} from "../firebase";
import {Post, PostsType} from "./Post";
import {useEffect, useState} from "react";
import {query} from "@firebase/database";

export const Posts = () => {

  const [posts, setPosts] = useState([])
  console.log(posts)
  useEffect(
      () =>
          onSnapshot(
              query(collection(db, 'posts'), orderBy("timestamp", "desc")),
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
              key={post.id}
              {...post.data()}
            />
        </div>)
        : <> </>}
  </div>
}