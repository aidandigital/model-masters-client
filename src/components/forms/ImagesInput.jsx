import React, { useState, useEffect } from 'react';
import { XIcon } from "@heroicons/react/solid";
import { PhotographIcon } from "@heroicons/react/outline";
import TinyLoader from "./TinyLoader";
import Note from '../parts/Note';
import heic2any from "heic2any";
import instance from "../../axiosInstance";
import Message from '../parts/Message';

const ImagesInput = (props) => {
    const [imageFolderId, setImageFolderId] = useState(props.imageFolderId);
    const [images, setImages] = useState([...(props.images || [])]); // Initialize with any pre-existing images.
    const [loading, setLoading] = useState(false);
    const [errType, setErrType] = useState("");
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");

    /* Image objects can take the two following forms:
    1. {
        file: file,
        type: file.type,
        filename: filename,
        key: key,
    }

    2. {
        src: src,
        type: file.type,
        filename: filename,
        key: key,
    }

    */

    /*
    function convertAwayFromHeic(image) {
        var fileName = image.name;
        var fileNameBody = getFileNameBody(fileName)
        var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
        return new Promise((resolve, reject) => {
            if (fileNameExt === "heic") {
                var blob = image;
                heic2any({
                    blob: blob,
                    toType: "image/jpeg", // JPEG takes less bytes than PNG
                }).then((resultBlob) => {
                    // Convert our new blob to a file so can be handled by backend properly
                    let resultFile = new File([resultBlob], fileNameBody + ".jpeg", {type: "image/jpeg"})
                    // ^ "type" attribute is important for verifying mimetype in backend
                    if (resultFile) {
                        // Alles in butter!
                        resolve(resultFile);
                    } else {
                        // Error: couldn't convert result blob to file
                        reject(null)
                    }
                }).catch((err) => {
                    // Error converting image
                    reject(null);
                })
            } else {
                resolve(image);
            }
        })
    }
    */

    async function imageInputChange(e) {
        // Prevent adding "undefined" to images array after user clicks cancel in some cases:
        if (e.target.files[0]) {
            setLoading(true);
            setErrType("");
            setSuccess(false);
            setMessage("");

            try {
                const compressedImage = await compressImage(e);

                const uploadedImageData = await uploadImage(compressedImage);

                if (!uploadedImageData) return; // An error occurred during upload, whose error message is already handled in uploadImage function.

                // If this is the first image, set it as the thumbnail:
                if (images.length === 0) {
                    props.setThumbnailKey(uploadedImageData.key); // Update the thumbnail key in the parent component.
                }

                setImages((prev) => [...prev, uploadedImageData]);

                setSuccess(true);

            } catch(err) {
                setLoading(false);
                setSuccess(false);
                setMessage("An error occurred, please try again later");
            }
        }
    }

    // Compresses and removes the EXIF data from an image:
    async function compressImage(e) {
        const maxWidth = props.maxWidth || 2048;
        const maxHeight = props.maxHeight || 2048;

        return new Promise((resolve, reject) => {
            const image = e.target.files[0];
            if (!image) return reject("No image selected");

            const reader = new FileReader();
            const img = document.createElement("img");

            reader.onload = (event) => {
                img.src = event.target.result;

                img.onload = async () => {
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }

                    const canvas = document.createElement("canvas");
                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, width, height);

                    try {
                        const dataURL = canvas.toDataURL("image/jpeg");
                        const blob = await fetch(dataURL).then(res => res.blob());
                        const compressedFile = new File([blob], "image", { type: "image/jpeg" }); // The backend will rename the file, so we can just assign a generic name here.

                        resolve(compressedFile);

                    } catch (err) {
                        reject(err);
                    }
                };

                img.onerror = () => reject("Image failed to load.");
            };

            reader.onerror = () => reject("File reading failed.");

            reader.readAsDataURL(image);
        });
    }

    async function uploadImage(file) {
        try {
            // Get the signed upload URL for S3:
            const response = await instance.get(`/api/imageUploadURL?imageFolderId=${imageFolderId}&extension=${file.type.split("/")[1]}&contentLength=${file.size}`);

            if (response.data.success === false) {
                setLoading(false);
                setSuccess(false);
                
                if (response.data.errType !== "notloggedin") {
                    setMessage(response.data.message);
                }

                setErrType(response.data.errType);
                return;
            }

            const { imageUploadURL, key, filename } = response.data.data;

            // Upload the image to S3:
            const uploadRes = await fetch(imageUploadURL, {
                method: 'PUT',
                headers: {
                    'Content-Type': file.type
                },
                body: file
            });

            // Check if the upload was successful:
            setLoading(false);

            if (!uploadRes.ok) {
                setSuccess(false);
                setMessage("An error occurred, please try again later");
                return;
            }

            return {
                file: file,
                type: file.type,
                filename: filename,
                key: key,
            };

        } catch(err) {
            setLoading(false);
            setSuccess(false);
            setMessage("An error occurred, please try again later");
        }
    }

    async function deleteImage(index) {
        setErrType("");
        setSuccess(false);
        setMessage("");

        try {
            const response = await instance.get(`/api/imageDeletionURL?imageFolderId=${imageFolderId}&filename=${images[index].filename}`);

            if (response.data.success === false) {
                setSuccess(false);

                if (response.data.errType !== "notloggedin") {
                    setMessage(response.data.message);
                }

                setErrType(response.data.errType);

                return;
            }
            
            const imageDeletionURL = response.data.data.imageDeletionURL;

            // Delete from S3:
            const deletionRes = await fetch(imageDeletionURL, {
                method: 'DELETE',
            });

            if (!deletionRes.ok) {
                setSuccess(false);
                setMessage("An error occurred, please try again later");

            } else {
                // If the deleted image was the thumbnail:
                if (props.thumbnailKey === images[index].key) {
                    if (images.length > 1) {
                        // Set the first image that is not the image being deleted as the new thumbnail:
                        const newThumbnail = images.find((img, i) => i !== index && img.key !== props.thumbnailKey);
                        props.setThumbnailKey(newThumbnail.key); // Update the thumbnail key in the parent component.
                    } else {
                        // No images left, reset thumbnail:
                        props.setThumbnailKey(""); // Update the thumbnail key in the parent component.
                    }
                }

                // Remove the image from the local state:
                setImages((prev) => prev.filter((_, i) => i !== index));

                setSuccess(true);
            }

        } catch (err) {
            setSuccess(false);
            setMessage("An error occurred, please try again later");
        }
    }

    function getImagePreviewURL(image) {
        return URL.createObjectURL(image)
    }

    // Update parent form state:
    //useEffect(() => {}, [])

    return (
        <div className="my-2">
            <div className={`border rounded-md px-5 pt-2 w-full placeholder-note focus:outline-none focus:border-opacity-0 focus:ring-2 focus:ring-thirdlydark ` + (props.error ? "ring-thirdlydark ring-1 border-opacity-0" : null)}>
                <div>
                    {/* Real file upload is hidden, controlled by styled label element */}
                    <label for="imageInput">
                        {/* Custom button to prevent weird form reload behavior and have custom sized icon */}
                        <div className={"bg-secondarylight px-3 py-1 pb-1.5 md:px-3.5 md:py-1.5 md:pb-2 my-2 rounded-lg duration-150 w-max cursor-" + ((props.maxImages === images.length || loading) ? "not-allowed opacity-60" : "pointer hover:bg-opacity-70")}>
                            <PhotographIcon className="h-5 inline-block mr-1.5 relative -top-0.5" />
                            <div className="inline-block">Add Photo</div>
                        </div>
                    </label>
                    <input id="imageInput" className="hidden" type="file" accept=".jpeg, .jpg, .png, .heic, .gif" /* <-- This is important, don't change! */ onChange={imageInputChange} disabled={props.maxImages === images.length || loading ? "disabled" : false} />
                </div>
                {images.map((image, i) => (
                    <div key={i} className={"inline-block hover:cursor-pointer text-black p-2 my-2 mr-3 rounded-md border w-max " + (props.thumbnailKey === images[i].key ? "bg-secondarybackground" : "")} onClick={() => props.setThumbnailKey(image.key)}>
                        <img src={image.src ? image.src : getImagePreviewURL(image.file)} className="inline-block w-20 h-20 object-cover object-center" />
                        <span className="inline-block" onClick={(e) => {
                            e.stopPropagation();
                            deleteImage(i);
                        }}>
                            <XIcon className="h-5 inline-block cursor-pointer ml-2 relative -top-0.5" />
                        </span>
                    </div>
                ))}
                {loading ? (
                    <div className="pt-3">
                        <div className="inline-block">
                            <TinyLoader color="thirdlybackground" />
                        </div>
                        <div className="inline-block relative -top-3 left-2">
                            <Note>Compressing and securely saving your photo...</Note>
                        </div>
                    </div>
                ) : null
                }
                <p className="pt-1 pb-2">
                    {images.length === 0 
                    ? "You may add up to " + props.maxImages + " images" 
                    :  "You may add up to " + (props.maxImages - images.length) + " more image" + (props.maxImages - images.length !== 1 ? "s" : "")
                    }
                </p>
            </div>
            { // Display an error message if one exists from the higher level component, otherwise display the message
              // from attempting to upload or delete an image from the local component:
            props.error || message ? <Note customColor="danger">{props.error ? props.error : message}</Note> : null
              // Use a message component with an empty message so that if the user becomes logged out mid-upload, the login popup will display:
            }
            <Message isSuccess={success} errType={errType}></Message>
        </div>
    )
}

export default ImagesInput;