import { useEffect, useState } from 'react';


const AllPosts = () => {
    var listOfPosts = [];
    const [items, setState] = useState([]);


    useEffect (() => {
        fetch('https://dummyapi.io/data/v1/post ', { 
          method: 'get', 
          headers: new Headers({
            'app-id': '619c356052f97f152848512b'
          }) })
        .then(res => {
          return res.json();
        })
        .then(data => {
            var dataCopy = data.data.sort((b, a) => new Date(...a.publishDate.split('/').reverse()) - new Date(...b.publishDate.split('/').reverse()));

            var tmp = '';
            for(var i = 0; i < dataCopy.length; i++){
                tmp = <li key={i} style={{ padding: '5px', margin: '10px', backgroundColor: '#5F9EA0', borderRadius: '10px'}} >
                        <a href={'/' + dataCopy[i].id}><h2> {dataCopy[i].owner.title +  ' '  + dataCopy[i].owner.firstName +  ' '  + dataCopy[i].owner.lastName} </h2></a>
                        <h5> {dataCopy[i].publishDate}</h5>
                        {/* <img src={dataCopy[i].image} height="300" width="300" style={{display: 'inline-block'}}></img> */}
                        <span style={{display: 'inline-block'}}>{dataCopy[i].text}</span>
                        <div style={{margin: '20px' }}> 
                            {dataCopy[i].tags.map((d, i) => <span style={{ padding: '5px 10px',display: "inline-block", margin: '10px', backgroundColor: '#ffffffd0', color: '#5F9EA0', fontWeight: '700', borderRadius: '10px'}}  key={i}>{d}</span>)} 
                        </div>

                    </li>

                listOfPosts.push(tmp)
            }
            console.log(dataCopy[0])
            setState(listOfPosts);

        })
      }, []);
    return ( 
        <div>            
            <ul style={{color:'#ffffff'}}>
                {items}
            </ul>
        </div>
     );
}
 
export default AllPosts;