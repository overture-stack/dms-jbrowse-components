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
exports.FileSelection = exports.useFileSelection = exports.tempFileOptions = exports.tempFileRoot = exports.getTracks = exports.humanGenomeAssembly = exports.trackTypes = exports.locationTypes = exports.adapterTypes = void 0;
var react_1 = require("react");
exports.adapterTypes = {
    BAM: "BAMAdapter",
    VCF: "VcfTabixAdapter",
};
exports.locationTypes = {
    BAM: "bamLocation",
    VCF: "vcfGzLocation",
};
exports.trackTypes = {
    BAM: "AlignmentTrack",
    VCF: "VariantTrack",
};
exports.humanGenomeAssembly = "hg38";
var getTracks = function (inputFiles) {
    return inputFiles.map(function (input) {
        var _a;
        return ({
            type: exports.trackTypes[input.fileType],
            trackId: input.fileId,
            name: input.fileName,
            assemblyNames: [exports.humanGenomeAssembly],
            category: [exports.trackTypes[input.fileType]],
            adapter: (_a = {
                    type: exports.adapterTypes[input.fileType]
                },
                _a[exports.locationTypes[input.fileType]] = {
                    uri: input.fileURI,
                    locationType: "UriLocation",
                },
                _a.index = {
                    location: {
                        uri: input.indexURI,
                        locationType: "UriLocation",
                    },
                },
                _a),
        });
    });
};
exports.getTracks = getTracks;
exports.tempFileRoot = "http://localhost:3000/data/";
// VCFs without translocations
var tempFiles = [
    "0a6be23a-d5a0-4e95-ada2-a61b2b5d9485.consensus.20160830.somatic.snv_mnv.vcf.gz",
    "0a9c9db0-c623-11e3-bf01-24c6515278c0.consensus.20160830.somatic.snv_mnv.vcf.gz",
    "0ab4d782-9a50-48b9-96e4-6ce42b2ea034.consensus.20160830.somatic.snv_mnv.vcf.gz",
];
exports.tempFileOptions = tempFiles.map(function (file) { return ({
    fileId: file.split(".")[0],
    fileName: file,
    fileType: "VCF",
    fileURI: exports.tempFileRoot + file,
    indexURI: exports.tempFileRoot + file + ".tbi",
}); });
var useFileSelection = function () {
    var _a = (0, react_1.useState)({}), checkedState = _a[0], setCheckedState = _a[1];
    var handleOnChange = function (fileId) {
        var _a;
        var nextCheckedState = __assign(__assign({}, checkedState), (_a = {}, _a[fileId] = checkedState[fileId] === undefined || !checkedState[fileId], _a));
        setCheckedState(nextCheckedState);
    };
    var selectedFiles = Object.entries(checkedState)
        .filter(function (_a) {
        var fileId = _a[0], isChecked = _a[1];
        return isChecked;
    })
        .map(function (_a) {
        var fileId = _a[0];
        return exports.tempFileOptions.filter(function (file) { return file.fileId === fileId; })[0];
    })
        .filter(Boolean);
    return { checkedState: checkedState, handleOnChange: handleOnChange, selectedFiles: selectedFiles };
};
exports.useFileSelection = useFileSelection;
var FileSelection = function (_a) {
    var checkedState = _a.checkedState, filesList = _a.filesList, handleOnChange = _a.handleOnChange;
    return (<div style={{ marginBottom: 20 }}>
      {filesList.map(function (_a) {
            var fileId = _a.fileId, fileName = _a.fileName;
            return (<div key={fileId}>
          <label key={fileId}>
            <input checked={!!checkedState[fileId]} id={"checkbox-".concat(fileId)} name={fileId} onChange={function () { return handleOnChange(fileId); }} type="checkbox" value={fileId}/>
            {fileName}
          </label>
        </div>);
        })}
    </div>);
};
exports.FileSelection = FileSelection;
