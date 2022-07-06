import type { GetStaticPaths, GetStaticProps } from "next/types";
import fs from "fs";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Head from "next/head";

interface StaticSlugPath {
  params: {
    slug: string;
  };
}

interface PostPageProps {
  source: MDXRemoteSerializeResult;
}

const PostPage: React.FC<PostPageProps> = ({ source }) => {
  console.log(source.frontmatter);
  console.log(typeof source.frontmatter);
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
  const postsDirectory = path.join(process.cwd(), "pages/posts");
  const filenames = fs.readdirSync(postsDirectory);

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
  const postsDirectory = path.join(process.cwd(), "pages/posts/");
  const slug = `${postsDirectory}${context?.params?.slug}.mdx`;

  const data: string = fs.readFileSync(slug, "utf-8");

  const source = await serialize(data, {
    parseFrontmatter: true,
  });

  return { props: { source } };
};

export default PostPage;
