import {
  createViewState,
  JBrowseCircularGenomeView,
} from "@jbrowse/react-circular-genome-view";
import { useEffect, useState } from "react";
import assembly from "../jbrowse/assembly";

type TempType = {
  [k: string]: string;
};

const adapterTypes: TempType = {
  BAM: "BAMAdapter",
  VCF: "VcfTabixAdapter",
};

const locationTypes: TempType = {
  BAM: "bamLocation",
  VCF: "vcfGzLocation",
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

const tracks = [
  {
    type: "VariantTrack",
    trackId: "pacbio_sv_vcf",
    name: "HG002 Pacbio SV (VCF)",
    assemblyNames: ["hg38"],
    category: ["GIAB"],
    adapter: {
      type: "VcfTabixAdapter",
      vcfGzLocation: {
        uri: "https://s3.amazonaws.com/jbrowse.org/genomes/hg19/pacbio/hs37d5.HG002-SequelII-CCS.bnd-only.sv.vcf.gz",
        locationType: "UriLocation",
      },
      index: {
        location: {
          uri: "https://s3.amazonaws.com/jbrowse.org/genomes/hg19/pacbio/hs37d5.HG002-SequelII-CCS.bnd-only.sv.vcf.gz.tbi",
          locationType: "UriLocation",
        },
      },
    },
  },
];

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

const JbrowseDynamicCircular = ({
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
      assembly,
      defaultSession: {
        name: "My session",
        view: {
          id: "circularView",
          type: "CircularView",
        },
      },
      tracks: [...tracks, ...selectedFileTracks],
      ...(options || {}),
    });
    setViewState(state);
    tracks.forEach((track) => {
      state?.session.view.showTrack(track.trackId);
    });
    selectedFileTracks.forEach((track) => {
      state?.session.view.showTrack(track.trackId);
    });
  }, [selectedFiles]);

  if (!viewState) {
    return null;
  }

  return <JBrowseCircularGenomeView viewState={viewState} />;
};

export default JbrowseDynamicCircular;
