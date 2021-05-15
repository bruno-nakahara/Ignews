import { GetStaticPaths, GetStaticProps } from "next"
import { useSession } from "next-auth/client";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { RichText } from "prismic-dom"
import { useEffect } from "react";
import { getPrismicClient } from "../../../services/prismic"
import styles from '../post.module.scss';

interface PostPreviewProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    }
}

export default function PostPreview({ post }: PostPreviewProps) {
    const [session] = useSession()
    const router = useRouter()

    useEffect(() => {
        if (session?.activeSubscription) {
            router.push(`/posts/${post.slug}`)
        }
    }, [session])

    return (
        <>
            <Head>
                <title>{post.title} | Ignews</title>
            </Head>

            <main className={styles.container}>
                <article className={`${styles.post } ${styles.previewContent}`}>
                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time>
                    <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: post.content }} />

                    <div className={styles.continueReading}>
                        Wanna continue reading?
                        <Link href="/">
                            <a>Subscribe now 🤗</a>
                        </Link>
                    </div>
                </article>
            </main>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            //{ params: { slug: 'introduction-to-http-cookies' } } //Exemplo de página gerada na hora do build, e o restante vão ser geradas caso o usuário pedir
        ],
        fallback: 'blocking'// true, false, blocking => (true: ruim para SEO, vai ser gerado pelo lado do cliente, primeiro a estrutura e depois o conteúdo,e não no servidor node), (false: Se o post não for carregado vai dar 404), (blocking: parecido com true, porém é carregado no servidor, server side rendering)
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {    
    const { slug } = params;
  
    const prismic = getPrismicClient()

    const response = await prismic.getByUID('publication', String(slug), {})

    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content.splice(0, 3)),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    }

    return {
        props: {
            post,
        },
        revalidate: 60 * 30,//30 minutes
    }
}