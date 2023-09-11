"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter()

  const { data: session } = useSession();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if (session?.user.id) {
      fetchPosts();
    }
  }, []);

  // functions to delete and edit posts. Will be used in Profile and PromptCard components. Functionalities defined at app>api>prompt>[id]>route.js
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`) //redirects to app>update-prompt route
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("¿Seguro que quieres borrar este comando?")

    if(hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {method: 'DELETE'})
        
        const filteredPosts = posts.filter((p) => p._id !== post._id)

        setPosts(filteredPosts)

      } catch (error) {
        console.log(error)
      }
    } 
  };

  return (
    <Profile
      name="Mi"
      desc="Bienvenid@ a tu página de perfil personal. Aquí podrás consultar, editar o borrar los posts que has creado."
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
