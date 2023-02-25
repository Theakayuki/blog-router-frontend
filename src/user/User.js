import React, { useEffect, useState } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";

import { fetchUserWithPosts } from "../api";
import ErrorMessage from "../common/ErrorMessage";
import PostList from "./PostList";
import PostsNav from "./PostsNav";
import UserProfile from "./UserProfile";

export const User = () => {
  const [user, setUser] = useState({ posts: [] });
  const [error, setError] = useState(undefined);
  const { userId } = useRouteMatch().params;

  const { url } = useRouteMatch();
  useEffect(() => {
    const abortController = new AbortController();
    fetchUserWithPosts(userId, abortController.signal)
      .then(setUser)
      .catch(setError);

    return () => abortController.abort();
  }, [userId]);


  if (error) {
    return (
      <ErrorMessage error={error}>
        <p>
          <Link to="/">Return Home</Link>
        </p>
      </ErrorMessage>
    );
  }

  return (
    <section className="container">
      <PostsNav />
      <div className="border p-4 h-100 d-flex flex-column">
        <h2 className="mb-3">{user.name}</h2>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link className="nav-link active" to={url}>
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={`${url}/posts`}>
              Posts
            </Link>
          </li>
        </ul>

        {user.id ? (
          <div className="p-4 border border-top-0">
            <Switch>
              <Route path={`${url}/posts`}>
                <PostList posts={user.posts} />
              </Route>
              <Route path={`${url}`}>
                <UserProfile user={user} />
              </Route>
            </Switch>
          </div>
        ) : (
          <div className="p-4 border border-top-0">
            <p>Loading...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default User;
