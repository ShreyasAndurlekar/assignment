import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Comments from './Comments';

const Details = () => {
  
  return (
    <div>
        <Navbar />
        <div className='flex justify-center'>
            <div className="flex flex-col w-full sm:w-80 md:w-96 lg:w-[400px] xl:w-[800px] mb-32">
                <p className="text-4xl font-montserrat mt-10 mb-5 font-bold">Hello Baby</p>
                <p className="text-1xl font-montserrat mt-5 mb-5">Dive into the intricate world of Hello Baby where ancient myths collide with modern story, exploring power, love, trauma, and identity in captivating ways.</p>
                <img src="https://animemangatoon.com/wp-content/uploads/2024/09/Screenshot-2024-09-16-123040-750x375.webp" className="h-100 object-cover" />
                <p className="text-1xl font-montserrat mt-20 mb-20">Gwen is a kind and passionate young woman with a tragic backstory. Her mother died when she was young, and her stepmother and stepsister treated her even worse with the demise of her father. Before dying, her father suggests she go on a cruise vacation with her best friend when her partner broke up with her to focus on his career instead. On the vacation, she meets Arthur, a handsome but lonely young man. Things escalate between them when they share their unfortunate fates. They end up hooking up, but Gwen runs away, afraid of the outcome. Fate brings them 2 years later, and they end up in a legal fight when Arthur finds out about his and Gwen’s child. Read Hello Baby to learn whether they can solve their differences.</p>           
                <div>
                    <Comments />
                </div>
            </div>
           
        </div>
    </div>
  );
};

export default Details;
