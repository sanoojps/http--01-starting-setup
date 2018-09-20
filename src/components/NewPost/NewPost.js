import React, { Component } from 'react';

import './NewPost.css';
import axios from 'axios';


class NewPostModel {
    title = '';
    content = '';
    author = 'Max';

    constructor(title,content,author) {
        this.title = title;
        this.content = content;
        this.author = author;
    }
}

class NewPost extends Component {
    state = //{
        new NewPostModel('','','Max');
    //}

    render () {
        return (
            <div className="NewPost">
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button
                onClick={this.postDataHandler}
                >Add Post</button>
            </div>
        );
    } //render

    postDataHandler = () => {

        const data = new NewPostModel(
           this.state.title,
            this.state.body,
            this.state.title,
        ) 

        //or 
        const dataAlt = {...this.state};

        axios
          .post(
              "https://jsonplaceholder.typicode.com/posts",
               data
               )
          .then(
              (response) => {
                  console.log(response);
              }
          );
    }
}

export default NewPost;