import Card from './Card';

const List = () => {
  
  const cardsData = [
    {
      image: 'https://animemangatoon.com/wp-content/uploads/2024/09/Screenshot-2024-09-16-123040-750x375.webp',
      title: 'Hello Baby',
      description: 'Gwen is a kind and passionate young woman with a tragic backstory. Her mother died when she was young, and her stepmother and stepsister treated her even worse with the demise of her father. Before dying, her father suggests she go on a cruise vacation with her best friend when her partner broke up with her to focus on his career instead. On the vacation, she meets Arthur, a handsome but lonely young man. Things escalate between them when they share their unfortunate fates. They end up hooking up, but Gwen runs away, afraid of the outcome. Fate brings them 2 years later, and they end up in a legal fight when Arthur finds out about his and Gwen’s child. Read Hello Baby to learn whether they can solve their differences.',
      creator: 'Enjelicious',
      genre: 'Romance'
    },
    {
      image: 'https://animemangatoon.com/wp-content/uploads/2024/09/Screenshot-2024-09-16-123400-750x375.webp',
      title: "The Alpha King's Claim ",
      description: 'Do you believe in supernatural creatures like werewolves, vampires, and witches? How would you feel if one day you were transported to a different realm when you touched a painting? The same thing happened with Serena in The Alpha King’s Claim. One rainy day, she buys an interesting painting while taking shelter in a painting shop. When she touched the painting at her home, she got transported to the realm where werewolves lived. Moreover, she ends up on the bed of the Alpha King Aero, who hates all women.',
      genre: 'Romance',
      creator: 'JMFelic',
      
    },
    {
      image: 'https://animemangatoon.com/wp-content/uploads/2024/09/Screenshot-2024-09-16-123842-750x375.webp',
      title: 'Bitten Contract',
      description: 'Do you believe vampires exist? What would your first reaction be if you crossed paths with a vampire? Would you be delighted, terrified, or unsure of how to act? Well, Chae-i certainly had an unusual reaction than the others. Chae-i is an actress who has been in the entertainment industry ever since she can remember. However, she is been having a hard time fitting in with other actors due to the extremely painful headaches she started having a little while ago. As a consequence of this, her professional life started deteriorating.Everyone started thinking of her as some stuck-up actress. However, one time, she gets bitten by Ijun, a top actor who is a vampire. Surprisingly, her headache vanishes for a week. Hence, she asks him to continue biting her to keep everything going smoothly. To her surprise, Ijun asks for a contractual relationship in return. Read the popular webtoon, Bitten Contract, to find out his motive behind asking Chae-i for a relationship.',
      genre: 'Romance',
      creator: 'Sungeon',
        
    },
  ];

  return (
    <div className="flex justify-center mt-40 font-montserrat">
        <div>
            {cardsData.map((card, index) => (
            <Card
            key={index}
            image={card.image}
            title={card.title}
            description={card.description}
            creator={card.creator}
            genre={card.genre}
            />
        ))}   
        </div>
    </div>
  );
  
};

export default List;
