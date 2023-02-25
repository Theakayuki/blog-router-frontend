import { Link, useRouteMatch } from "react-router-dom";

import React from "react";

export const PostLink = ({ post }) => {
  const { url } = useRouteMatch();
  return (
    <li className="list-group-item text-truncate">
      <Link to={`${url}/${post.id}`}>{post.title}</Link>
    </li>
  );
};

export default PostLink;
