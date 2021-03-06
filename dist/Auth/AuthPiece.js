"use strict";
/*
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Amplify_UI_Theme_1 = require("../Amplify-UI/Amplify-UI-Theme");
var AuthPiece = /** @class */ (function (_super) {
    __extends(AuthPiece, _super);
    function AuthPiece(props) {
        var _this = _super.call(this, props) || this;
        _this.inputs = {};
        _this._isHidden = true;
        _this._validAuthStates = [];
        _this.changeState = _this.changeState.bind(_this);
        _this.error = _this.error.bind(_this);
        _this.handleInputChange = _this.handleInputChange.bind(_this);
        return _this;
    }
    // extract username from authData
    AuthPiece.prototype.usernameFromAuthData = function () {
        var authData = this.props.authData;
        if (!authData) {
            return '';
        }
        var username = '';
        if (typeof authData === 'object') { // user object
            username = authData.user ? authData.user.username : authData.username;
        }
        else {
            username = authData; // username string
        }
        return username;
    };
    AuthPiece.prototype.errorMessage = function (err) {
        if (typeof err === 'string') {
            return err;
        }
        return err.message ? err.message : JSON.stringify(err);
    };
    AuthPiece.prototype.triggerAuthEvent = function (event) {
        var state = this.props.authState;
        if (this.props.onAuthEvent) {
            this.props.onAuthEvent(state, event);
        }
    };
    AuthPiece.prototype.changeState = function (state, data) {
        if (this.props.onStateChange) {
            this.props.onStateChange(state, data);
        }
        this.triggerAuthEvent({
            type: 'stateChange',
            data: state
        });
    };
    AuthPiece.prototype.error = function (err) {
        this.triggerAuthEvent({
            type: 'error',
            data: this.errorMessage(err)
        });
    };
    AuthPiece.prototype.handleInputChange = function (evt) {
        this.inputs = this.inputs || {};
        var _a = evt.target, name = _a.name, value = _a.value, type = _a.type, checked = _a.checked;
        var check_type = ['radio', 'checkbox'].includes(type);
        this.inputs[name] = check_type ? checked : value;
        this.inputs['checkedValue'] = check_type ? value : null;
    };
    AuthPiece.prototype.render = function () {
        if (!this._validAuthStates.includes(this.props.authState)) {
            this._isHidden = true;
            this.inputs = {};
            return null;
        }
        if (this._isHidden) {
            this.inputs = {};
            var track = this.props.track;
            if (track)
                track();
        }
        this._isHidden = false;
        return this.showComponent(this.props.theme || Amplify_UI_Theme_1.default);
    };
    AuthPiece.prototype.showComponent = function (theme) {
        throw 'You must implement showComponent(theme) and don\'t forget to set this._validAuthStates.';
    };
    return AuthPiece;
}(react_1.Component));
exports.default = AuthPiece;
//# sourceMappingURL=AuthPiece.js.map