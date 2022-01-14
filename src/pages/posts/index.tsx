import { GetStaticProps } from 'next';
import Prismic from "@prismicio/client";
import { RichText } from 'prismic-dom'
import Link from 'next/link';

import { getPrismicClient } from '../../services/prismic';

import Head from 'next/head';
import styles from './styles.module.scss'

type Post = {
  slug: string
  title: string,
  excerpt: string,
  updatedAt: string,

}


interface PostProps {
  posts: Post[]
}


export default function Posts({ posts }) {
  return (
    <>
      <Head>
        <title>Posts | IgNews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.postList}>
          {posts.map(post => (
            <Link key={post.slug} href={`/posts/${post.slug}`} prefetch>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}

        </div>
      </main>
    </>
  );

}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.query<any>([
    Prismic.predicates.at('document.type', 'posts')
  ], {
    fetch: ['posts.title', 'posts.content'],
    pageSize: 30,
  })

  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })


  return {
    props: { posts }
  }
}