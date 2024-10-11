import { Link } from 'react-router-dom';


const Card = ({ image, title, description, creator, genre }) => {
  const titleSlug = title.toLowerCase().replace(/ /g, '-');

  return (
    <div className="bg-gray-100 w-full sm:w-80 md:w-96 lg:w-[400px] xl:w-[800px] mb-32">
      <Link to={`/details/${titleSlug}`}> 
        <h2 className="text-3xl font-semibold mb-4 text-blue-500 cursor-pointer">
          {title}
        </h2>
      </Link>
      <img src={image} alt={title} className="w-full h-100 object-cover" />
      <div className="p-4">
        <p className="text-gray-700">{description}</p>
      </div>
      <div className="flex justify-between mt-5 mr-4 ml-4">
        <p className="font-bold">Creator: {creator}</p>
        <p className="font-bold">Genre: {genre}</p>
      </div>
    </div>
  );
};

export default Card;
