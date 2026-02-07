import { SearchIcon } from "@heroicons/react/outline";
import React, { useEffect, useRef } from "react";

const TWITTER_PROFILE = "X"; // Change to any public handle, e.g. "elonmusk", "Twitter"

function Widgets() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Twitter widgets script and render timeline
    if (!timelineRef.current) return;

    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);

    script.onload = () => {
      const w = window as Window & { twttr?: { widgets: { load: (el?: HTMLElement) => void } } };
      if (typeof w.twttr?.widgets?.load === "function") {
        w.twttr.widgets.load(timelineRef.current ?? undefined);
      }
    };

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return (
    // Display in the same line when out of mobile view
    <div className="mt-2 px-2 col-span-2 hidden lg:inline">
      {/* Search box */}
      <div className="mt-2 flex items-center space-x-2 rounded-full bg-gray-100 p-3 ">
        <SearchIcon className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search Twitter"
          className="flex-1 outline-none bg-transparent"
        />
      </div>
      {/* Official X/Twitter timeline embed - more reliable than react-twitter-embed */}
      <div ref={timelineRef} className="mt-4">
        <blockquote
          className="twitter-timeline"
          data-height="1000"
          data-theme="light"
        >
          <a href={`https://twitter.com/${TWITTER_PROFILE}`}>
            Tweets by @{TWITTER_PROFILE}
          </a>
        </blockquote>
      </div>
    </div>
  );
}

export default Widgets;
