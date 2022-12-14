import Layout from '../components/Layout';

import { InferGetStaticPropsType } from 'next';
import { getInfoPage } from '../queries/Info';
import { renderRichTextWithImages } from '../utils/rich-text';

export default function Info({
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { body } = page;
  return (
    <Layout title='INFO'>
      <div className='rich-text max-w-4xl m-4'>
        {renderRichTextWithImages(body)}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const page = await getInfoPage();

  return {
    props: { page },
    revalidate: 60 * 60,
  };
}
