import React from "react";
import { useParams } from "react-router-dom";
import imageRef from "../images/4.jpg"
import facebook from '../images/facebook.png'
import twitter from '../images/twitter.png'
import instagram from '../images/instagram.png'
import emma from '../images/emma.jpg'
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import draftToHtml from 'draftjs-to-html'
import parse from 'html-react-parser';

export default function Post() {

    const [ post, setPost ] = useState([]);
    const [textArea, setTextArea] = useState("");
    let { id } = useParams();

    useEffect( () => {
        axios.get(`http://localhost:5000/post/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
        .then(response => {
            console.log(response);
            setPost(response.data[0])
        })

    }, [id])

    function handleComment() {
        console.log('on comment section: ', textArea)
        const comment = {   
                            user: {name: '', profileImage:''}, 
                            comment: textArea,
                            date: new Date(),
                            replies: {list: ''}    
                        }
        console.log(comment);
        setTextArea('')
    }
    function handleText(e) {
        setTextArea(e.target.value);
    }

    return (
    <div className="article-section top-article">
        <h2 className='post-title'>{post.title}</h2>
        <div className='ssrr-article'>
            <img src={imageRef} alt="time" className='image' width='800px'></img>
{/*             <img src={post['image']} alt="time" className='image' width='800px'></img>
 */}                <div className='ssrr'>
                <a href='/'><img src={instagram} alt='fb' width='27px' className='ssrr-img'></img></a>
                <a href='/'><img src={facebook} alt='fb' width='27px' className='ssrr-img'></img></a>
                <a href='/'><img src={twitter} alt='fb' width='27px' className='ssrr-img'></img></a>
                </div>        
        </div>
        
        {/* <p className='date'> Sun fix, {post['date'].split('-')[2].slice(0, 2)}/{post['date'].split('-')[1]}/{post['date'].split('-')[0]} </p> */}
        {post['date'] !== undefined ? <p className='date'> Sun fix, {post['date'].split('-')[2].slice(0, 2)}/{post['date'].split('-')[1]}/{post['date'].split('-')[0]} </p> : <p>Loading...</p>}
      
        <div className='post-article'>{parse(draftToHtml(post.article))}</div>
        <div className="user-id">
            <img src={emma} className="profile-img2" alt='user-img' width='80px'/>
            <p>{post.quote}</p>
            <p className="user-bio">Artista, escritora, más de 10 años en el entretenimiento Artista, escritora, más de 10 años en el entretenimiento</p>
            <h5 className='autor-2'> Autor: {post.autor}</h5>    
        </div>

        <div className="comments-wrapper">
            <p className="title-comments">Comments</p>
                <div className="comment">
                    <p>THALIA!</p>
                    <p>I dont love this omg! {post.comments}</p>
                </div>
                <div className="comment">
                    <p>James!</p>
                    <p>I dont love this omg!</p>
                </div>
                <textarea className="comments" placeholder="write comment" onChange={handleText} value={textArea}/>
                <button className="post-button2" onClick={handleComment}>Post</button>
        </div>

    </div>
    );

}