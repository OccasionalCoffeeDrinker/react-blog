import './App.css';
import BlogPost from './BlogPost.js'
import EditBlogPost from './EditPost.js'
import CreateBlogPost from './CreatePost.js'
import AllPosts from './AllPosts.js'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
      <Router>
      <div className="App">
            <div id="headerNav"><a   href="/">Home</a></div>
            < a href="/create"> <button  id="addButton">+</button></a>

        <h1 id="title">A simple blog about dogs - hope you like it</h1>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <AllPosts />
            </Route>
            <Route exact path="/create">
            <CreateBlogPost />
            </Route>
            <Route exact path="/:id">
            <BlogPost />
            </Route>
            <Route exact path="/:id/edit">
            <EditBlogPost />
            </Route>
          </Switch>
        </div>
      </div>
      </Router>
  );
}

export default App;
