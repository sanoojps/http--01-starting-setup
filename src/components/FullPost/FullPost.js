import React, { Component } from 'react';

import './FullPost.css';
import axios from 'axios';

/**
 * Expected Prop Types
 */
/* eslint-disable */
import PropTypes from 'prop-types';
import Axios from 'axios';
const propTypes = {
    id: PropTypes.number.isRequired || PropTypes.string.isRequired,
}
/* eslint-enable */

class FullPost extends Component {
    render () {

        let post = <p style={{textAlign:"center"}}>Please select a Post!</p>;
        
        if (this.props.id) {
            post = <p style={{textAlign:"center"}}>Loading</p>;
        }

        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.content}</p>
                    <div className="Edit">
                        <button className="Delete">Delete</button>
                    </div>
                </div>
    
            );
        }
        return post;
    }

    /**
     * Make full post WS call
     * // updating state causes infinite loop
     * 
     */
    componentDidUpdate = (prevProps, prevState) => {
        /**
         * Null check
         */
        console.log("arguments");
        console.log(prevProps);
        // console.log(prevState);

        if (this.props.id) {

            /**
             * Perform WS only if there is a change
             */
            if (prevProps.id === this.props.id) {
                return
            }

            axios.get(
                'https://jsonplaceholder.typicode.com/posts/' + this.props.id
            ).then(
                (response) => {
                  if (response.status === 200)
                  {   
                      this.setState({
                          loadedPost: response.data
                      })
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

      
    }


    state = {
        loadedPost : null
    }
    
}

FullPost.PropTypes = propTypes

export default FullPost;