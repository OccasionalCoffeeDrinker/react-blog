import { useParams } from "react-router";
import { useEffect, useState } from 'react';



const BlogPost = () => {
    const { id } = useParams()
    var listOfPosts = [];
    const [items, setState] = useState([]);
    const [items1, setState1] = useState([]);
    const [key, setState2] = useState(1);
    function uploadComment() {
      // {
      //   text: string(length: 6-50, preview only)
      //   image: string(url)
      //   likes: number(init value: 0)
      //   tags: array(string)
      //   owner: string(User id)
      //   }

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',  'app-id': '619c356052f97f152848512b' },
          body: JSON.stringify({ 
            message: document.getElementById("commentText").value,
            post: id,
            owner: '60d0fe4f5311236168a109ca'//Owner is sara
          })
        };
        fetch('https://dummyapi.io/data/v1/comment/create', requestOptions)
            .then(response => response.json())
            .then(data => {
              //this.setState({ postId: data.id })
              alert("comment successfully added!");
              
              document.getElementById("commentName").value = ""
              document.getElementById("commentText").value = ""
            });
    }
    function registerUser() {
      // alert("wow");
      var name = document.getElementById("commentName").value
      var text = document.getElementById("commentText").value
      var date = new Date()

      var tmp1 = <li key={items1.length} style={{ padding: '5px', margin: ' 10px', backgroundColor: '#5F9EA0', borderRadius: '10px',  paddingBottom: "30px"}} >
                        <h2> {name} </h2>
                        <h5> {date.toDateString()}</h5>
                        <span style={{display: 'inline-block'}}>{text}</span>


                    </li>
                    items1.push(tmp1)
                    setState2(Math.random());

                    uploadComment();
    }

    useEffect (() => {
        fetch('https://dummyapi.io/data/v1/post/' + id, { 
          method: 'get', 
          headers: new Headers({
            'app-id': '619c356052f97f152848512b'
          }) })
        .then(res => {
          return res.json();
        })
        .then(data => {
            var dataCopy = data;

            var tmp = <li key={items.length} style={{ padding: '5px', margin: '10px', backgroundColor: '#5F9EA0', borderRadius: '10px'}} >
                        <h2> {dataCopy.owner.title +  ' '  + dataCopy.owner.firstName +  ' '  + dataCopy.owner.lastName} </h2>
                        <h5> {dataCopy.publishDate}</h5>
                        <img src={dataCopy.image} height="300" width="300" style={{display: 'inline-block'}}></img><br/>
                        <span style={{display: 'inline-block'}}>{dataCopy.text}</span>
                        <div style={{margin: '20px' }}> 
                            {dataCopy.tags.map((d, i) => <span style={{ padding: '5px',display: "inline-block", margin: '10px', backgroundColor: '#ffffffd0', color: '#5F9EA0', fontWeight: '700', borderRadius: '10px'}}  key={i}>{d}</span>)} 
                        </div>

                    </li>

                listOfPosts.push(tmp)
            
            console.log(dataCopy)
            setState(listOfPosts);

        })

        fetch('https://dummyapi.io/data/v1/post/' + id + '/comment?limit=10', {     
          method: 'get', 
          headers: new Headers({
            'app-id': '619c356052f97f152848512b'
          }) })
        .then(res => {
          return res.json();
        })
        .then(data => {
            var dataCopy = data.data;
            var listOfComments = [];
            //console.log(data)
            var tmp = '';
            for(var i = 0; i < dataCopy.length; i++){
                tmp = <li key={i} style={{ padding: '5px', margin: '10px', backgroundColor: '#5F9EA0', borderRadius: '10px',  paddingBottom: "30px",}} >
                        <h2> {dataCopy[i].owner.title +  ' '  + dataCopy[i].owner.firstName +  ' '  + dataCopy[i].owner.lastName} </h2>
                        <h5> {dataCopy[i].publishDate}</h5>
                        <span style={{display: 'inline-block'}}>{dataCopy[i].message}</span>


                    </li>

listOfComments.push(tmp)
            }

            
            console.log(dataCopy)
            setState1(listOfComments);

        })
      }, []);
    return ( 
        <div>
            <a href={'/' + id + '/edit'} class="button" id="dugmeEdit">Edit Post</a>
            <ul style={{color:'#ffffff'}}>
                {items}
            </ul>
            <label >Name:</label><br/><br/>
            <input className="commonInput" type="text" id="commentName" name="fname"/><br/><br/>
            <label >Comment:</label><br/><br/>
            <textarea className="commonInput" id="commentText" name="w3review" rows="4" cols="50">

          </textarea><br/><br/>
          <button onClick={registerUser} className="generalButton" style={{}}>
                Add comment
            </button>
            <ul key={key}  style={{color:'#ffffff', marginBottom: "70px"}}>
                {items1}
            </ul>
        </div>
     );
}
 
export default BlogPost;