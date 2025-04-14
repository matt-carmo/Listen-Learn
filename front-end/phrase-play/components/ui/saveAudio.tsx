import axios from "axios";
import { useState } from "react";
import { Input } from "./input";


export function SaveAudio() {
  const [file, setFile] = useState<any>();

  function handleChange(event: any) {
    setFile(event.target.files[0]);
  }

  function handleSubmit(event:any) {
    event.preventDefault();
    const url = "${getAddressIp}:3000/uploadAudio";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios.post(`192.168.1.19:3000/upload/audio`, formData, config).then((response) => {
      console.log(response.data);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input  type="file" onChange={handleChange} />
      <button type="submit">Upload</button>
    </form>
  );
}
