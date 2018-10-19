import React, { Component } from 'react';

import './FullPost.css';
import axios from '../../AxiosHandler';

/**
 * Expected Prop Types
 */
/* eslint-disable */
import PropTypes from 'prop-types';
const propTypes = {
    id: PropTypes.number.isRequired || PropTypes.string.isRequired,
    allPosts: PropTypes.array,
    deleteCallback: PropTypes.func,
    getPostDetailsErrorCallback: PropTypes.func,
}
/* eslint-enable */

class FullPost extends Component {

    render () {

        let post = <p style={{textAlign:"center"}}>Please select a Post!</p>;
        
        if (this.props.id && !this.clearSelection) {
            post = <p style={{textAlign:"center"}}>Loading</p>;
        }

        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.content}</p>
                    <div className="Edit">
                        <button
                         className="Delete"
                         onClick={this.deletePostHandler}
                         >Delete</button>
                    </div>
                </div>
    
            );
        }
        return post;
    }

    loadData() {
        console.log("loadData FullPost");
        console.log(this.props);
        console.log(this.state);
        
        if (this.props.match.params.postId) {
            if (!this.state.loadedPost ||
                 (this.state.loadedPost &&
                     this.state.loadedPost.id !==
                      +this.props.match.params.postId)) {
                axios.get('/posts/' + this.props.match.params.postId)
                    .then(response => {
                        console.log("response");
                        console.log(response);
                        this.setState({ loadedPost: response.data });
                    });
            }
        }
    }


    componentDidMount() {
        console.log(this.props);
        this.loadData();
    }
    
    componentDidUpdate = (prevProps, prevState) => {
      this.loadData();
    }
    


// componentDidMount() {
//     console.log(this.props);

//     if (this.props.match.params.postId) {
    
//         if (this.state.loadedPost || (
//             this.state.loadedPost
//         ))
//             {

//             }

//         axios
//         .get(
//             'https://jsonplaceholder.typicode.com/posts/' + 
//             this.props.match.params.postId
//         )
//         .then(
//             (response) => {
//                 if (response.status === 200) {
//                     this.setState({
//                         loadedPost: response.data
//                     })
//                 }
//                 else {
//                     console.log(
//                         response
//                     );
//                 }
//             }

//         ) //then
//         .catch(
//             (error) => {
//                 console.log("error after get");
//                 console.log(error);
//                 /**
//                  * Signal Error
//                  */
//                 //this.props.getPostDetailsErrorCallback(error);
//             }
//         )


//     }
//     else 
//     {

//     }
    
// }


    // /**
    //  * Make full post WS call
    //  * // updating state causes infinite loop
    //  * 
    //  */
    // componentDidUpdate = (prevProps, prevState) => {
    //     /**
    //      * Null check
    //      */
    //     //console.log("arguments");
    //     //console.log(prevProps);
    //     // console.log(prevState);

    //     if (this.props.id) {

    //         /**
    //          * Perform WS only if there is a change
    //          */
    //         if (prevProps.id === this.props.id) {
    //             return
    //         }

    //         axios
    //             .get(
    //                 'https://jsonplaceholder.typicode.com/posts/' + this.props.id
    //             )
    //             .then(
    //                 (response) => {
    //                     if (response.status === 200) {
    //                         this.setState({
    //                             loadedPost: response.data
    //                         })
    //                     }
    //                     else {
    //                         console.log(
    //                             response
    //                         );
    //                     }
    //                 }

    //             ) //then
    //             .catch(
    //                 (error) => {
    //                     console.log("error after get");
    //                     console.log(error);
    //                     /**
    //                      * Signal Error
    //                      */
    //                     this.props.getPostDetailsErrorCallback(error);
    //                 }
    //             )
    //     }
    //     else
    //     {
    //         //id nil
    //     }

      
    // }


    state = {
        loadedPost : null
    };
    

    deletePostHandler = () => {

        if (this.props.id) {

        axios.delete(
            'https://jsonplaceholder.typicode.com/posts/' + this.props.id
        ).then(
            (response) => {

                // console.log(
                //     response
                // );

              if (response.status === 200)
              {   
                  const posts = 
                  this.props.allPosts;

                  //console.log(posts);

                  const filteredPosts =   
                  posts.filter(
                      (element) => {
                            return element.id !== this.props.id
                      }
                  );

                  /**
                   * Clean slate
                   * 
                   * Clear state
                   * 
                 
                   */
                  /**
                   * Update state so that selected post is also cleared
                   */
                  this.setState({
                    loadedPost : null
                  })

                   /**
                   * Signal Blog 
                   * 
                   * Clear props.id as nothing is selected
                   */
                  this.props.deleteCallback(
                    filteredPosts
                  );
              }
              else
              {
                  console.log(
                      response
                  );
              }
            }
           
        ) //then
    }
    else
    {
        //id nil
    }
    };

}

FullPost.PropTypes = propTypes

export default FullPost;