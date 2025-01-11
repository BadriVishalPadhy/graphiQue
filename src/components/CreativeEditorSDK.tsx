import CreativeEditorSDK from "@cesdk/cesdk-js";
import { useEffect, useRef, useState } from "react";

const config = {
  license: "iV_RkEwej9Y4EwDeeV1BA_sftVZRi_YUU2QKbCcIxUqHcedYGqR9a0VyR1IiN_uK",
  userId: "guides-user",
  // Enable local uploads in Asset Library
  callbacks: { onUpload: "local" as "local" },
};
export default function CreativeEditorSDKComponent() {
  const cesdk_container = useRef(null);
  const [cesdk, setCesdk] = useState(null);
  console.log(cesdk);
  useEffect(() => {
    if (!cesdk_container.current) return;

    let cleanedUp = false;
    let instance: any;
    CreativeEditorSDK.create(cesdk_container.current, config).then(
      async (_instance) => {
        instance = _instance;
        if (cleanedUp) {
          instance.dispose();
          return;
        }

        // Do something with the instance of CreativeEditor SDK, for example:
        // Populate the asset library with default / demo asset sources.
        await Promise.all([
          instance.addDefaultAssetSources(),
          instance.addDemoAssetSources({ sceneMode: "Design" }),
        ]);
        await instance.createDesignScene();

        setCesdk(instance);
      }
    );
    const cleanup = () => {
      cleanedUp = true;
      instance?.dispose();
      setCesdk(null);
    };
    return cleanup;
  }, [cesdk_container]);
  return (
    <div
      ref={cesdk_container}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
}
