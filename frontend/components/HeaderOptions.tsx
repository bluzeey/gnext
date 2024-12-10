import HeaderOption from "./HeaderOption";
import {
  LucideSplitSquareVertical,
  Newspaper,
  Map,
  Play,
  Search,
  PictureInPicture,
} from "lucide-react";
function HeaderOptions() {
  return (
    <div
      className="flex w-full text-gray-700 justify-evenly 
        text-sm lg:text-base lg:justify-start lg:space-x-36 lg:pl-52 border-b"
    >
      <div className="flex space-x-6">
        <HeaderOption Icon={Search} title="All" selected />
        <HeaderOption Icon={PictureInPicture} title="Images" selected={false} />
        <HeaderOption Icon={Play} title="Video" selected={false} />
        <HeaderOption Icon={Newspaper} title="News" selected={false} />
        <HeaderOption Icon={Map} title="Maps" selected={false} />
        <HeaderOption
          Icon={LucideSplitSquareVertical}
          title="More"
          selected={false}
        />
      </div>
      <div className="flex space-x-4 ">
        <p className="link">Settings</p>
        <p className="link">Tools</p>
      </div>
    </div>
  );
}

export default HeaderOptions;
