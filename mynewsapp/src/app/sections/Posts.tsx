"use client";


import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import "./posts.css";
import PostItemOne from '../components/PostItemOne';
import TrendingPost from '../components/TrendingPost';
import PreLoader from '../components/PreLoader';

export interface PostProps {_id: string,
img: string;
category: string;
date: string;
title: string;
brief: string;
avatar: string;
author: string;}

export const initialPost = {
	_id: "",
	img: "",
	category: "",
	date: "",
	title: "",
	brief: "",
	avatar: "",
	author: "",
}

export default function Posts() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [item,setItem] = useState(initialPost);

  const getItemsData = () =>{
    fetch(`/api/postitems`)
    .then(res=> res.json())
    .then(data=>setItems(data))
    .catch(e=> console.log(e.message));
  }

  const getSinglePostData=(id:String)=>{
    fetch(`/api/postitems/${id}`)
    .then(res=>{
      if(res.status === 404){
        router.push("/not-found")
      }
      return res.json()
    })
    .then(data=> setItem(data))
    .catch(e => console.log(e.message))
  }
  
  useEffect(() =>{
    getItemsData();
    getSinglePostData("670a11fc988095a95668659f")
  }, [])

  return (
    <section id="posts" className='posts'>
      <div className="container" data-aos="fade-up">
        <div className="row g-5">
          <div className="col-lg-4">
            <PostItemOne large={true} item={item}/>
          </div>
          <div className="col-lg-8">
            <div className='row g-5'>
              <div className="col-lg-4 border-start custom-border">
              {items && 
          items.length > 0 ? items
          .filter
          ((item: {trending: boolean, top: boolean})=>
             !item.trending && !item.top
          )
          .slice(0,3)
          .map((item: PostProps)=>(
          <PostItemOne key={item._id} large={false} item={item} />
        )): (<PreLoader />)
          }
              </div>
              <div className="col-lg-4 border-start custom-border">
              {items && 
          items.length > 0 ? items
          .filter
          ((item: {trending: boolean, top: boolean})=>
             !item.trending && !item.top
          )
          .slice(3,6)
          .map((item: PostProps)=>(
          <PostItemOne key={item._id} large={false} item={item} />
        )): (<PreLoader />) 
          }
              </div>
              <div className="col-lg-4">
				<div className="trending">
					<h3>Trending</h3>
						<ul className='trending-post'>
							{
								items && items.length>0 ? items.filter((item: {trending: boolean})=> item.trending)
								.map((item:  PostProps, index: number) =>(
									<TrendingPost key={item._id} index={index} item={item}/>
								)): (<PreLoader />)
								
							}
						</ul>
				</div>
			  </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
 