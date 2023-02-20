interface Article {
  id: number;
  title: string;
  content: string;
}

const demoArticles = [{
  id: 1,
  title: 'Hello Nuxt',
  content: 'Introduction to Nuxt'
}, {
  id: 2,
  title: 'Hello Vue',
  content: 'Introduction to Vue'
}, {
  id: 3,
  title: 'Hello TypeScript',
  content: 'Introduction to TypeScript'
}];

export function useArticles() {
  const articles = ref<Article[]>([]);
  const article = ref<Article | null>(null);

  const fetchArticles = (): void => {
    articles.value = demoArticles;
  };

  const fetchArticle = (id: number): void => {
    article.value = demoArticles.find((article) => id === article.id) || null;
  }

  return {
    articles,
    article,
    fetchArticle,
    fetchArticles,
  };
}
