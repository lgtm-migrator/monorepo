import styles from './index.module.css';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Image from 'next/image';

function reverseSort(a, b) {
  return -1 * a.slug.localeCompare(b.slug);
}

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join(process.cwd(), 'posts'));
  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join(process.cwd(), 'posts', filename),
      'utf-8'
    );
    const { data: frontMatter } = matter(markdownWithMeta);
    return {
      frontMatter,
      slug: filename.split('.')[0],
    };
  });
  posts.sort(reverseSort);
  return {
    props: {
      posts,
    },
  };
};

/* eslint-disable-next-line */
export interface ArticlesProps {}

export function Articles({ posts }: ArticlesProps) {
  console.log('posts', posts);
  return (
    <div className="mt-5 pb-5">
      <div className="max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
        {/*<img*/}
        {/*  className="object-cover w-full h-56"*/}
        {/*  src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"*/}
        {/*  alt="avatar"*/}
        {/*/>*/}

        {/*<div className="py-5 text-center">*/}
        {/*  <a*/}
        {/*    href="#"*/}
        {/*    className="block text-2xl font-bold text-gray-800 dark:text-white"*/}
        {/*  >*/}
        {/*    John Doe*/}
        {/*  </a>*/}
        {/*  <span className="text-sm text-gray-700 dark:text-gray-200">*/}
        {/*    Software Engineer*/}
        {/*  </span>*/}
        {/*</div>*/}
        <h1>Filters</h1>
        <div className="flex justify-center">
          <div>
            <div className="form-check">
              <input
                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label
                className="form-check-label inline-block text-gray-800"
                htmlFor="flexCheckDefault"
              >
                Default checkbox
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                value=""
                id="flexCheckChecked"
                checked
              />
              <label
                className="form-check-label inline-block text-gray-800"
                htmlFor="flexCheckChecked"
              >
                Checked checkbox
              </label>
            </div>
          </div>
        </div>
      </div>

      {posts.map((post, index) => (
        <div
          className="max-w-2xl mt-5 mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800"
          key={index}
        >
          <Image
            src={post.frontMatter.thumbnailUrl}
            alt="thumbnail"
            className="object-cover w-full h-64"
            objectFit="cover"
            width="700"
            height="300"
          />

          <div className="p-6">
            <div>
              {(post.frontMatter.tags || []).map((tag) => (
                <span
                  key={tag}
                  className="text-xs mr-2 font-medium text-blue-600 uppercase dark:text-blue-400"
                >
                  {tag}
                </span>
              ))}
              <Link href={`/article/${post.slug}`}>
                <a className="block mt-2 text-2xl font-semibold text-gray-800 transition-colors duration-200 transform dark:text-white hover:text-gray-600 hover:underline">
                  {post.frontMatter.title}
                </a>
              </Link>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {post.frontMatter.description}
              </p>
            </div>

            <div className="mt-4">
              <div className="flex items-center">
                {/*<div className="flex items-center">*/}
                {/*  <img*/}
                {/*    className="object-cover h-10 rounded-full"*/}
                {/*    src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60"*/}
                {/*    alt="Avatar"*/}
                {/*  />*/}
                {/*  <a*/}
                {/*    href="#"*/}
                {/*    className="mx-2 font-semibold text-gray-700 dark:text-gray-200"*/}
                {/*  >*/}
                {/*    Jone Doe*/}
                {/*  </a>*/}
                {/*</div>*/}
                <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">
                  {post.frontMatter.date}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Articles;
