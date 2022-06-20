import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Exhibit, FileToUpload, photoItem, Tag, TagAsSelectOption } from "../../types/exhibit";
import Select from "react-select";
import PhotoUploadBlock from "./PhotoUploadBlock";
import { isThereEmptyField } from "../../helpers/validators";
import { colorStyles } from "../../helpers/DOM";
import { createNewExhibit } from "../../store/actions/exhibit";
import { useAppDispatch } from "../../helpers/hooks";
import { setCurrentExhibit } from "../../store/slices/exhibit";

interface Props {
  allTags: Tag[];
  myExhibit: Exhibit | null;
}

const ExhibitForm: React.FC<Props> = ({ allTags, myExhibit }) => {
  const [error, setError] = useState("");
  const [photoURLs, setPhotoURLs] = useState<photoItem[]>([]);
  const [defaultPhotoURLs, setDefaultPhotoURLs] = useState<string[]>([]);
  const [photoFiles, setPhotoFiles] = useState<FileToUpload[]>([]);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      tags: [] as TagAsSelectOption[],
      description: "",
    },
    onSubmit: async (values) => {
      const fd = new FormData();
      for (const file of photoFiles) {
        fd.append("photos", file.value);
      }
      for (const tag of values.tags) {
        fd.append("tagIDs", tag.value.toString());
      }
      for (const photoURL of defaultPhotoURLs) {
        fd.append("photoURLs", photoURL);
      }
      fd.append("description", values.description);
      const response = await createNewExhibit(fd);
      if (typeof response == "string") {
        setError(response);
      } else {
        dispatch(setCurrentExhibit(response));
      }
    },
  });

  const convertTags = (tags: Tag[]) =>
    tags.map((t) => ({ value: t.id, label: t.name, color: t.color }));

  useEffect(() => {
    if (myExhibit) {
      formik.setFieldValue("tags", convertTags(myExhibit.tags));
      formik.setFieldValue("description", myExhibit.description);
      setDefaultPhotoURLs(myExhibit.photoURLs);
    }
  }, [formik, myExhibit]);

  return (
    <div className="flex flex-col gap-2 items-center md:pt-4 lg:pt-2 pt-6 md:min-h-[90vh] justify-center bg-gray-100">
      <h1 className="text-3xl">{myExhibit ? "Update my" : "Create new"} Exhibit</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-5 items-start min-w-[50vw] min-h-[60vh] shadow-2xl justify-center bg-white py-4 px-6"
      >
        <div className="flex items-start flex-col gap-2 w-full">
          <label>Tags:</label>
          <Select
            className="w-full"
            value={formik.values.tags}
            options={convertTags(allTags)}
            styles={colorStyles}
            isMulti
            closeMenuOnSelect={false}
            onChange={(val) => formik.setFieldValue("tags", val)}
          />
        </div>
        <div className="flex items-start flex-col gap-2 w-full">
          <label>Description:</label>
          <textarea
            rows={7}
            name="description"
            defaultValue={formik.values.description}
            onChange={formik.handleChange}
            className="border-1 border-black w-full resize-none outline-none p-2 rounded-lg"
          />
        </div>
        <div className="flex items-start flex-col gap-2 w-full">
          <label>Photos:</label>
          <PhotoUploadBlock
            setError={setError}
            photoURLs={photoURLs}
            setPhotoURLs={setPhotoURLs}
            setPhotoFiles={setPhotoFiles}
            defaultPhotoURLs={defaultPhotoURLs}
            setDefaultPhotoURLs={setDefaultPhotoURLs}
          />
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-5">
          {error && <p className="text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={isThereEmptyField(formik.values)}
            className="py-3 px-5 text-xl bg-blue-500 rounded-lg text-white disabled:pointer-events-none disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {myExhibit ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExhibitForm;
