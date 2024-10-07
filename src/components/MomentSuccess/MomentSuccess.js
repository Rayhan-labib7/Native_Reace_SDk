import React from 'react';
import svgIcons  from '../../assets/image/SVG/svg'

const MomentSuccess = ({onclose}) => {
//   const { email, token } = useAuth();  // Get email and token from context
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Make an API call with the stored email and token
//     const fetchData = async () => {
//         try {
//             const response = await axios.get('https://nativeBoss.com/api/data', {
//                 headers: {
//                     Authorization: `Bearer ${token}`,  // Send token
//                     'X-User-Email': email               // Send email
//                 }
//             });
//             if (response.status === 200) {
//                 setData(response.data);
//             }
//         } catch (err) {
//             setError('You are not valid');
//         }
//     };
//     if (email && token) {
//         fetchData();  // Only fetch if both email and token are set
//     }
// }, [email, token]);

// if (error) {
//     return <div>{error}</div>;
// }
  return (
    <div className='success-container'>
           <div className='success-content'>
           <div className='success-close' onClick={onclose}>x</div>

           <div className='svg-design' dangerouslySetInnerHTML={{__html:svgIcons.wow}} style={{height:"120px",width:'120px'}}/> 
            <p>You’ve made it</p>
            <h2>You had a streak this week and earned {points} points</h2>
            <button className="success-button">Earn more points</button>
           </div>
        
    </div>
  )
}

export default MomentSuccess