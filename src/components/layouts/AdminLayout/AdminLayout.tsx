import heroImg1 from "../../../assets/hero/aerial-view-grass-field-hockey_23-2149668573.jpg";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../../ui/resizable";

const AdminLayout = () => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-w-md rounded-lg border md:min-w-[100%] bg-black"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-[200px] items-center justify-center p-6">
          <span className="font-semibold">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={500}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={25}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Two</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={75}>
            <div className="flex flex-col h-fulll items-center justify-center p-6">
              <img src={heroImg1} alt="" />
              <img src={heroImg1} alt="" />
              <img src={heroImg1} alt="" />
              <img src={heroImg1} alt="" />
              <img src={heroImg1} alt="" />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default AdminLayout;
