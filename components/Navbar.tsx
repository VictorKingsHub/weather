import { MdMyLocation, MdOutlineAddLocation, MdWbSunny } from "react-icons/md";
import SearchBox from "./SearchBox";

type Props = {
    className ?: string;
};

export default function Navbar({}: Props) {
  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
      <div className="h-20 w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
        <h3 className="flex items-center justify-center gap-2 ">
          <p className="text-gray-500 text-3xl"> Weather</p>
          <MdWbSunny className="text-yellow-400 text-3xl" />
        </h3>

        {/* Search Section */}
        <section className="flex gap-2 items-center">
          <MdMyLocation className="text-gray-500 text-2xl cursor-pointer hover:opacity-50" />
          <MdOutlineAddLocation className="text-gray-500 text-3xl cursor-pointer hover:opacity-50" />
          <p className="text-slate-900/80 text-sm"> Nigeria </p>

          <div>
            <SearchBox value={""} onChange={undefined} onSubmit={undefined} />
          </div>
        </section>
      </div>
    </nav>
  );
}
