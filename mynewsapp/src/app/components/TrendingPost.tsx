import React from 'react'
import "./trendingPost.css"
import Link from 'next/link'

export default function TrendingPost({item,index}: {item: {_id: string; title: string; author: string}, index: number}) {
  return (
    <li>
        <Link href={`/postitems/${item._id}`}>
        <span className="number">{index + 1}</span>
        <h3>{item.title}</h3>
        <span className="author">{item.author}</span>
        </Link>
    </li>
  )
}
