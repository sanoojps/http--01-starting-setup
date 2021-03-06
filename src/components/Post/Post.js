import React from 'react';

import './Post.css';

import {withRouter} from 'react-router-dom';


/**
 * Expected Prop Types
 */
/* eslint-disable */
import PropTypes from 'prop-types';
const propTypes = {
    title: PropTypes.string,
    id: PropTypes.number,
    key: PropTypes.number || PropTypes.string,
    author: PropTypes.string,
    clicked: PropTypes.func,
}
/* eslint-enable */

const post = (props) => (
    <article 
    className="Post"
    onClick={props.clicked}
    >
        <h1>{props.title}</h1>
        <div className="Info">
            <div className="Author">{props.author}</div>
        </div>
    </article>
);

/***
 * History Location and match
 * 
 * making this route aware
 * 
 * nearest loaded route's prop
 * 
 */
export default withRouter(post);