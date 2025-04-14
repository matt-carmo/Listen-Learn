import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import axios from "axios";
import { useState } from "react";
import { FaSpinner, FaX } from "react-icons/fa6";
interface FileData {
  id: string;
  url: string;
  fileName: string;
  readerId: string;
}

interface UploadResponse {
  filename: string;
  success: boolean;
  error: string | null;
  file: FileData;
}

export function AddAudio({ gradedReaderId }: { gradedReaderId: string }) {
  const [files, setFiles] = useState<File[]>([]);
  const [responseFiles, setResponseFiles] = useState<UploadResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState<{ message: string; success: boolean | null }>({
    message: "",
    success: null,
  });
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/file-audio/${gradedReaderId}`, files, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 207) {
        setResponseFiles(response.data.results);
      }

      if (response.status === 201) {
        const responseFilesFiles: UploadResponse[] = files.map((file) => ({
          filename: file.name,
          success: true,
          error: null,
          file: {
            id: "", // Replace with actual ID if available
            url: "", // Replace with actual URL if available
            fileName: file.name,
            readerId: gradedReaderId
          }
        }));
        setResponseFiles(responseFilesFiles);
        console.log(responseFilesFiles)
      }
      setFiles([]);
      setResponseMessage({ message: response.data.message, success: true });
      setIsLoading(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setResponseMessage({ message: error.response.data.message, success: false });
      } else if (error instanceof Error) {
        setResponseMessage({ message: error.message, success: false });
      } else {
        setResponseMessage({ message: "An unknown error occurred", success: false });
      }
    }
    setIsLoading(false);

  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles?.length) return
    setResponseMessage({ message: "", success: null });
    setResponseFiles([]);
    if (selectedFiles) {
      setFiles([...files, ...Array.from(selectedFiles)]);
    }

  }
  const deleteFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className=" mb-2" >
          Add audio (s)
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select or drag and drop a file(s)</DialogTitle>
          <DialogDescription>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 my-4 relative">
              <h2 className="text-lg font-semibold">Select or drag and drop files here</h2>
              <input className="absolute top-0 left-0 w-full h-full opacity-0" type="file" accept="audio/*" onChange={handleFileChange} multiple />
            </div>
            <ul className="flex flex-col gap-2 max-h-80 overflow-y-auto">
              {responseFiles.length === 0 && files.map((file, index) => (
                <li className={`text-gray-500 font-medium text-lg border rounded-lg p-2 flex items-center justify-between } ${responseMessage.success && "bg-green-100"}`} key={index}>{file.name}
                  <button onClick={() => deleteFile(index)}>
                    <FaX className="text-red-500" />
                  </button>
                </li>
              ))}
              {responseFiles.map((file, index) => (
                <li className={`text-gray-500 font-medium text-lg border rounded-lg p-2 flex items-center justify-between } ${file.success && "bg-green-100 border-dotted"} ${file.error && "bg-red-100 border-dotted"}`} key={index}>{file.filename}
                  {!file.error && !file.success && <FaX className="text-red-500" />}

                </li>
              ))}
            </ul>
            <p className={`text-sm ${responseMessage.success ? "text-green-500" : "text-red-500"} mt-2 `}>{responseMessage.message}</p>
            <Button onClick={handleSubmit} type="submit">{isLoading ? <FaSpinner className="w-4 h-4 animate-spin" /> : "Submit"}</Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}