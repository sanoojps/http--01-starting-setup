import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from "axios";
import PropTypes from 'prop-types';

 /**
     * WS call
     */
class PostDetails {
    constructor(body,id,title,userId,author) {
        this.body = body;
        this.id = id;
        this.title = title;
        this.userId = userId;
        this.author = author;
    }
};

PostDetails.PropTypes = {
    body: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    title:  PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
}

class Blog extends Component {
    
    render () {

        const posts = this.state.posts.map(
            (post) => {
                return (
                    <Post 
                    key = {post.id}
                    title ={post.title}
                    author={post.author}
                    clicked={ () => {
                        return this.postClickhandler(post.id)
                    } }
                    >
                    </Post>
                )
            }
            );
        return (
            <div>
                <section className="Posts">
                   {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }

   
    componentDidMount = () => {
        axios.get(
            'https://jsonplaceholder.typicode.com/posts'
        ) //promise 
            .then(
                (response) => {

                    // console.log(response);
                    // console.log(response.config);
                    // console.log(response.data);
                    // console.log(response.headers);
                    // console.log(response.request);
                    // console.log(response.status);
                    // console.log(response.statusText);

                    /**
                * Seting state on call back
                */
                    if (response.status === 200) {

                        const posts = 
                        response.data.slice(0,4);

                        const updatedPosts = 
                        posts.map (
                            (post) => {
                                return ({
                                    ...post, // all properties from post
                                    author: 'Max'
                                }
                                );
                            }
                        );

                        this.setState(
                            {
                                posts: updatedPosts
                            }
                        )

                        console.log(
                            {
                                posts: updatedPosts
                            }
                        )
                    }
                    else {

                    }

                }
            ) //then
    }
    

    /**
     * State
     */
    state = {
        posts: [],
        selectedPostId: null
    }

    /**
     * Post click Handler
     *
     */
    postClickhandler = (id) => {
        this.setState(
            {
                selectedPostId: id
            }
        )
    };
}

export default Blog;