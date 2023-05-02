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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifyMainMenu = void 0;
var Plugin_1 = require("@jbrowse/core/Plugin");
var defaultMenuAllowList = [
    'Export SVG',
    'Open track selector',
    'Horizontally flip',
    'Show...',
    'Track labels',
];
var customMenuOptions = [
    {
        label: 'Custom menu option',
    },
];
var ModifyMainMenu = /** @class */ (function (_super) {
    __extends(ModifyMainMenu, _super);
    function ModifyMainMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'ModifyMainMenu';
        _this.version = '1.0.0';
        return _this;
    }
    ModifyMainMenu.prototype.install = function (pluginManager) {
        pluginManager.addToExtensionPoint('Core-extendPluggableElement', function (pluggableElement) {
            if (pluggableElement.name === 'LinearGenomeView') {
                var stateModel = pluggableElement.stateModel;
                var newStateModel = stateModel.extend(function (self) {
                    var superMenuItems = self.menuItems();
                    var superMenuItemsAllowed = superMenuItems.filter(function (menuItem) {
                        return defaultMenuAllowList.includes(menuItem.label);
                    });
                    var customMenuItems = superMenuItemsAllowed.concat(customMenuOptions);
                    return {
                        views: {
                            menuItems: function () {
                                return customMenuItems;
                            },
                        },
                    };
                });
                pluggableElement.stateModel = newStateModel;
            }
            return pluggableElement;
        });
    };
    ModifyMainMenu.prototype.configure = function () { };
    return ModifyMainMenu;
}(Plugin_1.default));
exports.ModifyMainMenu = ModifyMainMenu;
