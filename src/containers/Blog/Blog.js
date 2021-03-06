import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
//import axios from "axios";
import axios from '../../AxiosHandler';
import Posts from '../Blog/Posts/Posts';

//import Post from '../../components/Post/Post';


import {Route,Link,NavLink,Switch,Redirect} from 'react-router-dom';
import asyncComponent from '../../hoc/asyncComponent';

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

const AsyncNewPost = asyncComponent(() => {
    /**
     * returns a promise
     */
    return import('./NewPost/NewPost');
});
class Blog extends Component {
    state = {
        auth: true
    }

    render () {

        // let posts = 
        // (
        //     <p style={{textAlign: "center"}}>
        //         Something went wrong
        //     </p>
        // )

        // if (!this.state.error)
        // {   
        //     posts = this.state.posts.map(
        //         (post) => {
        //             return (
        //                 <Post 
        //                 key = {post.id}
        //                 title ={post.title}
        //                 author={post.author}
        //                 clicked={ () => {
        //                     return this.postClickhandler(post.id)
        //                 } }
        //                 >
        //                 </Post>
        //             )
        //         }
        //         );
        // }

        
        return (
            <div>
                <div className="Blog" >
                    <header>
                        <nav>
                            <ul>
                                <li>
                                    {/* <a
                                        href="/"
                                    >
                                        Home
                                </a> */}
                                <NavLink 
                                to="/" 
                                exact
                                activeClassName='active'
                                activeStyle={
                                    {
                                        color: '#fa923f'
                                    }
                                } 
                                >Home</NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                    to={{
                                        pathname: '/new-post',
                                        hash: '#submit',
                                        search: '?quick-submit=true'
                                    }}>New post</NavLink>
                                </li>
                                <li></li>
                            </ul>
                        </nav>
                    </header>
                </div>

                {/* <section className="Posts">
                   {posts}
                </section> */}
                {/* <section>
                    <FullPost 
                    id={this.state.selectedPostId} 
                    allPosts={this.state.posts}
                    deleteCallback={this.deletedPostsHandler}
                    />
                </section>
                <section>
                    <NewPost
                    postSuccessCallBack={this.postSuccessCallBackHandler}
                     />
                </section> */}

               {/* <Posts></Posts> */}

               {/* <Route path="/" exact render={ ()=> { return (<h1>Home</h1>) } } >
               </Route> */}
               
               <Switch>
               {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null}
               <Route path='/' exact component={Posts}/>
               <Route path= '/new-post' exact component={NewPost}/>
               <Route path= '/posts' exact component={Posts}/>
               
               {/**
                Dynamic routing
                route parameters
                */}
               {/* <Route path='/:postId' exact component={FullPost}/> */}
               {/* <Redirect from='/' to='/posts'> 
               </Redirect> */}
               
               {/**
                    Unknown route
                */
               }
               <Route
               render={() => <h1>Not found</h1>}
               >

                   </Route>               
               </Switch>
              
            </div>
        );
    }

   
    // componentDidMount = () => {
    //     axios
    //     .get(
    //         "/posts"
    //     ) //promise 
    //     .catch(
    //         (error) => {
    //             console.log("error after get");
    //             console.log(error);
    //         }
    //     )
    //         .then(
    //             (response) => {

    //                 // console.log(response);
    //                 // console.log(response.config);
    //                 // console.log(response.data);
    //                 // console.log(response.headers);
    //                 // console.log(response.request);
    //                 // console.log(response.status);
    //                 // console.log(response.statusText);

    //                 /**
    //             * Seting state on call back
    //             */
    //                 if (response.status === 200) {

    //                     const posts = 
    //                     response.data.slice(0,4);

    //                     const updatedPosts = 
    //                     posts.map (
    //                         (post) => {
    //                             return ({
    //                                 ...post, // all properties from post
    //                                 author: 'Max'
    //                             }
    //                             );
    //                         }
    //                     );

    //                     this.setState(
    //                         {
    //                             posts: updatedPosts
    //                         }
    //                     )

    //                     // console.log(
    //                     //     {
    //                     //         posts: updatedPosts
    //                     //     }
    //                     // )
    //                 }
    //                 else {

    //                 }

    //             }
    //         ) //then
    //         .catch(
    //             (error) =>  {

    //                 console.log(error);

    //                 this.setState(
    //                     {
    //                         error:true
    //                     }
    //                 )

    //             }
    //             );
            
    // }
    

    /**
     * State
     */
    state = {
        posts: [],
        selectedPostId: null,
        error: false
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

    /**
     * Deleted posts should be removed from display
     */
    deletedPostsHandler = (remainingPosts) => {
        this.setState({
            posts: remainingPosts,
            selectedPostId: null,
        })
    }


    /**
     * Post succesfull
     * 
     * New data added of type NewPostModel
     * 
     * Update to current list
     */
    postSuccessCallBackHandler = (data) => {

        console.log("data")
        console.log(data);

        const posts = [...this.state.posts];
        
        /**
         * data format
         * //author,content,id,title
         * 
         * Convery data to 
         * {
         *      //userId,body,id,title
         * }
         */
        const post ={...posts[0]};
        post.id = data.id
        post.title = data.title;
        post.body = data.content;
        post.author = data.author;


        posts.push(post);

        console.log(posts);

        this.setState(
            {
                posts: posts
            }
        )
    }
}


export default Blog;