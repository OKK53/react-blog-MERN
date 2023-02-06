// import heroImage from 'assets/heroImage.jpg';
import heroImage_1 from "assets/heroImage_1.jpg";

export default function Header() {
  return (
    <div className="mt-14">
      <div className="flex flex-col items-center font-lora text-gray-400">
        <span className="absolute top-[13%] text-lg">React & Node</span>
        <span className="absolute top-[18%] text-8xl">Blog</span>
      </div>
      <img
        className="w-full h-[450px] mt-10 object-cover"
        src={heroImage_1}
        alt="heroImage"
      />
    </div>
  );
}
