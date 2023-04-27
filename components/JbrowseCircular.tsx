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

import { useEffect, useState } from "react";
import assembly from "../jbrowse/assembly";
import {
  createViewState,
  JBrowseCircularGenomeView,
} from "@jbrowse/react-circular-genome-view";
import circularTracks from "../jbrowse/circular/tracks";
import circularDefaultSession from "@/jbrowse/circular/defaultSession";
import { CircularViewModel } from "./types";

export default function CustomJbrowse() {
  const [viewState, setViewState] = useState<CircularViewModel>();

  useEffect(() => {
    const state = createViewState({
      assembly,
      tracks: circularTracks,
      defaultSession: circularDefaultSession,
    });
    setViewState(state);

    circularTracks.forEach((track) => {
      state?.session.view.showTrack(track.trackId);
    });
  }, []);

  if (!viewState) {
    return null;
  }

  return (
    <div>
      <JBrowseCircularGenomeView viewState={viewState} />
    </div>
  );
}
