import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Comments from './Comments';

const Details = () => {
    const { titleid } = useParams(); 
    const [titleData, setTitleData] = useState(null); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        
        console.log('Extracted titleid:', titleid);

        const fetchTitleData = async () => {
            try {
                
                const response = await axios.get(`${process.env.REACT_APP_API}title?titleid=${titleid}`);
                setTitleData(response.data); 
            } catch (err) {
                
                setError(err.response?.data?.error || "An error occurred");
            }
        };

        
        if (titleid) {
            fetchTitleData();
        }
    }, [titleid]); 

    return (
        <div>
            <Navbar />
            <div className='flex justify-center m-10'>
                <div className="flex flex-col w-full sm:w-80 md:w-96 lg:w-[400px] xl:w-[800px] mb-32">
                    {error && <p className="text-red-500">{error}</p>}
                    {titleData ? (
                        <>
                            <p className="text-4xl font-montserrat mt-10 mb-5 font-bold">{titleData.title}</p>
                            <p className="text-1xl font-montserrat mt-5 mb-5">Dive into the exciting world of manga...</p>
                            <img src={titleData.imgurl} className="h-100 object-cover" alt={titleData.title} />
                            <p className="text-1xl font-montserrat mt-20 mb-20">{titleData.description}</p>
                            <div>
                                <Comments />
                            </div>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Details;
