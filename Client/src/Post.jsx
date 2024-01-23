import React from 'react'
import './Post.css'

export default function Post() {
  return (
    <div>
        <main>
          <div className="post">
            <div className="image">
              <img src="https://img.freepik.com/free-photo/blog-website-development-data-network-concept_53876-125055.jpg" alt="" />
            </div>
            <div className="texts">
              <h2>this is the blog title</h2>
              <p className="info">
                <a className='author'>Pawan</a>
                <p>2024/01/21</p>
              </p>
              <p className='summary'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere repellat, quia at laboriosam pariatur adipisci vel debitis vitae non recusandae optio veritatis, nihil perspiciatis quaerat modi? Atque vitae corporis, sunt neque sint soluta at voluptatem labore deserunt perspiciatis odit delectus quaerat architecto? Nam, hic harum veniam totam ipsum atque sed?</p>
            </div>
        </div>
      </main>
    </div>
  )
}
