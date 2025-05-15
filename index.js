import React, { useEffect } from 'react';
import { useEffect,useState } from 'react';
import ReactDOM from 'react-dom/client';


const Main=()=>{
    const [emojis, setEmojis] = useState([]);
    const a =[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
    const [b, setB] = useState(Array(20).fill(null));
    const [active, setActive] = useState({});
    const [c,setC]=useState(true);
    const [ex,setEx]=useState(null);
    const [m,setM]=useState(null);
    const [isLocked, setIsLocked] = useState(false);
    const [point, setPoint] = useState(0);
    
     function handle(i,data){
      
      const span = data.currentTarget.querySelector('span');
      
      if(isLocked) return;
        
       const latest = span.innerHTML;
           if(ex==null){
            setEx(latest)
            setActive(prev=>({
               ...prev,
               [i]:!prev[i]  
          }))
          setM(i);
          console.log(m);
           }
           else{
            if(ex==latest){
              setActive(prev=>({
               ...prev,
               [i]:!prev[i]  
               }))
             setEx(null)
             setPoint(prev => prev + 1);
            }
            else{
              setActive(prev=>({
               ...prev,
               [i]:!prev[i]  
               }))
              
                   setTimeout(()=>{
                        setActive(prev=>({
               ...prev,
               [m]:!prev[m]  
              }))
             setActive(prev=>({
               ...prev,
               [i]:!prev[i]  
               }))
                   },500)
                   setIsLocked(true);
               }
               setIsLocked(false);
               setEx(null)
           }
          
         
     }
     function newgame(){
      setPoint(0);
    
     
 fetching();
     }




    function getChar(emoji) {
        const codePoint = emoji.unicode[0].replace("U+", "0x");
        return String.fromCodePoint(parseInt(codePoint, 16));
      }



    useEffect(() => {
        fetching();
    }, []); 
    function g(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
      }
    async function fetching() {
        const response = await fetch("https://emojihub.yurace.pro/api/all");
        const data = await response.json();
         setEmojis(data.slice(10,20));
         console.log(data)
    }
    return(
<>
        <h1 className='title'>MATCH GAME</h1>
        <h2 className='score'>Score : {point}</h2>
        <div className='main'>
            {  
                  
               useEffect(() => {
                
                if (c && emojis.length > 0) {
                  const a = Array.from({ length: 20 }, (_, i) => i);
                  const tempB = [...b]; 
              
                  emojis.forEach((emoji) => {
                    const x1 = g(0, a.length - 1);
                    const emojiChar = getChar(emoji);
                    tempB[a[x1]] = emojiChar;
                    a.splice(x1, 1);
              
                    const x2 = g(0, a.length - 1);
                    tempB[a[x2]] = emojiChar;
                    a.splice(x2, 1);
                  });
              
                  setB(tempB); 
              
                
              }
          
              }, [c, emojis])
              
            
            
            }
                
            
            
            {
                b.map((emoji,index)=>{
                    return <div  className='matchbox' style={active[index] ? { backgroundColor : 'green'} : { backgroundColor : 'white' }} onClick={(e)=>handle(index,e)}    key={index}>
                        <span id={index}   style={active[index] ? { visibility: 'visible',backgroundColor : 'green' } : { visibility: 'hidden',backgroundColor : 'white' }}
                              className='inner'>{emoji}</span>
                        </div>
                })
             
            }
            
            
        </div>
        <button className='restart' style={{color:'white'}} onClick={()=>newgame()}>Restart</button>

        </>
    )
}
const root=ReactDOM.createRoot(document.getElementById("root"))
root.render(<Main/>);
