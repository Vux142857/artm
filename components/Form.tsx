/* eslint-disable @next/next/no-img-element */
import { categories } from "@/app/constants/category.constants";
import { IoIosImages } from 'react-icons/io';
import { BiTrash } from "react-icons/bi";
import { WorkReqBody } from "@/models/Work.model";

interface FormProps {
  type: string;
  work: WorkReqBody;
  setWork: any;
  handleSubmit: any;
}

const Form: React.FC<FormProps> = ({ type, work, setWork, handleSubmit }) => {
  const handleUploadPhotos = (e: any) => {
    const newPhotos = e.target.files
    setWork((prevWork: any) => ({
      ...prevWork,
      photos: [...prevWork.photos, ...newPhotos]
    }))
  }
  const handleRemoveImage = (indexToRemove: number) => {
    setWork((prevWork: any) => ({
      ...prevWork,
      photos: prevWork.photos.filter((_: any, index: number) => index !== indexToRemove)
    }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setWork((prevWork: any) => ({
      ...prevWork,
      [name]: value
    }));
  }

  return (
    <>
      <h1 className="font-bold text-4xl">{type} Your Work</h1>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          {work.photos.length > 0 && (
            <div className="container columns-2 gap-4 my-8">
              {work.photos.map((photo: any, index: number) => (
                <div className="relative w-60 cursor-move break-inside-avoid" key={index}>
                  {photo instanceof Object ? (<img src={URL.createObjectURL(photo)} alt="work" />) : (<img src={photo} alt="work" />)}
                  <button type="button" className="btn absolute right-0 top-0 p-1 hover:text-secondary-content 
                    rounded-none
                    text-xl" onClick={() => { handleRemoveImage(index) }}>
                    <BiTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="card w-full shadow-2xl bg-base-100 ">
          <form className="card-body" onSubmit={() => { handleSubmit(FormData) }}>
            {/* PICK CATEGORY */}
            <div className="form-control w-full max-w-xs">
              <div className="label">
                <h3 className="">Pick category of your work:</h3>
              </div>
              <div className="flex flex-wrap gap-2 px-5 ">
                {categories?.map((item, index) => (
                  <p
                    key={index}
                    className={`${work.category == item ? "text-secondary-content cursor-pointer btn btn-outline bg-lime-300" : "text-primary-content cursor-pointer btn btn-outline"}`}
                    onClick={() => {
                      console.log(item)
                      setWork({ ...work, category: item });
                      console.log()
                    }}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
            {/* UPLOAD IMAGE */}
            <div className="form-control w-full max-w-xs">
              <div className="label photos">
                <h3 className="">Add some photos for your work:</h3>
              </div>
              {work.photos.length < 1 &&
                (
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <input
                          id="image"
                          type="file"
                          name='photos'
                          style={{ display: 'none' }}
                          accept="image/*" onChange={handleUploadPhotos} multiple
                        />
                        <IoIosImages size={50} />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                      </div>
                    </label>
                  </div>
                )}
            </div>
            {/* TYPING TITLE */}
            <div className="form-control w-full max-w-xs">
              <div className="label">
                <h3 className="">Title:</h3>
              </div>
              <input name="title" type="text" onChange={handleChange} value={work.title} placeholder="Type here" className="input input-bordered input-secondary w-full max-w-xs" required />
            </div>
            {/* TYPING DESCRIPTION */}
            <div className="form-control w-full max-w-xs">
              <div className="label">
                <h3 className="">Description:</h3>
              </div>
              <textarea
                name="description"
                className="textarea textarea-secondary"
                onChange={(e: any) => handleChange(e)} // Add parentheses to call the handleChange function
                value={work.description}
                placeholder="Write something about your work"
              ></textarea>
            </div>
            {/* Price */}
            <div className="form-control w-full max-w-xs">
              <div className="label">
                <h3 className="">Price:</h3>
              </div>
              <input name="price" type="number" onChange={handleChange} value={work.price} placeholder="Type here" className="input input-bordered input-secondary w-full max-w-xs" required />
            </div>
            <div className="form-control w-full max-w-xs">
              <button type="submit" className="btn btn-primary w-full max-w-xs">{type}</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Form;