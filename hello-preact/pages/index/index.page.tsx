const Card = ({ date, author, githubUser, title, url }) => {
	const authorImageURL = githubUser ? `https://github.com/${githubUser}.png` : null;
	const authurLink = author ? `https://example.com/${author}` : null;
	return (
		<div style={{ border: '1px solid #ddd', padding: '10px', margin: '5px', borderRadius: '10px' }}>
			<p>{date}</p>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				{authorImageURL && <img src={authorImageURL} alt={`Author: ${author}`} style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '8px' }} />}
				<p>{author ? (
					<a href={authurLink}>{author}</a>
				) : (
					author
				)}</p>
			</div>
			<p style={{ textAlign: 'left'}}>
				{url ? (
					<a href={url} target="_blank" rel="noopener noreferrer">
						{title}
					</a>
				) : (
					title
				)}
			</p>
		</div>
	);
};

const GridContainer = () => {
  const cardsData = [
    { },
    { },
    { },
    { },
    { date: '1', author: 'masahiro-kondo', githubUser: 'kondoumh', title: '今年の Deno の動向について', url: 'https://example.com/article1' },
    { date: '4', author: 'Bob Johnson', githubUser: 'author3.jpg', title: 'Hoge ツールを適用した話', url: 'https://example.com/article2'},
		{ date: '5', author: 'John Doe', githubUser: 'author1.jpg', title: 'アジャイルプラクティス実践してみた', url: 'https://example.com/article3' },
		{ date: '6', author: 'Jane Smith', githubUser: 'author2.jpg', title: 'なにか書きまふ' },
		{ date: '7', author: 'Bob Johnson', githubUser: 'author3.jpg', title: 'Article 5' },
		{ date: '8', author: 'John Doe', githubUser: 'author1.jpg', title: 'Article 6' },
		{ date: '11', author: 'Jane Smith', githubUser: 'author2.jpg', title: 'Article 7' },
		{ date: '12', author: 'Bob Johnson', githubUser: 'author3.jpg', title: 'Article 8' },
		{ date: '13', author: 'John Doe', githubUser: 'author1.jpg', title: 'Article 9' },
		{	date: '14', author: 'Jane Smith', githubUser: 'author2.jpg', title: 'Article 10' },
		{ date: '15', author: 'Bob Johnson', githubUser: 'author3.jpg', title: 'Article 11' },
		{ date: '18', author: 'John Doe', githubUser: 'author1.jpg', title: 'Article 12' },
		{ date: '19', author: 'Jane Smith', githubUser: 'author2.jpg', title: 'Article 13' },
		{ date: '20', author: 'Bob Johnson', githubUser: 'author3.jpg', title: 'Article 14' },
		{ date: '21', author: 'John Doe', githubUser: 'author1.jpg', title: 'Article 15' },
		{ date: '22', author: 'Jane Smith', githubUser: 'author2.jpg', title: 'Article 16' },
		{ date: '25', author: 'Bob Johnson', githubUser: 'author3.jpg', title: 'Article 17' },
  ];

  return (
		<div>
			<style>
        {`
          .grid-container {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 5px;
          }

					@media (max-width: 600px) {
            .header {
              display: none;
            }

						.grid-container {
              grid-template-columns: repeat(1, 1fr);
            }
					}
        `}
      </style>
			<div class="grid-container">
				<h2 class="header" style={{ gridColumn: 'span 1', textAlign: 'center' }}>Mon.</h2>
				<h2 class="header" style={{ gridColumn: 'span 1', textAlign: 'center' }}>Tue.</h2>
				<h2 class="header" style={{ gridColumn: 'span 1', textAlign: 'center' }}>Wed.</h2>
				<h2 class="header" style={{ gridColumn: 'span 1', textAlign: 'center' }}>Thu.</h2>
				<h2 class="header" style={{ gridColumn: 'span 1', textAlign: 'center' }}>Fri.</h2>

				{cardsData.map((card, index) => (
					<Card key={index} date={card.date} author={card.author} githubUser={card.githubUser} title={card.title} url={card.url} />
				))}
			</div>
		</div>
  );
};

export function Page() {
	return (
    <div>
      <h1>Advent Calendar 2023</h1>
      <GridContainer />
    </div>
	);
}
