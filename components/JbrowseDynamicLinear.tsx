import {
  createViewState,
  JBrowseLinearGenomeView,
} from "@jbrowse/react-linear-genome-view";
import { useEffect, useState } from "react";
import dynamicOptions from "../jbrowse/linear/dynamic";

type TempType = {
  [k: string]: string;
};

const adapterTypes: TempType = {
  BAM: "BAMAdapter",
  VCF: "VcfTabixAdapter",
};

const locationTypes: TempType = {
  BAM: "bamLocation",
  VCF: "vcfLocation",
};

const trackTypes: TempType = {
  BAM: "FeatureTrack", // feature vs alignment?
  VCF: "VariantTrack",
};

type ViewModel = ReturnType<typeof createViewState>;

export type JbrowseInputFile = {
  fileId: string;
  fileName: string;
  fileType: string;
  fileURI: string;
  indexURI: string;
};

const dummyAssembly = "hg38";

const getTracks = (inputFiles: JbrowseInputFile[]) =>
  inputFiles.map((input) => ({
    type: trackTypes[input.fileType],
    trackId: input.fileId,
    name: input.fileName,
    assemblyNames: [dummyAssembly], // should be a constant
    category: [trackTypes[input.fileType]], // arbitrary & optional
    adapter: {
      type: adapterTypes[input.fileType],
      [locationTypes[input.fileType]]: {
        uri: input.fileURI,
        locationType: "UriLocation",
      },
      index: {
        location: {
          uri: input.indexURI,
          locationType: "UriLocation",
        },
      },
    },
  }));

const JbrowseDynamicLinear = ({
  selectedFiles = [],
  options,
}: {
  selectedFiles?: any[];
  options?: ViewModel;
}) => {
  const [viewState, setViewState] = useState<ViewModel>();

  useEffect(() => {
    const selectedFileTracks = getTracks(selectedFiles);
    const state = createViewState({
      ...dynamicOptions,
      tracks: [...dynamicOptions.tracks, ...selectedFileTracks],
      ...options,
    });
    setViewState(state);
    selectedFileTracks.forEach((track) => {
      state?.session.view.showTrack(track.trackId);
    });
  }, [selectedFiles]);

  if (!viewState) {
    return null;
  }

  return <JBrowseLinearGenomeView viewState={viewState} />;
};

export default JbrowseDynamicLinear;
