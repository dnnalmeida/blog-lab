import type { GetStaticPaths, GetStaticProps } from "next/types";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Head from "next/head";
import { listFiles, readFile } from "../../modules/files";

interface StaticSlugPath {
  params: {
    slug: string;
  };
}

interface PostPageProps {
  source: MDXRemoteSerializeResult;
}

const PostPage: React.FC<PostPageProps> = ({ source }) => {
  return (
    <div>
      <Head>
        <title>{source.frontmatter?.title}</title>
      </Head>
      <MDXRemote {...source} />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const filenames = listFiles("pages/posts");

  const paths: StaticSlugPath[] = filenames.map((filename) => {
    return {
      params: {
        slug: filename.replace(".mdx", ""),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const data: string = readFile("pages/posts", `${context.params?.slug}.mdx`);
  const source = await serialize(data, {
    parseFrontmatter: true,
  });

  return { props: { source } };
};

export default PostPage;
