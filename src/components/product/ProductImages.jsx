import React from "react";
import { Image, Video } from "lucide-react";

const ProductImages = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-gray-700 mb-2">
        Product Images & Videos
      </h3>

      <div className="border-2 border-dashed p-6 text-center rounded-xl hover:border-blue-400 transition cursor-pointer">
        <Image className="w-8 h-8 mx-auto mb-2 text-blue-500" />
        <p className="text-sm text-gray-500">Upload Image</p>
        <input type="file" accept="image/*" className="mt-2 text-sm" />
      </div>

      <div className="border-2 border-dashed p-6 text-center rounded-xl hover:border-blue-400 transition cursor-pointer">
        <Video className="w-8 h-8 mx-auto mb-2 text-blue-500" />
        <p className="text-sm text-gray-500">Upload Video</p>
        <input type="file" accept="video/*" className="mt-2 text-sm" />
      </div>
    </div>
  );
};

export default ProductImages;
