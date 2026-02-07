import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import { Tweet } from "../typings";
import { sanityClient } from "../sanity";
import { groq } from "next-sanity";
import { Toaster } from "react-hot-toast";

const feedQuery = groq`*[_type == "tweet"]`;

interface Props {
  tweets: Tweet[];
}

const Home: NextPage<Props> = ({ tweets }) => {
  return (
    // By default tailwind uses mobile view
    // Takes up full screen height but only scroll on widgets
    <div className="lg:max-w-6xl mx-auto max-h-screen overflow-x-hidden overflow-y-hidden">
      <Head>
        <title>Twitter 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />
      {/* So we divide into 9 cols but each component will only take one */}
      <main className="grid grid-cols-9">
        <Sidebar />
        <Feed tweets={tweets} />
        <Widgets />
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const tweets: Tweet[] = await sanityClient.fetch(feedQuery);
  return {
    props: {
      tweets,
    },
  };
};
