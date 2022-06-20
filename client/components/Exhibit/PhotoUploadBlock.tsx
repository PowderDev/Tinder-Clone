import Image from "next/image";
import React, { useRef } from "react";
import { BsUpload, BsXCircle } from "react-icons/bs";
import { photoItem, FileToUpload } from "../../types/exhibit";

interface Props {
  setError: (v: string) => void;
  setPhotoURLs: (v: ((prev: photoItem[]) => photoItem[]) | photoItem[]) => void;
  setDefaultPhotoURLs: (v: ((prev: string[]) => string[]) | string[]) => void;
  setPhotoFiles: (v: ((prev: FileToUpload[]) => FileToUpload[]) | FileToUpload[]) => void;
  defaultPhotoURLs: string[];
  photoURLs: photoItem[];
}

const PhotoUploadBlock: React.FC<Props> = ({
  setError,
  photoURLs,
  defaultPhotoURLs,
  setPhotoURLs,
  setDefaultPhotoURLs,
  setPhotoFiles,
}) => {
  const inputRef = useRef({} as HTMLInputElement);

  const onButtonClick = () => inputRef.current.click();

  const oninputChange = (e: any) => {
    const files = e.target.files;

    if (photoURLs.length + defaultPhotoURLs.length + files.length > 5) {
      setError("Exhibit can contain only up to 5 photos");
      return;
    } else {
      setError("");
    }

    const onload = (e: any) => {
      setPhotoURLs((prev) => [...prev, { id: e.total, url: e.target.result }]);
    };

    for (const file of files) {
      setPhotoFiles((prev) =>
        prev.filter((p) => p.id != file.size).concat([{ id: file.size, value: file }])
      );
      const reader = new FileReader();
      reader.onload = onload;
      reader.readAsDataURL(file);
    }
  };

  const onDeleteButtonClick = (id: number, url: string) => {
    const filtered = photoURLs.filter((p) => p.url != url);
    if (filtered.length == photoURLs.length) {
      setDefaultPhotoURLs((prev) => prev.filter((u) => u != url));
    } else {
      setPhotoURLs(filtered);
      setPhotoFiles((prev) => prev.filter((p) => p.id != id));
    }
  };

  return (
    <div className="flex flex-col gap-5 items-start">
      <div className="flex items-center gap-8">
        <button
          type="button"
          onClick={onButtonClick}
          className="py-2 px-3 bg-blue-300 flex items-center gap-3 rounded-lg"
        >
          Upload <BsUpload />
        </button>
      </div>
      <div className="flex flex-wrap gap-4">
        {[...photoURLs, ...defaultPhotoURLs.map((u) => ({ id: Math.random(), url: u }))].map(
          (photo) => (
            <div key={photo.id} className="w-[150px] h-[150px] relative">
              <BsXCircle
                onClick={() => onDeleteButtonClick(photo.id, photo.url)}
                className="absolute top-[-4%] right-[-4%] text-red-900 bg-red-200 rounded-full z-10 cursor-pointer text-lg"
              />
              <Image src={photo.url} width={150} height={150} className="bg-cover" />
            </div>
          )
        )}
      </div>
      <input onChange={oninputChange} multiple type="file" accept="image/*" ref={inputRef} hidden />
    </div>
  );
};

export default PhotoUploadBlock;
