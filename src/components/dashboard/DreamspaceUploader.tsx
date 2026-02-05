import React, { useState } from "react";
import { DreamspaceUploadPayload } from "../../types/socialWall";

export default function DreamspaceUploader({ onUpload }: { onUpload: (payload: DreamspaceUploadPayload) => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [sceneFileUrl, setSceneFileUrl] = useState("");

  const handleSubmit = () => {
    const payload: DreamspaceUploadPayload = {
      title,
      description,
      thumbnailUrl,
      sceneFileUrl,
      emotionPreset: "calm",
      visibilityMode: "PUBLIC_FREE",
    };
    onUpload(payload);
  };

  return (
    <div className="dreamspace-uploader">
      <h3>Crear DreamSpace</h3>
      <input placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input placeholder="Thumbnail URL" value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} />
      <input placeholder="Scene File URL" value={sceneFileUrl} onChange={(e) => setSceneFileUrl(e.target.value)} />
      <button onClick={handleSubmit}>Subir</button>
    </div>
  );
}
