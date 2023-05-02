"use strict";
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JbrowseLinear = void 0;
var react_linear_genome_view_1 = require("@jbrowse/react-linear-genome-view");
var react_1 = require("react");
var dynamic_1 = require("../utils/linear/dynamic");
var common_1 = require("./common");
var assembly_1 = require("../utils/assembly");
var ModifyMainMenu_1 = require("../plugins/ModifyMainMenu");
var JbrowseLinear = function (_a) {
    var options = _a.options, _b = _a.selectedFiles, selectedFiles = _b === void 0 ? [] : _b;
    var _c = (0, react_1.useState)(), viewState = _c[0], setViewState = _c[1];
    /*
     * Create tracks for Jbrowse based on the provided selected files,
     * create the view state for Jbrowse using those tracks,
     * and then enable/show the tracks.
     * This updates when selected files are updated.
     */
    (0, react_1.useEffect)(function () {
        var selectedFileTracks = selectedFiles.length ? (0, common_1.getTracks)(selectedFiles) : [];
        var state = (0, react_linear_genome_view_1.createViewState)(__assign(__assign(__assign({}, dynamic_1.defaultLinearOptions), { assembly: assembly_1.assembly, plugins: [ModifyMainMenu_1.ModifyMainMenu], tracks: selectedFileTracks }), (options || {})));
        setViewState(state);
        selectedFileTracks.forEach(function (track) {
            state === null || state === void 0 ? void 0 : state.session.view.showTrack(track.trackId);
        });
    }, [selectedFiles]);
    if (!viewState) {
        return null;
    }
    return <react_linear_genome_view_1.JBrowseLinearGenomeView viewState={viewState}/>;
};
exports.JbrowseLinear = JbrowseLinear;
