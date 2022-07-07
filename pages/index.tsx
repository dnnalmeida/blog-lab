import matter from "gray-matter";
import type { GetStaticProps, NextPage } from "next/types";
import { listFiles } from "../modules/files";

interface Metadata {
  slug: string;
  [key: string]: any;
}

const Home: NextPage<{ postsMeta: Metadata[] }> = ({ postsMeta }) => {
  return (
    <div>
      {postsMeta.map((post, i) => {
        return (
          <div key={i}>
            <h1>{post.title}</h1>
            <h2>{post.description}</h2>
          </div>
        );
      })}
    </div>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  const filenames = listFiles("pages/posts", false);

  const postsMeta = filenames.map((filename) => {
    const meta = matter.read(filename);
    const slug = filename.replace(/\.mdx$/, "");
    return {
      ...meta.data,
      slug,
    };
  });

  return { props: { postsMeta } };
};

export default Home;
