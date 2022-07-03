import {useSession} from "next-auth/react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import {EmojiHappyIcon} from "@heroicons/react/outline";
import {CameraIcon, VideoCameraIcon} from "@heroicons/react/solid"
import {useEffect, useRef, useState} from "react";
import { db, storage } from "../firebase"
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { getDatabase, onValue, ref as rf, child, get } from "firebase/database";
import {doc, setDoc, serverTimestamp, updateDoc, collection, addDoc} from "firebase/firestore"

export const InputBox = () => {
  const {data} = useSession();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const filePickerRef = useRef<HTMLInputElement | null>(null);

  const [imageToPost, setImageToPost] = useState(null);
  const [posts, setPosts] = useState(null);
  // console.log(imageToPost);
  // console.log(posts);
  const addImageToPost = (e: any) => {
    const reader = new FileReader()
    console.log(reader);
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      // @ts-ignore
      setImageToPost(readerEvent.target.result)
    }
  }

  const removeImage = () => {
    setImageToPost(null);
  }

  const sendPost = async (e: any) => {
    e.preventDefault();
    // @ts-ignore
    let value = inputRef.current.value;
    if(!value) return;

    const docRef = await addDoc(collection(db, 'posts'), {
      message: value,
      name: data?.user?.name,
      email: data?.user?.email || "",
      image: data?.user?.image || "",
      timestamp: serverTimestamp(),
    })

    console.log("Ned doc added with ID", docRef.id);

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if(imageToPost) {
      await uploadString(imageRef, imageToPost, "data_url").then(async snapshot => {
        const downloadUrl = await getDownloadURL(imageRef);
        await updateDoc(doc(db, 'posts', docRef.id), {
          postImage: downloadUrl
        })
      })
      removeImage();
    }

    // const postRef = doc(db, "posts", id);
    //
    // await setDoc(postRef, {
    //   _id: id,
    //   message: value,
    //   name: data?.user?.name,
    //   email: data?.user?.email || "",
    //   image: data?.user?.image || "",
    //   timestamp: serverTimestamp(),
    // }).then((document) => {
    //   // if user attached photo...
    //   if (imageToPost) {
    //     // crete reference into the storage...
    //     const imgRef = ref(storage, id);
    //
    //     uploadString(imgRef, imageToPost, 'data_url')
    //       .then((snapshot) => {
    //
    //         getDownloadURL(ref(imgRef))
    //           .then(async (url) => {
    //             // we take image url and now need to push it into post object...
    //             await updateDoc(postRef, {
    //               postImage: url
    //             })
    //           })
    //         // need to update docs and create ref to the post image...
    //         removeImage();
    //       })
    //   }
    // })
    // @ts-ignore
    inputRef.current.value = "";
  }

  useEffect(() => {
    const dbRef = rf(getDatabase());
    get(child(dbRef, "posts/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log(data);
        } else {
          console.log('No data available')
        }
    }).catch((error) => {
      console.error(error);
    })
    // const postsRef = rf(DB, "posts/");
    // onValue(postsRef, (snapshot) => {
    //   const data = snapshot.val();
    //   console.log(data);
    //   setPosts(data);
    // })
  }, [])

  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-600 font-medium">
      <div className="flex flex-auto space-x-3 items-center p-4">
        <Image
          className="rounded-full"
          src={data?.user?.image!}
          width={40}
          height={40}
          layout="fixed"
          alt=""
        />
        <form className="flex flex-1" action="">
          <input
            className="rounded-full h-12 w-full bg-gray-100 flex-grow px-5 focus:outline-none"
            type="text"
            ref={inputRef}
            placeholder={`What's on your mind ${data?.user?.name}`}
          />
          <button hidden type="submit" onClick={sendPost}>
            Submit
          </button>
        </form>

        {imageToPost && (
          <div
            onClick={removeImage}
            className="flex flex-col filter hover:brightness-110 transition duration-150
            transform hover:scale-105 cursor-pointer"
            >
            <img src={imageToPost} className="h-10 object-contain" alt=""/>
            <p className="text-xs text-red-500 text-center">Remove</p>
          </div>
        )}

      </div>
      <div className="flex justify-evenly p-3 border-t-2">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>
        <div
          onClick={() => filePickerRef.current?.click()}
          className="inputIcon">
          <CameraIcon className="h-7 text-green-400" />
          <p className="text-xs sm: text-sm xl:text-base">Photo/Video</p>
          <input
            type="file"
            hidden
            onChange={addImageToPost}
            ref={filePickerRef}/>
        </div>
        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yellow-300" />
          <p className="text-xs sm: text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  )
}