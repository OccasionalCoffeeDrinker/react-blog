import { useParams } from "react-router";
import { useEffect, useState } from 'react';

const EditPost = () => {
  const [base64image, setState] = useState("");
  const { id } = useParams()
  function uploadPost() {
    // {
    //   text: string(length: 6-50, preview only)
    //   image: string(url)
    //   likes: number(init value: 0)
    //   tags: array(string)
    //   owner: string(User id)
    //   }

      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json',  'app-id': '619c356052f97f152848512b' },
        body: JSON.stringify({ 
          text: document.getElementById("commentText").value,
          image: base64image,
          likes: 0,
          tags: document.getElementById("tags").value.split(";"),
        })
      };
      fetch('https://dummyapi.io/data/v1/post/' + id, requestOptions)
          .then(response => response.json())
          .then(data => {
            //this.setState({ postId: data.id })
            alert("Post successfully added!")
            window.location = '/';


          });
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

            setState(dataCopy.image);
            document.getElementById("commentText").value = dataCopy.text;
            document.getElementById("tags").value = dataCopy.tags.join(';');


            

        });
      }, []);
    const uploadImage= async(e)=> {
      const file = e.target.files[0]
      const base64 = await converteBase64(file)
      console.log(base64)
      setState(base64)
    }
    const converteBase64=(file)=> {
      return new Promise((resolve, reject) =>{
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file)

        fileReader.onload = (()=>{
          resolve(fileReader.result)
        })
        fileReader.onerror = ((error)=>{
          reject(error)
        })
      })
    }
  return ( 
    <div>
      <input type="file" onChange={(e) => {
        uploadImage(e);
      }}/>
      <br/><br/>
      <img src={base64image} alt="Please select a file" height="200px" width="200px" style={{ backgroundColor: "#00000020", objectFit: "cover "}}/>
      <br/> <br/>
        <div style={{backgroundColor: "#5F9EA0", width: "90%", margin: "auto", padding: "5px 10px", borderRadius: "5px", color: "#ffffff", fontWeight: "700"}}>Post Text:</div><br/><br/>
        <textarea className="commonInput" id="commentText" rows="4" cols="50">
        </textarea><br/><br/>
        <div style={{backgroundColor: "#5F9EA0", width: "90%", margin: "auto", padding: "5px 10px", borderRadius: "5px", color: "#ffffff", fontWeight: "700"}}>Tags: (separated by ';' ):</div><br/><br/>
        <input className="commonInput" type="text" id="tags" name="fname"/><br/><br/>

       <button className="generalButton" onClick={uploadPost}>
            Update post
        </button>
        </div>
   );
}
 
export default EditPost;