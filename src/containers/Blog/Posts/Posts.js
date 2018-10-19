import React, { Component } from 'react';
import Post from "../../../components/Post/Post";
import axios from "../../../AxiosHandler";
import './Posts.css';

import {Link} from 'react-router-dom';
import FullPost from '../../../components/FullPost/FullPost';
import { Route } from 'react-router-dom';

export default class componentName extends Component {

/**
     * State
     */
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }


  render() {

    let posts = 
    (
        <p style={{textAlign: "center"}}>
            Something went wrong
        </p>
    )

    if (!this.state.error)
    {   
        posts = this.state.posts.map(
            (post) => {
                return (
                    //<Link
                    //to={"/" + post.id}
                    //>
                        <Post
                            key={post.id}
                            title={post.title}
                            author={post.author}
                            clicked={() => {
                                return this.postClickhandler(post.id)
                            }}
                        >
                        </Post>
                    //</Link>
                )
            }
            );
    }

    return (
        <div>
        <section className="Posts">
            {posts}
        </section>
        {/* <Route
        path={this.props.match.url + '/:id'}
        exact
        component={FullPost} 
        >
        </Route> */}
        </div>
    )
  }


  componentDidMount = () => {
    axios
    .get(
        "/posts"
    ) //promise 
    .catch(
        (error) => {
            console.log("error after get");
            console.log(error);
        }
    )
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

                    // console.log(
                    //     {
                    //         posts: updatedPosts
                    //     }
                    // )
                }
                else {

                }

            }
        ) //then
        .catch(
            (error) =>  {

                console.log(error);

                this.setState(
                    {
                        error:true
                    }
                )

            }
            );
        
}


/**
     * Post click Handler
     *
     */
    postClickhandler = (id) => {
        //this.setState(
          //  {
            //    selectedPostId: id
            //}
        //)

        console.log("this.props POSTS");
        console.log(this.props);
            
        this.props.history.push(
            {
                pathname: '/' + id,
            }
        );

    };


}

