/*
 * Copyright (c) 2023 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

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
