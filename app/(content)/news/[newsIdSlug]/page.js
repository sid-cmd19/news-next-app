import NotFound from "@/app/(content)/news/[newsIdSlug]/not-found";
import { DUMMY_NEWS } from "@/dummy-news";
import Link from "next/link";

export default function NewsDetailsPage({ params }) {
  const newsIdSlug = params.newsIdSlug;

  const newsItem = DUMMY_NEWS.find((item) => item.slug === newsIdSlug);

  if (!newsItem) {
    return <NotFound />;
  }

  return (
    <>
      <article className="news-article">
        <header>
          <Link href={`/news/${newsItem.slug}/image`}>
            <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
          </Link>
          <h1>{newsItem.title}</h1>
          <time datetime={newsItem.date}>{newsItem.date}</time>
        </header>
        <p>{newsItem.content}</p>
      </article>
    </>
  );
}
