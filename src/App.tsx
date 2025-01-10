import CreativeEditorSDKComponent from "../src/components/CreativeEditorSDK";

export default function Home() {
  return (
    <div>
      <CreativeEditorSDKComponent />
      <div>{import.meta.env.VITE_LIC}</div>
    </div>
  );
}
