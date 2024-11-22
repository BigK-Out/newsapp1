"use client"


import React, {useState, useEffect} from 'react'
import PreLoader from '../components/PreLoader';
import { PostProps } from '../sections/Posts';
import PostItemOne from '../components/PostItemOne';
import PageTitle from '../components/PageTitle';

export default function PostItems() {
    const [items, setItems] = useState([]);

    const getItemsData = () =>{
        fetch(`/api/postitems`)
        .then(res=>res.json())
        .then(data => setItems(data))
        .catch(e => console.log(e.message));
    };

		useEffect(() => {
      getItemsData();
    }, [items])
    return (
      <main>
        <section id='posts' className='posts'>
          <div className="container">
            <div className='row'>
              <PageTitle title="why this doesnt work"/>
              {items && items.length > 0 ? (
                items.map((item: PostProps)=>(
                <div className='col-lg-3 col-md-6' key={item._id}>
                  <PostItemOne large={false} item={item} />
                </div>
              ))
            ) : (
              <PreLoader />
               )}
            </div>
          </div>
        </section>
      </main>    )
  }
