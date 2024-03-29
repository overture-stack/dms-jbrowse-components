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

import { createViewState, JBrowseCircularGenomeView } from '@jbrowse/react-circular-genome-view';
import { useEffect, useState } from 'react';
import { defaultCircularOptions } from '../utils/circular/dynamic';
import { getTracks } from './common';
import { JbrowseFileInput, JbrowseCircularDefaultSession } from './types';

export type JbrowseCircularViewModel = ReturnType<typeof createViewState>;
export type JbrowseCircularAssembly = JbrowseCircularViewModel['config']['assembly'];
export type JbrowseCircularConfiguration = JbrowseCircularViewModel['config']['configuration'];

export const JbrowseCircular = ({
  assembly,
  assemblyName,
  configuration,
  defaultSession,
  selectedFiles = [],
}: {
  assembly: JbrowseCircularAssembly;
  assemblyName: string;
  configuration?: JbrowseCircularConfiguration;
  defaultSession?: JbrowseCircularDefaultSession;
  selectedFiles: JbrowseFileInput[];
}) => {
  const [viewState, setViewState] = useState<JbrowseCircularViewModel>();

  /*
   * Create tracks for Jbrowse based on the provided selected files,
   * create the view state for Jbrowse using those tracks,
   * and then enable/show the tracks.
   * This updates when selected files are updated.
   */
  useEffect(() => {
    const selectedFileTracks = getTracks(selectedFiles, assemblyName);
    const state = createViewState({
      ...defaultCircularOptions,
      ...(defaultSession ? { defaultSession } : {}),
      assembly,
      configuration: { ...defaultCircularOptions.configuration, ...(configuration || {}) },
      tracks: selectedFileTracks,
    });

    setViewState(state);

    selectedFileTracks.forEach((track) => {
      state?.session.view.showTrack(track.trackId);
    });
  }, [selectedFiles]);

  if (!viewState) {
    return null;
  }

  return <JBrowseCircularGenomeView viewState={viewState} />;
};
