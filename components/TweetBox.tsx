import React, { SetStateAction, useRef, useState } from "react";
import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { Tweet, TweetBody } from "../typings";
import { fetchTweets } from "../utils/fetchTweets";
import toast from "react-hot-toast";

interface Props {
  setTweets: React.Dispatch<SetStateAction<Tweet[]>>;
}

function TweetBox({ setTweets }: Props) { // props for the TweetBox component
  const [input, setInput] = useState(""); // hook state for the input field
  const [image, setImage] = useState(""); // hook state for the image field
  const { data: session } = useSession(); // hook session for the user session
  const [imageUrlBoxIsOpen, setimageUrlBox] = useState(false); // hook state for the image url box
  const imageInputRef = useRef<HTMLInputElement>(null); // ref for the image input field

  const addImageToTweet = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!imageInputRef.current?.value) return;
    setImage(imageInputRef.current.value);
    imageInputRef.current.value = "";
    setimageUrlBox(false);
  };

  const postTweet = async () => {
    const tweetBody: TweetBody = {
      title: input,
      username: session?.user?.name || "Unkown User",
      profileImg:
        session?.user?.image ||
        "https://pbs.twimg.com/profile_images/1319551314230087681/NTQFUPNB_400x400.jpg",
      image: image,
    };
    const result = await fetch(`/api/addTweet`, {
      body: JSON.stringify(tweetBody),
      method: "POST",
    });

    const json = await result.json();

    const newTweets = await fetchTweets();
    setTweets(newTweets);
    toast("Tweet Posted", {
      icon: "🚀",
    });

    return json;
  };

  const handleSumbit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    postTweet();

    setInput("");
    setImage("");
    setimageUrlBox(false);
  };

  return (
    <div className="flex space-x-2 p-5">
      <img
        className="h-14 w-14 object-cover rounded-full mt-4"
        src={session?.user?.image || "https://links.papareact.com/gll"}
      />
      <div>
        <div className="flex flex-1 items-center px-2">
          <form className="flex flex-1 flex-col">
            <input
              className="h-24 w-full text-xl outline-none placeholder:text-xl"
              type="text"
              placeholder="What's Happening?"
              value={input}
              onChange={(e) => setInput(e.target.value)}// onChange event for the input field
            />
            <div className="flex items-center">
              <div className="flex flex-1 space-x-2 text-twitter">
                <PhotographIcon
                  onClick={() => setimageUrlBox(!imageUrlBoxIsOpen)}
                  className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
                />
                <SearchCircleIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
                <EmojiHappyIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
                <CalendarIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
                <LocationMarkerIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
              </div>
              <button
                onClick={handleSumbit}
                disabled={!input}
                className="bg-twitter px-5 py-2 font-bold text-white rounded-full disabled:opacity-40"// disabled:opacity-40 is a class that makes the button disabled when the input is empty
              >
                Tweet
              </button>
            </div>
            {imageUrlBoxIsOpen && (
              <form className="mt-5 flex rounded-lg bg-twitter/80 py-2 px-4">
                <input
                  ref={imageInputRef}
                  className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
                  type="text"
                  placeholder="Enter Image URL"
                />
                <button
                  type="submit"
                  onClick={addImageToTweet}
                  className="font-bold text-white"
                >
                  Add Image
                </button>
              </form>
            )}
            {image && (
              <img
                className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
                src={image}
                alt=""
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default TweetBox;
